"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ConfirmEmail() {
  const router = useRouter();

  useEffect(() => {
    // If needed, add logic to check if the user has verified their email
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md text-center">
        <h2 className="text-2xl font-semibold text-gray-700">Confirm Your Email</h2>
        <p className="mt-4 text-gray-600">
          A confirmation email has been sent to your inbox. Please check your email and verify your account before logging in.
        </p>
        <button
          onClick={() => router.push("/")}
          className="mt-6 w-full rounded-lg bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}
