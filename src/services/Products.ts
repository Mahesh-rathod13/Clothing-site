import { endPoints } from "../constants/urls"
import api from "./api"

const GetProducts = async (pageIndex = 1, limit = 8) => {
    try {
        const res = await api.get(endPoints.products + `?offset=${pageIndex * limit}&limit=${limit}`);
        return res;
    } catch (error) {
        return null;
    }
}

const GetProductById = async (id : number)=>{
    try {
        const res = await api.get(endPoints.products+`/${id}`);
        return res;
    } catch (error) {
        return null;
    }
}

const GetProductBySlug = async (slug : string)=>{
    try {
        const res = await api.get(endPoints.products+`${slug}`);
        return res;
    } catch (error) {
        return null;
    }
}

export {
    GetProducts,
    GetProductById,
    GetProductBySlug
}