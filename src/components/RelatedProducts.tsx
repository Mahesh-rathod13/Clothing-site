import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard/ProductCard';

interface ProductsArrayType {
    id: number,
    title: string,
    slug: string,
    price: number,
    description: string,
    category: {
        id: number,
        name: string,
        slug: string,
        image: string,
        creationAt: string,
        updatedAt: string,
    },
    images: string[],
    creationAt: string,
    updatedAt: string
}


interface RelatedProductsProps {
    currentProductId: number;
}

export function RelatedProducts({ currentProductId }: RelatedProductsProps) {
    const [products, setProducts] = useState<ProductsArrayType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRelated = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`https://api.escuelajs.co/api/v1/products/${currentProductId}/related`);
                // Exclude the current product
                setProducts(res.data.filter((p: Product) => p.id !== currentProductId).slice(0, 4));
            } catch {
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };
        if (currentProductId) fetchRelated();
    }, [currentProductId]);

    if (loading) return <div className="text-gray-500">Loading related products...</div>;
    if (!products.length) return null;

    return (
        <div className="mt-12">
            <h2 className="text-xl font-bold mb-4">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {products.map(product => (
                    <ProductCard id={product.id} title={product.title} image={product.images[0]} price={product.price} category={product.category?.name} slug={product?.slug} />
                ))}
            </div>
        </div>
    );
}