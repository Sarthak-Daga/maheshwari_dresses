import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
  try {
    const supabase = await createClient(); // Initialize inside function
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "User not authenticated." }, { status: 401 });
    }

    // Fetch cart data for the authenticated user
    const { data, error } = await supabase
      .from("cart")
      .select("id, quantity, products:product_id(name, description, price, image_url)")
      .eq("user_id", user.id) // Ensure correct user filter
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase Error:", error);
      return NextResponse.json({ error: "Failed to retrieve cart data." }, { status: 500 });
    }

    return NextResponse.json({ message: "Cart data retrieved successfully", data });
  } catch (error) {
    console.error("Unhandled Error:", error);
    return NextResponse.json({ error: "An internal server error occurred." }, { status: 500 });
  }
}
