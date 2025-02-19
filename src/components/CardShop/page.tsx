import Image from "next/image";

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  image_url: string;
}

interface CardShopProps {
  product: Product;
  addToCart: (product_id: number) => void;
}

const CardShop = ({ product, addToCart }: CardShopProps) => {
  return (
    <div className="border rounded-lg p-4 shadow-lg flex flex-col h-[350px] w-[300px]">
      <div className="h-[150px] flex justify-center items-center overflow-hidden">
        <Image
          src={product.image_url}
          alt={product.name}
          width={140}
          height={140}
          className="rounded object-cover"
        />
      </div>
      <div className="flex justify-between w-full mt-4 px-2">
        <h2 className="text-lg font-semibold truncate">{product.name}</h2>
        <div className="text-right">
          <p className="font-bold text-green-600">₹{product.price}</p>
          <p className="text-sm text-gray-500">Stock: {product.stock}</p>
        </div>
      </div>
      <div className="mt-auto w-full">
        <button
          className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600 mt-4"
          onClick={() => addToCart(product.id)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default CardShop;
