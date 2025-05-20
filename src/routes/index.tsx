import { createBrowserRouter } from "react-router";
import { AuthRoutes } from "./AuthRoutes";
import { HomeRoutes } from "./HomeRoutes";
import ProductRoutes from "./ProductRoutes";
import { AdminRoutes } from "./AdminRoutes";
const router = createBrowserRouter([
    HomeRoutes,
    AuthRoutes,
    ProductRoutes,
    AdminRoutes
]);


export default router;