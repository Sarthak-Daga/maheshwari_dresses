import Image from "next/image";
import shoppingCart from "@/../public/shopping-cart.png";
import profile from "@/../public/profile.png";
import search from "@/../public/search.png"

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
            <a href="/product"><Image src={search} alt="search" height={20} className="absolute ml-[-25px] mt-1"/></a>
            </div>
        </li>
        <div className="w-[30%] flex flex-row justify justify-between">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="\shop">Shop</a>
          </li>
          <li>
            <a href="\product">Categories</a>
          </li>
          <li>
            <a href="\cart">
              <Image src={shoppingCart} alt="cart" height={22} />
            </a>
          </li>
          <li>
            <a href="\profile">
              <Image
                src={profile}
                alt="profile"
                height={26}
                className=" rounded-[100%]"
              />
            </a>
          </li>
        </div>
      </ul>
    </nav>
  );
}
