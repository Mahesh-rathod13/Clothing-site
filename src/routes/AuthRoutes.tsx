import AuthLayout from "../layout/AuthLayout/AuthLayout";
import Loader from '../components/Loader/Loader'

export const AuthRoutes = {
    path : '/auth',
    element : <AuthLayout />,
    hydrateFallbackElement : <Loader />,
    children : [
        {
            path : 'login',
            title: 'Login',
            lazy : () => import('../pages/Auth/Login/Login')
        },
        {
            path : 'sign-up',
            title: 'Signup',
            lazy : ()=> import('../pages/Auth/Signup/Signup')
        }
    ]
};