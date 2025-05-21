import React from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "../../components/ui/button";

export function CartEmpty() {
  return (
    <div className="bg-white p-8 rounded shadow text-center">
      <ShoppingCart size={64} className="mx-auto text-gray-300 mb-4" />
      <h2 className="text-xl font-medium mb-2">Your cart is empty!</h2>
      <p className="text-gray-500 mb-4">Add items to it now.</p>
      <Button className="bg-blue-600 hover:bg-blue-700">Shop now</Button>
    </div>
  );
}