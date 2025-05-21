import { MainLayout } from "../layout/MainLayout/MainLayout";
import Loader from '../components/Loader/Loader'
import ProtectedRoute from './ProtectedRoute';

export const HomeRoutes = {
    path: '/',
    element: <MainLayout />,
    hydrateFallbackElement: <Loader />,
    children: [
        {
            index: true,
            lazy: () => import('../pages/Home/Home')
        },
        {
            path: 'about',
            lazy: () => import('../pages/about/About')
        },
        {
            path: 'contact',
            lazy: () => import('../pages/contact/Contact')
        },
    ]
};