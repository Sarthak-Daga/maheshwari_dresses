import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  try {
    // Fetch cart data with product details using a join
    const { data, error } = await supabase
    .from("cart")
    .select("id, quantity, products:product_id(name, description, price, image_url)")
    .order("created_at", { ascending: false });
  
  if (error) {
    console.error("Supabase Error:", error);
    return NextResponse.json({ error: "Failed to retrieve cart data." }, { status: 500 });
  }
  
  return NextResponse.json({ message: "Cart data retrieved successfully", data });

  } catch (error) {
    console.error("Unhandled Error:", error);
    return NextResponse.json(
      { error: "An internal server error occurred." },
      { status: 500 }
    );
  }
}
