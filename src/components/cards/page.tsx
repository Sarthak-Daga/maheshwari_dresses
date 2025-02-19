interface CardProps {
  Title: string;
  Price: number | string;
  desc: string;
  img_link: string;
}

export default function Card({ Title, Price, desc, img_link }: CardProps) {
  return (
    <div className="w-screen m-2 flex h-50 flex-row ">
      <div className="m-2 h-45 w-40 ">
        <img src={img_link} alt="Product Image" className="h-full w-full" />
      </div>
      <div>
        <div className="mt-0.5 flex h-max w-140 gap-1">
          <div className="w-[50%] pl-5 text-2xl">
            {Title}
          </div>
          <div className="w-[50%] pr-5 text-end text-2xl">
            {Price}
          </div>
        </div>
        <div className="p-3 text-gray-500 text-xl">{desc}</div>
      </div>
    </div>
  );
}
