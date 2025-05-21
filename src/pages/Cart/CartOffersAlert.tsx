import React from "react";
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";
import { ChevronRight } from "lucide-react";

export function CartOffersAlert() {
  return (
    <div className="w-full lg:hidden mt-4">
      <Alert className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-100">
        <div className="flex justify-between items-center">
          <div>
            <AlertTitle className="text-blue-800">Available offers</AlertTitle>
            <AlertDescription className="text-sm text-gray-600">
              10% off on first purchase, use code WELCOME10
            </AlertDescription>
          </div>
          <ChevronRight className="text-gray-400" size={20} />
        </div>
      </Alert>
    </div>
  );
}