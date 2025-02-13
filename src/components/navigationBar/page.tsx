import Image from "next/image";
import shoppingCart from "@/../public/shopping-cart.png";
import profile from "@/../public/profile.png";
import search from "@/../public/search.png";

export default function NavigationBar() {
  return (
    <nav className="bg-gray-100">
      <ul className="flex flex-row gap-5 p-2 mr-5">
        <li className="w-[20%] text-center">Maheshwari Dresses</li>
        <li className="w-[50%]">
          <div className="flex flex-row">
            <input
              type="text"
              className="border border-black rounded-l-xl rounded-r-xl w-[85%] pl-3 pt-1 pb-1"
            />
            <a href="/product">
              <Image src={search} alt="search" height={20} className="absolute ml-[-25px] mt-1" />
            </a>
          </div>
        </li>
        <div className="w-[30%] flex flex-row justify-between">
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>

          {/* Categories Dropdown */}
          <li className="relative group">
            <a href="/product" className="hover:text-gray-600">Categories</a>
            <ul className="absolute left-0 mt-2 w-40 bg-white text-gray-800 shadow-lg rounded-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              <li className="px-4 py-2 hover:bg-gray-200"><a href="/category/electronics">Shirt</a></li>
              <li className="px-4 py-2 hover:bg-gray-200"><a href="/category/electronics">T-Shirt</a></li>
              <li className="px-4 py-2 hover:bg-gray-200"><a href="/category/electronics">Formals</a></li>
              <li className="px-4 py-2 hover:bg-gray-200"><a href="/category/fashion">Fashion</a></li>
              <li className="px-4 py-2 hover:bg-gray-200"><a href="/category/home-appliances">Home Appliances</a></li>
            </ul>
          </li>

          <li><a href="/cart"><Image src={shoppingCart} alt="cart" height={22} /></a></li>
          <li>
            <a href="/profile">
              <Image src={profile} alt="profile" height={26} className="rounded-[100%]" />
            </a>
          </li>
        </div>
      </ul>
    </nav>
  );
}
