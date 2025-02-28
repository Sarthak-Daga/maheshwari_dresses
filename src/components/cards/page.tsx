import { useState, useEffect, useRef } from "react";
import { Trash2, Loader2, Check } from "lucide-react";

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
  const [displayQuantity, setDisplayQuantity] = useState(initialQuantity.toString());
  const [loading, setLoading] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Update displayQuantity when quantity changes through API calls
  useEffect(() => {
    if (!isEdited) {
      setDisplayQuantity(quantity.toString());
    }
  }, [quantity, isEdited]);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow only numbers and empty string
    const value = e.target.value.replace(/[^0-9]/g, '');
    setDisplayQuantity(value);
    setIsEdited(value !== quantity.toString() && value !== '');
  };

  const handleBlur = () => {
    // If empty or 0, reset to 1
    if (!displayQuantity || displayQuantity === '0') {
      setDisplayQuantity('1');
      setIsEdited(true);
    }
  };

  const updateQuantity = async (newQuantity?: number, increase?: boolean) => {
    if (loading) return; // Prevent spamming API calls
    
    // If no specific quantity provided, use the button logic
    const updatedQuantity = newQuantity ?? (increase ? quantity + 1 : Math.max(1, quantity - 1));
    
    // Don't update if the quantity is the same
    if (updatedQuantity === quantity) {
      setIsEdited(false);
      setDisplayQuantity(quantity.toString());
      return;
    }
    
    setLoading(true);

    try {
      // For the done button, we need to send the actual new quantity
      const response = await fetch("/cart/api", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          newQuantity 
            ? { cart_id: cartId, new_quantity: newQuantity } 
            : { cart_id: cartId, increase: !!increase }
        ),
      });

      if (!response.ok) throw new Error("Failed to update quantity");

      const data = await response.json();
      setQuantity(data.newQuantity); // Update with server response
      setDisplayQuantity(data.newQuantity.toString());
      setIsEdited(false);
      
      // Call the parent component's update function to refresh subtotal
      onUpdate();
    } catch (error) {
      console.error(error);
      // Reset to previous valid quantity on error
      setDisplayQuantity(quantity.toString());
      setIsEdited(false);
      alert("Error updating quantity. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDoneClick = () => {
    const newQuantity = parseInt(displayQuantity, 10);
    if (isNaN(newQuantity) || newQuantity < 1) {
      setDisplayQuantity(quantity.toString());
      setIsEdited(false);
      return;
    }
    updateQuantity(newQuantity);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      inputRef.current?.blur();
      handleDoneClick();
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

  // Calculate the total price for this item
  const numericPrice = typeof Price === 'number' ? Price : parseFloat(Price.toString());
  const totalPrice = !isNaN(numericPrice) ? numericPrice * quantity : Price;

  return (
    <div className="flex flex-col sm:flex-row w-full py-6 px-4 sm:px-6 gap-4 border-b border-gray-200 last:border-b-0">
      {/* Product image with shadow and proper sizing */}
      <div className="flex-shrink-0">
        <div className="relative h-24 w-24 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
          <img 
            src={img_link} 
            alt={Title} 
            className="h-full w-full object-cover" 
            onError={(e) => {
              e.currentTarget.src = "/placeholder.jpg";
              e.currentTarget.onerror = null;
            }}
          />
        </div>
      </div>
      
      {/* Product details with better spacing */}
      <div className="flex flex-col flex-1 min-w-0">
        <div className="flex flex-wrap justify-between items-start gap-2">
          <h3 className="text-base font-medium text-gray-900 line-clamp-1">{Title}</h3>
          <div className="text-base font-medium text-gray-900">₹{totalPrice}</div>
        </div>
        
        <p className="mt-1 text-sm text-gray-500 line-clamp-2">{desc}</p>
        
        <div className="mt-auto pt-3 flex items-end justify-between">
          {/* Quantity controls with editable input */}
          <div className="flex items-center">
            <button 
              onClick={() => updateQuantity(undefined, false)} 
              disabled={loading || quantity <= 1} 
              className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
            >
              <span className="sr-only">Decrease quantity</span>
              <span className="text-lg font-medium">-</span>
            </button>
            
            <div className="mx-2 w-12 flex items-center justify-center">
              {loading ? (
                <Loader2 size={16} className="animate-spin mx-auto text-gray-500" />
              ) : (
                <input
                  ref={inputRef}
                  type="text"
                  value={displayQuantity}
                  onChange={handleQuantityChange}
                  onBlur={handleBlur}
                  onKeyDown={handleKeyDown}
                  className="w-full text-center text-gray-900 font-medium border-b border-gray-300 focus:border-indigo-500 focus:outline-none"
                  disabled={loading}
                />
              )}
            </div>
            
            <button 
              onClick={() => updateQuantity(undefined, true)} 
              disabled={loading} 
              className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
            >
              <span className="sr-only">Increase quantity</span>
              <span className="text-lg font-medium">+</span>
            </button>
            
            {/* Done button that appears when quantity is edited */}
            {isEdited && (
              <button
                onClick={handleDoneClick}
                disabled={loading}
                className="ml-2 flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-700 hover:bg-green-200 transition-colors duration-150"
                aria-label="Apply quantity change"
              >
                <Check size={16} />
              </button>
            )}
          </div>
          
          {/* Delete button with tooltip */}
          <button 
            onClick={handleDelete} 
            disabled={loading} 
            className="group relative flex items-center justify-center w-8 h-8 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors duration-150"
            aria-label="Remove item"
          >
            <Trash2 size={18} />
            <span className="sr-only">Remove item</span>
            <span className="absolute opacity-0 group-hover:opacity-100 top-full mt-1 right-0 px-2 py-1 text-xs text-white bg-gray-800 rounded pointer-events-none transition-opacity duration-150 whitespace-nowrap">
              Remove item
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}