import { ArrowRight, Star } from "lucide-react";
import { Link } from "react-router";

const ProductCard = ({
  id,
  title,
  image,
  price,
  category,
  isOnSale = false,
}) => {
  return (
    <Link to={`/products/${id}`} className="block">
      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group max-w-xs w-[20rem]">
        <div className="relative overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
          />
          {isOnSale && (
            <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
              Sale
            </div>
          )}
        </div>

        <div className="p-4 flex flex-col justify-between h-[11rem]">
          <h3 className="font-semibold text-lg text-gray-900 mb-1">{title}</h3>
          <p className="text-sm text-gray-500 mb-2 capitalize">{category}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-gray-900">₹ {price}</span>
              {price && (
                <span className="text-sm text-gray-500 line-through">
                  ₹ {Math.round(price + price * 0.5)}
                </span>
              )}
            </div>

            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, index) => (
                <Star key={index} size={16} fill="currentColor" />
              ))}
            </div>
          </div>

          <button className="mt-4 w-full py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
            Add to Cart
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
