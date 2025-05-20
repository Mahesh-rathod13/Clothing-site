import React, { useEffect, useState } from 'react'
import { GetProducts } from '../../services/Products';
import api from '../../services/api';
import { endPoints } from '../../constants/urls';
import ProductCard from '../../components/ProductCard/ProductCard';
import { Button } from '../../components/ui/button';

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

export function Component() {
  const [products, setProducts] = useState<ProductsArrayType[]>([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true); // Add this line
      try {
        const products = await GetProducts(pageIndex, 8);
        setProducts(products?.data);
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false); // Add this line
      }
    }
    loadProducts()
  }, [pageIndex]);

  return (
    <div className='h-[100rem] w-full p-10 flex flex-col gap-5'>
      <h3 className='text-2xl font-bold text-gray-700 px-30'>ALL Products</h3>
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <span className="text-gray-500 text-lg">Loading products...</span>
        </div>
      ) : (
        products.length > 0 &&
        <div className='flex flex-wrap gap-10 justify-center items-center'>
          {
            products.map((product) => (
              <ProductCard id={product.id} title={product.title} image={product.images[0]} price={product.price} category={product.category.name} slug={product.slug} />
            ))
          }
        </div>
      )}
      {!loading && (
        <div className='flex items-center gap-10 w-full justify-end px-30'>
          <Button className='bg-gray-400 text-white shadow-md cursor-pointer'
            disabled={pageIndex == 0}
            onClick={() => setPageIndex(pageIndex - 1)}>
            Prev
          </Button>
          <p className='text-xl font-semibold text-gray-600'>page : {pageIndex+1}</p>
          <Button
            className='bg-gray-400 text-white shadow-md'
            disabled={pageIndex * 8 === 50}
            onClick={() => setPageIndex(pageIndex + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}

Component.displayName = 'home'