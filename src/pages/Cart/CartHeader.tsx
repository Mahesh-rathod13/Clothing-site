import React from "react";

export function CartHeader({ itemCount }: { itemCount: number }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-medium">My Cart ({itemCount})</h1>
        <div className="text-sm text-gray-600">Deliver to: Bangalore 560001</div>
      </div>
    </div>
  );
}