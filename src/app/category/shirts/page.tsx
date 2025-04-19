"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import CardShop from "@/components/CardShop/page";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image_url: string;
  category: string;
  created_at: string;
}

const supabase = createClient();

const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [userId, setUserId] = useState<string | null>(null);


  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.error("Error fetching user:", error);
        return;
      }

      console.log("Session Data:", data);
      if (data?.user) {
        setUserId(data.user.id);
      }
    };

    fetchUser();
    
  }, []);


  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from("products").select("*").eq("category" , "shirt");

      if (error) {
        console.error("Error fetching products:", error);
        return;
      }

      console.log("Fetched Products:", data);
      setProducts(data || []);
    };

    fetchProducts();
  }, []);


  const addToCart = async (product_id: number) => {
    if (!userId) {
      alert("You must be logged in to add items to the cart!");
      return;
    }

    console.log("Current User ID:", userId);

    const response = await fetch("/category/shirts/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId, product_id, quantity: 1 }),
    });

    const result = await response.json();
    if (response.ok) alert("Added to cart!");
    else alert(`Error: ${result.error}`);
  };


  return (
    <div className="container mx-auto px-4 py-12 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
          Our Products
        </h1>

        {products.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse flex space-x-4">
              <div className="rounded-full bg-gray-200 h-12 w-12"></div>
              <div className="flex-1 space-y-4 py-1">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="transform transition duration-300 hover:scale-105"
              >
                <CardShop product={product} addToCart={addToCart} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
