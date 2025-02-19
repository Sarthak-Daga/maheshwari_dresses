import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    // Check if the user exists in the "users" table
    const { data: user, error } = await supabase
      .from("uzer")
      .select("*")
      .eq("email", email) // Query by email
      .single(); // This is fine when the user exists, we just handle error case

    if (error && error.code !== "PGRST116") {
      console.error("Error fetching user:", error);
      return NextResponse.json(
        { message: "Error checking user", error },
        { status: 500 }
      );
    }

    if (user) {
      // User exists, check if the password matches
      if (user.password !== password) {
        return NextResponse.json(
          { message: "Incorrect password" },
          { status: 401 }
        );
      }
      return NextResponse.redirect(new URL("/profile", req.url), 307);
    } else {
      // User does not exist, create new user
      const { data: newUser, error: signUpError } = await supabase
        .from("uzer")
        .insert([{ email, password }])
        .select() // To return the inserted row
        .single(); // Get the inserted user data

      if (signUpError) {
        console.error("Error signing up user:", signUpError); // Log error
        return NextResponse.json(
          { message: "Error signing up", error: signUpError },
          { status: 500 }
        );
      }

      return NextResponse.redirect(new URL("/profile", req.url), 307);
    }
  } catch (error) {
    console.error("Server error:", error); // Log general error
    return NextResponse.json(
      { message: "Server error", error: error },
      { status: 500 }
    );
  }
}
