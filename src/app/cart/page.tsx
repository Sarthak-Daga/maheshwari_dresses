"use client";

import { useState, useEffect } from "react";
import Card from "@/components/cards/page";

// Define the TypeScript type for the fetched data
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

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch("/cart/api", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
  
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to fetch: ${errorText}`);
        }
  
        const data = await response.json();
        console.log("Fetched Cart Data:", data); // Debugging
  
        setCartData(data.data || []);
      } catch (error) {
        console.error("Fetch Error:", error);
        setError("An error occurred while retrieving data.");
      }
    };
  
    fetchCart();
  }, []);
  

  return (
    <>
      {error && <p className="text-red-500">{error}</p>}
      {cartData.length === 0 && !error && <p>Your cart is empty.</p>}
      {cartData.map((item) => (
        <Card
          key={item.id}
          Title={item.products?.name || "No Title"}
          Price={item.products?.price || 0}
          desc={item.products?.description || "No description available"}
          img_link={item.products?.image_url || ""}
        />
      ))}
    </>
  );
}
