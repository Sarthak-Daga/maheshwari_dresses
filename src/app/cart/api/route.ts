import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

// Fetch cart data (POST request)
export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "User not authenticated." }, { status: 401 });
    }

    const { data, error } = await supabase
      .from("cart")
      .select("id, quantity, products:product_id(name, description, price, image_url)")
      .eq("user_id", user.id)
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

// Update cart item quantity (PATCH request)
export async function PATCH(req: Request) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "User not authenticated." }, { status: 401 });
    }

    const { cart_id, increase } = await req.json();
    if (!cart_id) {
      return NextResponse.json({ error: "Cart item ID is required." }, { status: 400 });
    }

    // Fetch the current quantity
    const { data: cartItem, error: fetchError } = await supabase
      .from("cart")
      .select("quantity")
      .eq("id", cart_id)
      .single();

    if (fetchError || !cartItem) {
      return NextResponse.json({ error: "Cart item not found." }, { status: 404 });
    }

    const newQuantity = increase ? cartItem.quantity + 1 : Math.max(cartItem.quantity - 1, 1);

    // Update the cart item quantity
    const { error: updateError } = await supabase
      .from("cart")
      .update({ quantity: newQuantity })
      .eq("id", cart_id);

    if (updateError) {
      return NextResponse.json({ error: "Failed to update quantity." }, { status: 500 });
    }

    return NextResponse.json({ message: "Cart item updated successfully", newQuantity });
  } catch (error) {
    console.error("Unhandled Error:", error);
    return NextResponse.json({ error: "An internal server error occurred." }, { status: 500 });
  }
}

// Delete cart item (DELETE request)
export async function DELETE(req: Request) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "User not authenticated." }, { status: 401 });
    }

    const { cart_id } = await req.json();
    if (!cart_id) {
      return NextResponse.json({ error: "Cart item ID is required." }, { status: 400 });
    }

    // Delete the cart item
    const { error: deleteError } = await supabase
      .from("cart")
      .delete()
      .eq("id", cart_id);

    if (deleteError) {
      return NextResponse.json({ error: "Failed to delete cart item." }, { status: 500 });
    }

    return NextResponse.json({ message: "Cart item deleted successfully" });
  } catch (error) {
    console.error("Unhandled Error:", error);
    return NextResponse.json({ error: "An internal server error occurred." }, { status: 500 });
  }
}
