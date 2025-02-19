import { useState } from "react";
import { Trash2 } from "lucide-react";

interface CardProps {
  cartId: number; // Unique cart item ID
  Title: string;
  Price: number | string;
  desc: string;
  img_link: string;
  initialQuantity: number;
  onUpdate: () => void; // Callback to refresh cart data
}

export default function Card({ cartId, Title, Price, desc, img_link, initialQuantity, onUpdate }: CardProps) {
  const [quantity, setQuantity] = useState(initialQuantity);
  const [loading, setLoading] = useState(false);

  const updateQuantity = async (increase: boolean) => {
    if (loading) return; // Prevent spamming API calls
    setLoading(true);

    try {
      const response = await fetch("/cart/api", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart_id: cartId, increase }),
      });

      if (!response.ok) throw new Error("Failed to update quantity");

      const data = await response.json();
      setQuantity(data.newQuantity); // Optimistic UI update
    } catch (error) {
      console.error(error);
      alert("Error updating quantity. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to remove this item?")) return;

    try {
      const response = await fetch("/cart/api", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart_id: cartId }),
      });

      if (!response.ok) throw new Error("Failed to delete item");

      onUpdate(); // Refresh cart data
    } catch (error) {
      console.error(error);
      alert("Error deleting item. Please try again.");
    }
  };

  return (
    <div className="flex w-full max-w-lg items-center gap-4 rounded-lg border p-4 shadow-md">
      <img src={img_link} alt="Product" className="h-24 w-24 rounded-lg object-cover" />
      <div className="flex flex-1 flex-col">
        <div className="flex justify-between text-xl font-semibold">
          <span>{Title}</span>
          <span>₹{Price}</span>
        </div>
        <p className="text-gray-500 text-sm line-clamp-2">{desc}</p>
        <div className="mt-2 flex items-center gap-3">
          <button 
            onClick={() => updateQuantity(false)} 
            disabled={loading} 
            className="px-2 py-1 bg-gray-200 rounded-md"
          >
            -
          </button>
          <span className="text-lg font-medium">{quantity}</span>
          <button 
            onClick={() => updateQuantity(true)} 
            disabled={loading} 
            className="px-2 py-1 bg-gray-200 rounded-md"
          >
            +
          </button>
          <button 
            onClick={handleDelete} 
            disabled={loading} 
            className="ml-auto text-red-500 hover:text-red-700"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
