import React from "react";
import { CartItem } from "./CartItem";
import { Button } from "../../components/ui/button";
import { useProductCartState } from "../../store/ProductCartState";

export function CartItemsList() {
  const cart = useProductCartState();
  const cartItems = cart.getState().cartItems;
  return (
    <div className="bg-white rounded shadow divide-y">
      {cartItems.map((item) => (
        <>
        <CartItem
          key={item.id}
          item={item}
        />
        </>
      ))}
      {/* Place order button - Mobile */}
      <div className="p-4 lg:hidden sticky bottom-0 bg-white border-t">
        <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
          PLACE ORDER
        </Button>
      </div>
    </div>
  );
}