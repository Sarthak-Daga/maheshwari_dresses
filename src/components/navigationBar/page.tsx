import Image from "next/image";
import shoppingCart from "@/../public/shopping-cart.png"

export default function NavigationBar() {
  return (
    <nav>
      <ul className="flex flex-row justify-end gap-10 p-2 mr-5">
        <li><a href="/">Home</a></li>
        <li><a href="\shop">Shop</a></li>
        <li><a href="\product">Products</a></li>
        <li><a href="\cart"><Image src={shoppingCart} alt="cart" height={22}/></a></li>
      </ul>
    </nav>
  );
}
