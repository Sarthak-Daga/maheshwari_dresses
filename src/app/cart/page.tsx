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
  const router = useRouter();

  // Fetch cart data
  const fetchCart = useCallback(async () => {
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
      setCartData(data.data || []);
    } catch (error) {
      console.error("Fetch Error:", error);
      setError("An error occurred while retrieving data.");
    }
  }, [router]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Cart</h1>

      {error && <p className="text-red-500 text-center bg-red-100 p-3 rounded-lg">{error}</p>}

      {cartData.length === 0 && !error ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartData.map((item) => (
            <Card
              key={item.id}
              cartId={item.id}
              Title={item.products?.name || "No Title"}
              Price={item.products?.price || 0}
              desc={item.products?.description || "No description available"}
              img_link={item.products?.image_url || "/placeholder.jpg"}
              initialQuantity={item.quantity}
              onUpdate={fetchCart}
            />
          ))}
        </div>
      )}
    </div>
  );
}
