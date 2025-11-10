import { Button } from "@/components/Button";
import ItemCard from "../components/card/ItemCard";
import { useRef } from "react";

const Furniture = () => {
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    sliderRef.current.scrollBy({
      left: -1090, // adjust scroll distance
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({
      left: 1090,
      behavior: "smooth",
    });
  };
  const items = [
    {
      name: "Wooden Chair",
      price: "Rs. 500/day",
      image:
        "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=688",
    },
    {
      name: "Study Table",
      price: "Rs. 800/day",
      image:
        "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=688",
    },
    {
      name: "Wooden Chair",
      price: "Rs. 500/day",
      image:
        "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=688",
    },
    {
      name: "Study Table",
      price: "Rs. 800/day",
      image:
        "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=688",
    },
    {
      name: "Wooden Chair",
      price: "Rs. 500/day",
      image:
        "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=688",
    },
    {
      name: "Study Table",
      price: "Rs. 800/day",
      image:
        "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=688",
    },
    {
      name: "Wooden Chair",
      price: "Rs. 500/day",
      image:
        "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=688",
    },
    {
      name: "Study Table",
      price: "Rs. 800/day",
      image:
        "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=688",
    },
  ];

  return (
    // <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 place-items-center ">
    // {items.map((item, index) => (
    //   <ItemCard key={index} {...item} />
    // ))}
    // </div>
    <>
      {/* Slider Container */}
      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={() => scrollLeft()}
          className="absolute left-[10px] top-1/2 next-btn text-3xl text-gray-600 hover:text-primary transition cursor-pointer bg-white hover:bg-gray-200 rounded-full h-10 w-10 z-10 border"
        >
          ←
        </button>
        <div
          className="flex overflow-x-auto scroll-smooth no-scrollbar gap-5 mx-12"
          ref={sliderRef}
          id="scooter-slider"
        >
          {/* Scrollable Cards */}
          {items.map((item, index) => (
            <div key={index} className="flex-shrink-0">
              <ItemCard {...item} />
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        
        <button
          onClick={() => scrollRight()}
          className="absolute right-[10px] top-1/2 next-btn text-3xl text-gray-600 hover:text-primary transition cursor-pointer bg-white hover:bg-gray-200 rounded-full h-10 w-10 z-10 border"
        >
          →
        </button>
      </div>
    </>
  );
};

export default Furniture;
