'use client';
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

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("id, name, description, price, stock, image_url, category, created_at");

      if (error) console.error(error);
      else setProducts(data as Product[]);
    };

    fetchProducts();
  }, []);

  const addToCart = async (product_id: number) => {
    const { data, error } = await supabase.auth.getSession();

    if (!data.session) {
      alert("You must be logged in to add items to the cart!");
      return;
    }

    const user_id = data.session.user.id;
    const quantity = 1;

    const response = await fetch("/api/shop", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id, product_id, quantity }),
    });

    const result = await response.json();
    if (response.ok) alert("Added to cart!");
    else alert(`Error: ${result.error}`);
  };

  return (
    <div className="grid grid-cols-4 gap-6">
      {products.map((product) => (
        <CardShop key={product.id} product={product} addToCart={addToCart} />
      ))}
    </div>
  );
};

export default Shop;
