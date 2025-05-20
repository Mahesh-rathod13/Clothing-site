
import Loader from '../components/Loader/Loader'
import { MainLayout } from "../layout/MainLayout/MainLayout";

export const AdminRoutes = {
    path : '/admin',
    element : <MainLayout />,
    hydrateFallbackElement : <Loader />,
    children : [
        {
        path: 'products',
        title: 'Products',
        lazy: () => import('../pages/Admin/ProductsAdminPage'),
    },
    ]
};