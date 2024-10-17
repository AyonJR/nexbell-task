import { useEffect, useState } from "react";

const Cards = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setCards(data.products);
      });
  }, []);

  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 mt-10">
      {
        cards.map((card) => (
          <div key={card.id} className="relative w-[300px] h-[350px] rounded-[14px] z-[1111] overflow-hidden flex flex-col items-center justify-center shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff] p-4">
            
            <div className="absolute w-[20px] h-[20px] bg-red-500 rounded-full blur-[8px] opacity-80 animate-border-move"></div>

            <div className="relative z-10 flex flex-col items-center">
              <img
                src={card.thumbnail}
                alt={card.title}
                className="w-full h-[150px] object-cover mb-4 rounded-md"
              />
              <h2 className="text-lg font-bold text-center mb-2">{card.title}</h2>
              <p className="text-md font-semibold text-gray-700">${card.price.toFixed(2)}</p>
              <p className="text-sm text-gray-500">Rating: {card.rating} ⭐</p>
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default Cards;
