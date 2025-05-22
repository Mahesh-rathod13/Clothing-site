import { Mail, Shield, ShoppingBag, Star, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import { Button } from "../../components/ui/button";
import { GetProducts } from "../../services/Products";

interface ProductsArrayType {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: {
    id: number;
    name: string;
    slug: string;
    image: string;
    creationAt: string;
    updatedAt: string;
  };
  images: string[];
  creationAt: string;
  updatedAt: string;
}

export function Component() {
  const [products, setProducts] = useState<ProductsArrayType[]>([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const products = await GetProducts(pageIndex, 8);
        setProducts(products?.data || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [pageIndex]);

  return (
    <div className="min-h-screen w-full m-auto">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
        <div className="absolute bg-black opacity-50 z-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:py-32">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold mb-6 leading-tight">
              Discover Your Perfect
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Style Today
              </span>
            </h1>
            <p className="text-xl sm:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto">
              Curated collection of premium products designed for the modern
              lifestyle
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                <ShoppingBag size={20} />
                Shop Now
              </button>
              <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300">
                Explore Collection
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Us
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're committed to delivering exceptional quality and service
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Truck className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Fast Delivery
              </h3>
              <p className="text-gray-600">
                Lightning-fast shipping with tracking. Get your orders in 2-3
                business days.
              </p>
            </div>
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Secure Shopping
              </h3>
              <p className="text-gray-600">
                Your data is protected with bank-level security and encrypted
                transactions.
              </p>
            </div>
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Premium Quality
              </h3>
              <p className="text-gray-600">
                Carefully curated products that meet our high standards for
                quality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-gray-50 w-full">
        <div className="mx-auto px-14 md:px-2 w-full">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600">
              Discover our most popular items loved by customers
            </p>
          </div>
          <div className="xl:w-[90%] mx-auto grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center justify-evenly">
            {products.slice(0, 4).map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                image={product.images[0]}
                price={product.price}
                category={product.category.name}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              All Products
            </h2>
            <p className="text-xl text-gray-600">
              Browse our complete collection of amazing products
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
          ) : products.length > 0 ? (
            <>
              <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    image={product.images[0]}
                    price={product.price}
                    category={product.category.name}
                  />
                ))}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-center gap-4">
                <Button
                  className="px-6 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg"
                  disabled={pageIndex === 0}
                  onClick={() => setPageIndex(pageIndex - 1)}
                >
                  Previous
                </Button>
                <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg font-semibold">
                  Page {pageIndex + 1}
                </span>
                <Button
                  className="px-6 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg"
                  disabled={products.length < 8}
                  onClick={() => setPageIndex(pageIndex + 1)}
                >
                  Next
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-gray-600">No products found</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <div className="mb-8">
            <Mail size={48} className="mx-auto mb-4" />
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Stay Updated
            </h2>
            <p className="text-xl opacity-90">
              Get the latest deals, new arrivals, and exclusive offers delivered
              to your inbox
            </p>
          </div>
          <div className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white ring-1"
              />
              <button className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-400 py-8 text-center text-sm">
        &copy; {new Date().getFullYear()} Aesthetica E-Commerce. All rights
        reserved.
      </footer>
    </div>
  );
}

Component.displayName = "home";
