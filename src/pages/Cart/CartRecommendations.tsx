import { useEffect, useState } from "react";
import { useProductCartState } from "../../store/ProductCartState";
import { endPoints } from "../../constants/urls";
import api from "../../services/api";
import { set } from "zod";
import { Link } from "react-router";

export function CartRecommendations() {
  const cart = useProductCartState();
  const cartItems = cart.getState().cartItems;
  const { slug } = cartItems[0] || {};

  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await api.get(endPoints.products + `slug/${slug}/related`);
        setRecommendations(response.data);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };

    if (slug) {
      fetchRecommendations();
    }
  }, [slug])

  return (
    <div className="mt-4 hidden lg:block bg-white p-4 rounded shadow">
      <h2 className="font-medium mb-2">You might also like</h2>
      <div className="grid grid-cols-3 gap-2">
        {recommendations.map((item) => (
          <div key={item} className="text-center cursor-pointer hover:shadow-md transition-shadow rounded">
            <Link to={`/products/${item.id}`}>
              <div className="bg-gray-50 p-2 rounded">
                <img
                  src={item.images[0]}
                  alt="Recommended product"
                  className="w-full h-20 object-contain mx-auto"
                />
              </div>
              <p className="text-xs mt-1 line-clamp-2 px-1">{item.title}</p>
              <p className="text-xs font-medium text-blue-600 mt-1">₹{(499 * item.price).toLocaleString()}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}