import Image from "next/image";
import shoppingCart from "@/../public/shopping-cart.png";
import profile from "@/../public/profile.png";
import search from "@/../public/search.png";

export default function NavigationBar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <a href="/" className="text-xl font-bold text-indigo-700 hover:text-indigo-600 transition-colors">
              Maheshwari Dresses
            </a>
          </div>

          {/* Search Bar */}
          <div className="flex-grow max-w-xl mx-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full py-2 pl-4 pr-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <a href="/product" className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <Image 
                  src={search} 
                  alt="search" 
                  height={20} 
                  width={20}
                  className="text-gray-500 hover:text-indigo-500 transition-colors" 
                />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">Home</a>
            <a href="/shop" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">Shop</a>

            {/* Categories Dropdown */}
            <div className="relative group">
              <a href="/shop" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors flex items-center">
                Categories
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </a>
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <a href="/category/shirts" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700">Shirt</a>
                <a href="/category/Tshirts" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700">Tshirt</a>
                <a href="/category/Jeans" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700">Jeans</a>
              </div>
            </div>
          </div>

          {/* Cart and Profile */}
          <div className="flex items-center space-x-6">
            <a href="/cart" className="relative p-2 text-gray-700 hover:text-indigo-600 transition-colors">
              
              <Image src={shoppingCart} alt="cart" height={22} width={22} />
            </a>
            <a href="/profile" className="relative">
              <Image 
                src={profile} 
                alt="profile" 
                height={36} 
                width={36} 
                className="rounded-full border-2 border-transparent hover:border-indigo-500 transition-colors" 
              />
            </a>
          </div>
        </div>

        {/* Mobile Navigation Menu (simplified) */}
        <div className="md:hidden flex justify-center mt-3 pb-1 space-x-6">
          <a href="/" className="text-gray-700 hover:text-indigo-600 font-medium">Home</a>
          <a href="/shop" className="text-gray-700 hover:text-indigo-600 font-medium">Shop</a>
          <a href="/shop" className="text-gray-700 hover:text-indigo-600 font-medium">Categories</a>
        </div>
      </div>
    </nav>
  );
}