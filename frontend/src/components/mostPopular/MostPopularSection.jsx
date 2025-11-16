import React, { useState } from "react";
import ReContainer from "../containers/ReContainer";
import SectionHeader from "../header/SectionHeader";
import PopularCard from "../card/PopularCard";

import SecondaryButton from "../buttons/SecondaryButton";

// Mock data — replace this with your API or JSON later
const cars = [
  {
    name: "BMW M3",
    image: "https://example.com/bmw.png",
    reviews: "2,036",
    rating: "4.5",
    passenger: 4,
    type: "Auto",
    price: 3500,
  },
  {
    name: "Audi A6",
    image: "https://example.com/audi.png",
    reviews: "1,420",
    rating: "4.3",
    passenger: 4,
    type: "Manual",
    price: 3200,
  },
  {
    name: "Mercedes C-Class",
    image: "https://example.com/benz.png",
    reviews: "1,815",
    rating: "4.6",
    passenger: 4,
    type: "Auto",
    price: 4000,
  },
  {
    name: "Range Rover Evoque",
    image: "https://example.com/rover.png",
    reviews: "968",
    rating: "4.4",
    passenger: 4,
    type: "Auto",
    price: 4200,
  },
  {
    name: "Toyota Fortuner",
    image: "https://example.com/fortuner.png",
    reviews: "2,301",
    rating: "4.7",
    passenger: 7,
    type: "Auto",
    price: 3800,
  },
  {
    name: "BMW M3",
    image: "https://example.com/bmw.png",
    reviews: "2,036",
    rating: "4.5",
    passenger: 4,
    type: "Auto",
    price: 3500,
  },
  {
    name: "Audi A6",
    image: "https://example.com/audi.png",
    reviews: "1,420",
    rating: "4.3",
    passenger: 4,
    type: "Manual",
    price: 3200,
  },
  {
    name: "Mercedes C-Class",
    image: "https://example.com/benz.png",
    reviews: "1,815",
    rating: "4.6",
    passenger: 4,
    type: "Auto",
    price: 4000,
  },
  {
    name: "Range Rover Evoque",
    image: "https://example.com/rover.png",
    reviews: "968",
    rating: "4.4",
    passenger: 4,
    type: "Auto",
    price: 4200,
  },
  {
    name: "Toyota Fortuner",
    image: "https://example.com/fortuner.png",
    reviews: "2,301",
    rating: "4.7",
    passenger: 7,
    type: "Auto",
    price: 3800,
  },
];

const MostPopularSection = () => {
  // Display limit
  const [visible, setVisible] = useState(4);

  // Load more handler
  const handleLoadMore = () => {
    setVisible((prev) => prev + 4); // load 3 more cards
  };

  return (
    <ReContainer>
      <section className="mt-20">
        <div className="bg-background rounded-[8px] py-8 px-10">
          <SectionHeader header="Most Popular Products" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center mt-6">
            {cars.slice(0, visible).map((car, index) => (
              <PopularCard key={index} {...car} />
            ))}
          </div>
          {visible < cars.length && (
            <div className="flex justify-center items-center mt-8">
              <SecondaryButton btnText="load more" onClick={handleLoadMore} />
            </div>
          )}
        </div>
      </section>
    </ReContainer>
  );
};

export default MostPopularSection;
