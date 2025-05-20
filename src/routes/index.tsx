import { createBrowserRouter } from "react-router";
import { AuthRoutes } from "./AuthRoutes";
import { HomeRoutes } from "./HomeRoutes";
import ProductRoutes from "./ProductRoutes";
import ProductsAdminPage from '../pages/Admin/ProductsAdminPage';

const router = createBrowserRouter([
    HomeRoutes,
    AuthRoutes,
    ProductRoutes,
    {
        path: "/admin/products",
        element: <ProductsAdminPage />,
    },
]);


export default router;