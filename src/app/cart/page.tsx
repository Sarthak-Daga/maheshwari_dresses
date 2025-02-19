"use client";

import { useState, useEffect } from "react";
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

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch("/cart/api", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // ✅ Ensures cookies/token are sent
        });

        if (response.status === 401) {
          router.replace("/login"); // ✅ Redirect immediately
          return; // ⛔ Stop execution
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
    };

    fetchCart();
  }, [router]);

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
