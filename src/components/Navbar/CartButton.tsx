import React from 'react';
import { Button } from '../ui/button';
import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router';

const CartButton = ({ count = 0 }) => {
    const navigate = useNavigate();
    
  return (
    <div className="relative">
      <Button
        variant="outline"
        className="rounded-full p-2"
        onClick={() => navigate('/cart')}
      >
        <ShoppingCart className="h-5 w-5" />
      </Button>

      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
          {count}
        </span>
      )}
    </div>
  );
};

export default CartButton;
