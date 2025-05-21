import { useParams, useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Minus, Plus, ShoppingCart, Truck, RefreshCcw, Heart } from 'lucide-react';
import { RelatedProducts } from '../../components/RelatedProducts';
import { useProductCartState } from '../../store/ProductCartState';
import { Button } from '../../components/ui/button';

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../components/ui/breadcrumb"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu"

export function Component() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [isGoToCart, setIsGoToCart] = useState(false);
    const navigate = useNavigate();

    const { addToCart } = useProductCartState();

    console.log(product)

    useEffect(() => {
        const loadProduct = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`https://api.escuelajs.co/api/v1/products/${id}`);
                setProduct(response.data);
                setError(null);
            } catch (error) {
                console.error("Error loading product:", error);
                setError("Failed to load product. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        loadProduct();
    }, [id]);

    const decrementQuantity = () => {
        setQuantity((prev) => Math.max(1, prev - 1));
    };

    const incrementQuantity = () => {
        setQuantity((prev) => prev + 1);
    };

    const addToCartHandler = () => {
        if (product) {
            addToCart({ ...product, quantity });
            alert(`Added ${quantity} of ${product.title} to cart`);
            setIsGoToCart(true)
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
                <div className="text-gray-600">Loading product...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-64 bg-red-50 rounded-lg">
                <div className="text-red-600">{error}</div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
                <div className="text-gray-600">Product not found</div>
            </div>
        );
    }

    // Safely get the first image or use a placeholder
    const productImage = product.images && product.images.length > 0
        ? product.images[0]
        : '/api/placeholder/400/320';

    // Safely get the category name
    const categoryName = product.category && product.category.name
        ? product.category.name
        : 'Uncategorized';

    return (
        <main className="flex-grow container mx-auto px-4 py-6">
            <Breadcrumb className='mb-6'>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink className='text-blue-700 font-semibold underline' href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink className='text-red-700 font-semibold underline' href="/">Categories</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink className='text-pink-800 font-semibold underline' href="/">{categoryName}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{product.title}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            {/* Product Container */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-12">
                <div className="md:flex">
                    {/* Product Image */}
                    <div className="md:w-1/2 bg-purple-50 flex items-center justify-center p-8">
                        <img
                            src={productImage}
                            alt={product.title}
                            className="max-h-96 object-contain transform transition hover:scale-105"
                        />
                    </div>

                    {/* Product Details */}
                    <div className="md:w-1/2 p-8">
                        <span className="inline-block px-3 py-1 bg-purple-100 text-purple-800 text-xs font-semibold rounded-full mb-4">
                            {categoryName}
                        </span>
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.title}</h1>
                        <div className="text-2xl font-bold text-gray-800 mb-6">
                            ${(product.price || 0).toFixed(2)}
                        </div>

                        <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>

                        <div className="mb-6">
                            <h3 className="font-semibold text-gray-800 mb-2">Features:</h3>
                            <ul className="list-disc pl-5 text-gray-600 space-y-1">
                                <li>Premium genuine leather construction</li>
                                <li>Vibrant purple finish for a distinctive look</li>
                                <li>Comfortable cushioned insole</li>
                                <li>Durable non-slip rubber outsole</li>
                                <li>Easy slip-on design</li>
                            </ul>
                        </div>

                        {/* Quantity and Add to Cart */}
                        <div className="flex items-center mb-8">
                            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden mr-4">
                                <button
                                    onClick={decrementQuantity}
                                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 focus:outline-none"
                                    aria-label="Decrease quantity"
                                >
                                    <Minus size={16} />
                                </button>
                                <input
                                    type="text"
                                    value={quantity}
                                    readOnly
                                    className="w-12 text-center border-none focus:outline-none py-2"
                                    aria-label="Product quantity"
                                />
                                <button
                                    onClick={incrementQuantity}
                                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 focus:outline-none"
                                    aria-label="Increase quantity"
                                >
                                    <Plus size={16} />
                                </button>
                            </div>
                            {
                                !isGoToCart ? (
                                    <Button
                                        onClick={addToCartHandler}
                                        disabled={quantity <= 0}
                                        className="flex-1 bg-purple-700 hover:bg-purple-800 text-white font-semibold py-3 px-6 rounded-md flex items-center justify-center transition-colors duration-300"
                                    >
                                        <ShoppingCart size={18} className="mr-2" />
                                        Add to Cart
                                    </Button>) : (
                                    <Button
                                        onClick={() => navigate('/cart')}
                                        disabled={quantity <= 0}
                                        className="flex-1 bg-purple-700 hover:bg-purple-800 text-white font-semibold py-3 px-6 rounded-md flex items-center justify-center transition-colors duration-300"
                                    >
                                        <ShoppingCart size={18} className="mr-2" />
                                        Check Cart
                                    </Button>
                                )
                            }
                        </div>

                        {/* Product Meta */}
                        <div className="border-t border-gray-200 pt-6 space-y-4">
                            <div className="flex items-center text-gray-600">
                                <Truck size={18} className="mr-3 text-purple-600" />
                                <span>Free shipping on orders over $50</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                                <RefreshCcw size={18} className="mr-3 text-purple-600" />
                                <span>30-day return policy</span>
                            </div>
                            <div className="flex items-center text-gray-600 cursor-pointer group">
                                <Heart size={18} className="mr-3 text-purple-600 group-hover:fill-current" />
                                <span className="group-hover:text-purple-600">Add to Wishlist</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Products */}
            <RelatedProducts currentProductId={Number(id)} />
        </main>
    );
}

Component.displayName = 'ProductDetails';