import Loader from '../components/Loader/Loader'
import { MainLayout } from "../layout/MainLayout/MainLayout";
import ProtectedRoute from './ProtectedRoute';

export const AdminRoutes = {
    path: '/admin',
    element: (
        <ProtectedRoute>
            <MainLayout />
        </ProtectedRoute>
    ),
    hydrateFallbackElement: <Loader />,
    children: [
        {
            path: 'manage-products',
            title: 'Manage Products',
            hydrateFallbackElement: <Loader />,
            lazy: () => import('../pages/Admin/ProductsAdminPage'),
        },
        {
            path : 'profile',
            title: 'Profile',
            hydrateFallbackElement: <Loader />,
            lazy: () => import('../pages/ProfileView/ProfileViewPage'),
        }
    ]
};