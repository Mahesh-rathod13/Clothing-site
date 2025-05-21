import axios from 'axios';
import { endPoints } from '../constants/urls';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
    baseURL : baseURL,
    headers: { 'Content-Type' : 'application/json'},
});

const refreshAccessToken = async () =>{
    const refreshToken = localStorage.getItem('refreshToken');
    if(!refreshToken) return null;

    try {
        const res = await axios.post(baseURL + endPoints.refresh, {
            "refreshToken" : refreshToken
        });
        
        const newAccessToken = res.data['access_token'];
        const newRefreshToken= res.data['refresh_token'];


        localStorage.setItem('accessToken', newAccessToken);
        localStorage.setItem('refreshToken', newRefreshToken);

        return newAccessToken;
    } catch (error) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');

        window.location.href = '/login';
        return null;
    }
}

api.interceptors.request.use(
    (res)=> res,
    async(err)=>{
        const originalRequest = err.config;

        if(err.res?.status === 402 && !originalRequest._retry){
            originalRequest._retry = true; //prevent infinite retry loop

            const newAccessToken = await refreshAccessToken();

            if(newAccessToken){
                console.log(newAccessToken)
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return api(originalRequest);
            }
        }
        return Promise.reject(err);
    }
)

export default api;