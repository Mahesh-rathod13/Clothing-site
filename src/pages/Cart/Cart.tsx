import { useState, useEffect, useCallback, useMemo } from "react";
import { Loader2 } from "lucide-react";
import { useProductCartState } from '../../store/ProductCartState'; // <-- import hookstate cart
import { CartHeader } from "./CartHeader";
import { CartItemsList } from "./CartItemsList";
import { CartEmpty } from "./CartEmpty";
import { CartPriceDetails } from "./CartPriceDetails";
import { CartRecommendations } from "./CartRecommendations";
import { CartOffersAlert } from "./CartOffersAlert";
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";
import { Button } from "../../components/ui/button";
import { RelatedProducts } from "../../components/RelatedProducts";


const getRandomDeliveryDate = () => {
  const days = ["Tomorrow", "Friday", "Saturday", "Sunday", "Monday"];
  return days[Math.floor(Math.random() * days.length)];
};

// Main Component
export function Component() {
  const cart = useProductCartState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cartItems = cart.getState().cartItems;


  // Memoize calculations
  const { itemCount, subtotal, totalDiscount, deliveryCharge, totalAmount } = useMemo(() => {
    const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const totalDiscount = cartItems.reduce((total, item) =>
      total + ((item.originalPrice - item.price) * item.quantity), 0);
    const deliveryCharge = subtotal > 5000 ? 0 : 40;
    const totalAmount = subtotal + deliveryCharge;
    return { itemCount, subtotal, totalDiscount, deliveryCharge, totalAmount };
  }, [cartItems]);

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-4" />
        <p className="text-gray-600">Loading your cart...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <Alert variant="destructive" className="max-w-md">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load products: {error}
            <Button
              className="mt-4 w-full"
              onClick={() => window.location.reload()}
            >
              Try Again
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="flex flex-row gap-4 max-w-7xl mx-auto p-4 bg-gray-100">

      <div className="flex flex-col gap-4 w-[80%] mx-auto p-4 bg-gray-100">
        {/* Left section - Cart items */}
        <div className="w-full flex flex-col gap-4">
          <CartHeader itemCount={itemCount} />
          {cartItems.length > 0 ? (
            <CartItemsList />
          ) : (
            <CartEmpty />
          )}
        </div>

        {/* Right section - Price details */}


        {/* Special offers
      {cartItems.length > 0 && <CartOffersAlert />} */}

        <RelatedProducts currentProductId={cartItems[0]?.id} />
      </div>
      {cartItems.length > 0 && (
        <div className="w-full lg:w-4/12">
          <CartPriceDetails
            itemCount={itemCount}
            subtotal={subtotal}
            totalDiscount={totalDiscount}
            deliveryCharge={deliveryCharge}
            totalAmount={totalAmount}
          />
          <CartRecommendations />
        </div>
      )}
    </div>
  );
}