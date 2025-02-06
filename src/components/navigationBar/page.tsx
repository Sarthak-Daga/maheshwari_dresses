export default function NavigationBar() {
  return (
    <nav>
      <ul className="flex flex-row justify-end gap-10 p-2 mr-5">
        <li><a href="/">Home</a></li>
        <li><a href="\shop">Shop</a></li>
        <li><a href="\newarrivals">New Arrivals</a></li>
        <li><a href="\collections">Collections</a></li>
        <li><a href="\cart">Cart</a></li>
      </ul>
    </nav>
  );
}
