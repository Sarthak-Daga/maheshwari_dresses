import Image from "next/image";
import shoppingCart from "@/../public/shopping-cart.png"
import  profile  from "@/../public/profile.png";

export default function NavigationBar() {
  return (
    <nav>
      <ul className="flex flex-row justify-end gap-5 p-2 mr-5">
        <li><a href="/">Home</a></li>
        <li><a href="\shop">Shop</a></li>
        <li><a href="\product">Products</a></li>
        <li><a href="\cart"><Image src={shoppingCart} alt="cart" height={22}/></a></li>
        <li><a href="\profile"><Image src={profile} alt="profile" height={26} className=" rounded-[100%]"/></a></li>
      </ul>
    </nav>
  );
}
