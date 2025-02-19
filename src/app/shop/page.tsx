"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
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

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data.session) setUserId(data.session.user.id);
    };

    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("id, name, description, price, stock, image_url, category, created_at");
      if (!error) setProducts(data as Product[]);
    };

    fetchUser();
    fetchProducts();
  }, []);

  const addToCart = async (product_id: number) => {
    if (!userId) {
      alert("You must be logged in to add items to the cart!");
      return;
    }

    const response = await fetch("api/route.ts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId, product_id, quantity: 1 }),
    });

    const result = await response.json();
    if (response.ok) alert("Added to cart!");
    else alert(`Error: ${result.error}`);
  };

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 place-items-center">
      {products.map((product) => (
        <CardShop key={product.id} product={product} addToCart={addToCart} />
      ))}
    </div>
  );
};

export default Shop;
