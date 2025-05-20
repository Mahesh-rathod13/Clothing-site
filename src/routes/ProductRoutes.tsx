import { MainLayout } from "../layout/MainLayout/MainLayout";
import Loader from '../components/Loader/Loader'

const ProductRoutes = {
    path :'/products/',
    element: <MainLayout />,
    hydratedFallbackElement : <Loader />,
    children : [
        {
            path : ':id',
            lazy : () => import('../pages/productDetailsPage/ProductDetailsPage')
        }
    ]
}


export default ProductRoutes