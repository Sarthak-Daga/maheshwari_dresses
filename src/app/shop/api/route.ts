import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  try {
    const { user_id, product_id, quantity } = await req.json();

    if (!user_id) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }

    // Check if product exists
    const { data: product, error: productError } = await supabase
      .from("products")
      .select("id, stock")
      .eq("id", product_id)
      .single();

    if (productError || !product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    if (product.stock < quantity) {
      return NextResponse.json({ error: "Not enough stock available" }, { status: 400 });
    }

    // Insert into cart
    const { data, error } = await supabase.from("cart").insert([{ user_id, product_id, quantity }]);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Added to cart successfully!", data });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong!" }, { status: 500 });
  }
}
