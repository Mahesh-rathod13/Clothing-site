import React from "react";
import { Minus, Plus, Heart, Trash2 } from "lucide-react";
import { useProductCartState } from "../../store/ProductCartState";

export function CartItem({
  item,
}: {
  item: any;
}) {

  const cartState = useProductCartState();


  return (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Product image */}
        <div className="flex-shrink-0">
          <img
            src={item.images[0]}
            alt={item.name}
            className="w-24 h-24 object-contain bg-gray-50"
          />
        </div>


        {/* Product details */}
        <div className="flex-grow flex flex-col">
          <h3 className="font-medium text-base">{item.title}</h3>
          <p className="text-sm text-gray-500">Seller: {item.seller}</p>
          {/* Price section */}
          <div className="flex items-center mt-2">
            <span className="font-medium text-lg">₹{item.price.toLocaleString()}</span>
            {item.originalPrice > item.price && (
              <>
                <span className="text-gray-500 line-through text-sm ml-2">
                  ₹{item.originalPrice.toLocaleString()}
                </span>
                <span className="text-green-600 text-sm ml-2">
                  {item.discount}% off
                </span>
              </>
            )}
          </div>
          {/* Delivery info */}
          <div className="text-sm mt-2">
            {item.inStock ? (
              <span className="text-gray-700">{item.delivery}</span>
            ) : (
              <span className="text-red-500">{item.delivery}</span>
            )}
          </div>




          <div className="sm:flex items-center mt-4 gap-4">

            <div className="flex items-center border rounded">
              <button
                onClick={() => cartState.updateItemQuantity(item.id, item.quantity - 1)}
                className="p-1 text-gray-600"
              >
                <Minus size={16} />
              </button>
              <span className="px-3 py-1 border-x">{item.quantity}</span>
              <button
                onClick={() => cartState.updateItemQuantity(item.id, item.quantity + 1)}
                className="p-1 text-gray-600"
              >
                <Plus size={16} />
              </button>
            </div>
            <button
              onClick={() => cartState.removeFromCart(item.id)}
              className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              <Trash2 size={16} /> REMOVE
            </button>
          </div>


        </div>
      </div>
    </div>
  );
}