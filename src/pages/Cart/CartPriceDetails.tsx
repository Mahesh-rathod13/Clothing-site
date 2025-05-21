import React from "react";
import { Separator } from "../../components/ui/separator";
import { Button } from "../../components/ui/button";

export function CartPriceDetails({
  itemCount,
  subtotal,
  totalDiscount,
  deliveryCharge,
  totalAmount,
}: {
  itemCount: number;
  subtotal: number;
  totalDiscount: number;
  deliveryCharge: number;
  totalAmount: number;
}) {
  return (
    <div className="bg-white rounded shadow sticky top-4">

      {/* Price summary */}
      <div className="p-4 border-b">
        <h2 className="text-gray-500 font-medium text-base uppercase mb-4">PRICE DETAILS</h2>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span>
              Price ({itemCount} items)
            </span>
            <span>₹{subtotal.toLocaleString()}</span>
          </div>

          <div className="flex justify-between">
            <span>Delivery Charges</span>
            {deliveryCharge > 0 ? (
              <span>₹{deliveryCharge}</span>
            ) : (
              <span className="text-green-600">FREE</span>
            )}
          </div>

          <Separator />

          <div className="flex justify-between font-medium text-base">
            <span>Total Amount</span>
            <span>₹{totalAmount.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Safe and Secure */}
      <div className="p-4 text-gray-500 text-xs flex items-center justify-center">
        <svg
          className="w-4 h-4 mr-2"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
        Safe and Secure Payments. Easy returns. 100% Authentic products.
      </div>
      {/* Place order button - Desktop */}
      <div className="p-4 hidden lg:block">
        <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
          PLACE ORDER
        </Button>
      </div>
    </div>
  );
}