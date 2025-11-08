import React from "react";
import { useRef } from "react";
import { Button } from "../Button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useState } from "react";

const RentalMarketplace = () => {
  const [category, setCategory] = useState("category");

  const categories = ["Scooter", "Car", "Furniture", "Clothes"];

  const scooters = [
    {
      name: "Aprilia SR 125",
      price: "Rs.1,200/day",
      features: ["Helmet", "Raincoat"],
    },
    {
      name: "Honda Aviator",
      price: "Rs.1,100/day",
      features: ["Helmet", "Raincoat"],
    },
    {
      name: "NTorq 125",
      price: "Rs.1,350/day",
      features: ["Helmet", "Raincoat"],
    },
    {
      name: "NTorq Drum",
      price: "Rs.1,350/day",
      features: ["Helmet", "Raincoat"],
    },
    {
      name: "TVS Jupiter",
      price: "Rs.1,150/day",
      features: ["Helmet", "Raincoat"],
    },
  ];

  const sliderRef = useRef(null);

  const scrollLeft = () => {
    sliderRef.current.scrollBy({
      left: -300, // adjust scroll distance
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="min-h-screen bg-card-bg p-6 mb-8">
        {/* Header */}
        <header className="text-center my-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            Find Your Rental
          </h1>

          {/* Description */}
          <p className="text-gray-600 max-w-2xl mx-auto">
            Shop by category & discover looks that suits your style, fit any
            occasion, & elevate your daily change.
          </p>
        </header>

        {/* Categories */}
        {/* <div className="flex justify-center space-x-6 mb-6">
          {categories.map((category, index) => (
            <button
              key={index}
              className="border border-gray-300 text-gray-700 bg-transparent hover:bg-light-primary focus:ring-gray-500 font-light inline-flex items-center justify-center rounded-2xl transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed h-10 sm:px-6 px-3 text-base focus:bg-light-primary"
            >
              {category}
            </button>
          ))}
        </div> */}

        <ToggleGroup
          type="single"
          value={category}
          onValueChange={setCategory}
          className="mx-auto mb-6 flex justify-evenly border-2 border-gray-300"
        >
          {categories.map((category, index) => (
            <ToggleGroupItem
              key={index}
              value={category}
              className={`
        relative px-6 py-2 rounded-full font-medium transition-all duration-300
        data-[state=on]:bg-primary data-[state=on]:text-white
        data-[state=off]:bg-transparent data-[state=off]:text-gray-700
        hover:scale-105 hover:bg-primary/10
      `}
            >
              {category}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>

        {/* Scooter Listings */}
        <div className="relative max-w-7xl mx-auto bg-white py-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-8 pl-12">
            Available {category}
          </h2>

          {/* Slider Container */}
          <div className="relative">
            {/* Left Arrow */}
            <button
              onClick={() => scrollLeft()}
              className="absolute left-[-20px] top-1/2 -translate-y-1/2 bg-white hover:bg-gray-200 rounded-full h-10 w-10 z-10 border"
            >
              ❮
            </button>

            {/* Scrollable Cards */}
            <div
              ref={sliderRef}
              id="scooter-slider"
              className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar px-8"
            >
              {scooters.map((scooter, index) => (
                <div
                  key={index}
                  className="min-w-[280px] bg-transparent rounded-lg overflow-hidden hover:shadow-lg transition-shadow pb-8 px-4 flex-shrink-0"
                >
                  <div
                    className="relative w-full h-80 overflow-hidden"
                    style={{
                      clipPath:
                        "polygon(20% 0, 100% 0, 100% 80%, 80% 100%, 0 100%, 0 20%)",
                    }}
                  >
                    <img
                      src="https://images.unsplash.com/photo-1519750292352-c9fc17322ed7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=685"
                      alt="Scooter"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-3">
                    <h3 className="font-semibold text-lg my-2">
                      {scooter.name}
                    </h3>
                    <hr />
                  </div>

                  <div className="px-3">
                    <p className="text-md font-bold text-green-600 mb-3">
                      {scooter.price}
                    </p>

                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-1">
                        Riding gear includes:
                      </p>
                      <ul className="text-sm text-gray-700">
                        {scooter.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center">
                            <span className="mr-2">•</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button
                      variant="outline"
                      className="hover:bg-light-primary"
                    >
                      Hire now
                      <span className="material-symbols-outlined pl-1">
                        arrow_right
                      </span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Arrow */}
            <button
              onClick={() => scrollRight()}
              className="absolute right-[-20px] top-1/2 -translate-y-1/2 bg-white hover:bg-gray-200 rounded-full h-10 w-10 z-10 border"
            >
              ❯
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RentalMarketplace;
