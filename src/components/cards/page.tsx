interface CardProps {
  title: string;
  price: number | string;
  desc: string;
  imgLink: string;
  quantity: number;
}

export default function Card({ title, price, desc, imgLink, quantity }: CardProps) {
  return (
    <div className="flex w-full max-w-md gap-4 rounded-lg bg-white p-4 shadow-md">
      <img
        src={imgLink}
        alt={title}
        className="h-24 w-24 rounded-lg object-cover"
      />
      
      <div className="flex flex-col justify-between flex-1">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          <span className="text-lg font-bold text-gray-900">₹{price}</span>
        </div>
        <p className="text-gray-600 text-sm mt-2">{desc}</p>
        <p className="text-gray-700 text-sm mt-2">Quantity: {quantity}</p>
      </div>
    </div>
  );
}
