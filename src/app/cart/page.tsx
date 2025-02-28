"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Card from "@/components/cards/page";

interface CartItem {
  id: number;
  quantity: number;
  products: {
    name: string;
    description: string;
    price: number;
    image_url: string;
  };
}

export default function Cart() {
  const [cartData, setCartData] = useState<CartItem[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [subtotal, setSubtotal] = useState(0);
  const router = useRouter();

  // Calculate subtotal based on current cart data
  const calculateSubtotal = useCallback((items: CartItem[]) => {
    return items.reduce(
      (total, item) => total + (item.products?.price || 0) * item.quantity,
      0
    );
  }, []);

  // Fetch cart data
  const fetchCart = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/cart/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (response.status === 401) {
        router.replace("/login");
        return;
      }

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${await response.text()}`);
      }

      const data = await response.json();
      const cartItems = data.data || [];
      setCartData(cartItems);
      setSubtotal(calculateSubtotal(cartItems));
    } catch (error) {
      console.error("Fetch Error:", error);
      setError("An error occurred while retrieving data.");
    } finally {
      setIsLoading(false);
    }
  }, [router, calculateSubtotal]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="px-6 py-5">
              <h1 className="text-2xl font-bold text-gray-900">Your Shopping Cart</h1>
              <p className="mt-1 text-sm text-gray-500">
                {cartData.length} {cartData.length === 1 ? 'item' : 'items'} in your cart
              </p>
            </div>
          </div>

          {error && (
            <div className="mx-6 my-4 bg-red-50 border-l-4 border-red-500 p-4 rounded">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {isLoading ? (
            <div className="p-12 text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent"></div>
              <p className="mt-4 text-gray-500">Loading your cart...</p>
            </div>
          ) : cartData.length === 0 && !error ? (
            <div className="py-12 px-6 text-center">
              <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Your cart is empty</h3>
              <p className="mt-1 text-gray-500">Start adding items to your cart to see them here.</p>
              <div className="mt-6">
                <button 
                  onClick={() => router.push('/')}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="divide-y divide-gray-200">
                {cartData.map((item) => (
                  <div key={item.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <Card
                      cartId={item.id}
                      Title={item.products?.name || "No Title"}
                      Price={item.products?.price || 0}
                      desc={item.products?.description || "No description available"}
                      img_link={item.products?.image_url || "/placeholder.jpg"}
                      initialQuantity={item.quantity}
                      onUpdate={fetchCart}
                    />
                  </div>
                ))}
              </div>
              
              {cartData.length > 0 && (
                <div className="bg-gray-50 px-6 py-6">
                  <div className="flex justify-between text-base font-medium text-gray-900 mb-2">
                    <p>Subtotal</p>
                    <p>₹{subtotal.toFixed(2)}</p>
                  </div>
                  <p className="text-sm text-gray-500 mb-6">Shipping and taxes calculated at checkout.</p>
                  <div className="space-y-3">
                    <button 
                      className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Checkout
                    </button>
                    <button 
                      onClick={() => router.push('/')}
                      className="w-full flex justify-center items-center px-6 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Continue Shopping
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}