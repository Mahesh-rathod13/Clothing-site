import { createBrowserRouter } from "react-router";
// import { AuthRoutes } from "./AuthRoutes";
// import { HomeRoutes } from "./HomeRoutes";
// import ProductRoutes from "./ProductRoutes";
// import { AdminRoutes } from "./AdminRoutes";
import ProtectedRoute from "./ProtectedRoute";
import { Loader } from "lucide-react";
import { MainLayout } from "../layout/MainLayout/MainLayout";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import AuthLayout from "../layout/AuthLayout/AuthLayout";
const router = createBrowserRouter([
    {
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
    },
    {
        path: '/auth',
        element: <AuthLayout />,
        hydrateFallbackElement: <Loader />,
        children: [
            {
                path: 'login',
                // title: 'Login',
                lazy: () => import('../pages/Auth/Login/Login')
            },
            {
                path: 'sign-up',
                // title: 'Signup',
                lazy: () => import('../pages/Auth/Signup/Signup')
            }
        ]
    },
    {
        path: '/products',
        element: <MainLayout />,
        hydrateFallbackElement: <Loader />,
        children: [
            {
                path: ':id',
                lazy: () => import('../pages/productDetailsPage/ProductDetailsPage')
            }
        ]
    },
    {
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
                // title: 'Manage Products',
                hydrateFallbackElement: <Loader />,
                lazy: () => import('../pages/Admin/ProductsAdminPage'),
            },
            {
                path: 'profile',
                // title: 'Profile',
                hydrateFallbackElement: <Loader />,
                lazy: () => import('../pages/ProfileView/ProfileViewPage'),
            }
        ]
    },
    {
        path: '/cart',
        hydrateFallbackElement: <Loader />,
        element: (
            <ProtectedRoute>
                <MainLayout />
            </ProtectedRoute>
        ),
        children: [
            {
                index: true,
                lazy: () => import('../pages/Cart/Cart')
            }
        ]
    },
    {
        path: '*',
        element: <NotFoundPage />,
    },
]);


export default router;