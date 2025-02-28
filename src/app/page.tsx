"use client"
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="flex items-center justify-center h-[60vh] bg-indigo-600 text-white text-center">
        <div>
          <h1 className="text-4xl font-bold">Welcome to Our Store</h1>
          <p className="mt-2 text-lg">
            Discover amazing products at unbeatable prices
          </p>
          <button className="mt-4 px-6 py-2 bg-white text-indigo-600 font-semibold rounded-md shadow-md hover:bg-gray-200" onClick={()=> router.push("/shop")}>
            Shop Now
          </button>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto py-10 px-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Sample product cards - Replace with dynamic data */}
          {[1, 2, 3, 4].map((product) => (
            <div key={product} className="bg-white p-4 rounded-lg shadow-md">
              <div className="h-40 bg-gray-300 rounded-md mb-4"></div>
              <h3 className="text-lg font-semibold">Product {product}</h3>
              <p className="text-gray-600">₹99.99</p>
              <button className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
