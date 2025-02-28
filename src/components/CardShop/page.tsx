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
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-[380px] w-full max-w-[320px]">
      {/* Product Badge */}
      {product.stock <= 5 && product.stock > 0 ? (
        <div className="absolute top-3 right-3 bg-amber-500 text-white text-xs font-medium px-2 py-1 rounded-full">
          Low Stock
        </div>
      ) : product.stock === 0 ? (
        <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full">
          Out of Stock
        </div>
      ) : null}
      
      {/* Image Container */}
      <div className="relative h-[200px] w-full bg-gray-50 flex justify-center items-center p-4 overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-100 to-transparent opacity-80"></div>
        <Image
          src={product.image_url}
          alt={product.name}
          width={180}
          height={180}
          className="object-contain z-10 transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      
      {/* Content */}
      <div className="flex-1 flex flex-col p-5">
        <div className="mb-3">
          <h2 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">{product.name}</h2>
          <div className="flex justify-between items-center">
            <p className="font-bold text-lg text-emerald-600">₹{product.price.toLocaleString()}</p>
            <p className="text-sm font-medium text-gray-500">
              {product.stock > 0 ? (
                <span className="flex items-center">
                  <span className={`inline-block w-2 h-2 rounded-full mr-1 ${product.stock > 10 ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                  {product.stock} in stock
                </span>
              ) : (
                <span className="text-red-500">Out of stock</span>
              )}
            </p>
          </div>
        </div>
        
        {/* Button */}
        <div className="mt-auto">
          <button
            className={`w-full py-3 rounded-lg font-medium transition-colors duration-200 ${
              product.stock > 0
                ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
            onClick={() => product.stock > 0 && addToCart(product.id)}
            disabled={product.stock <= 0}
          >
            {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardShop;