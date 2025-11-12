import React from "react";
import ReContainer from "../containers/ReContainer";
import HowItWorksCard from "../card/HowItWorksCard";
import SectionHeader from "../header/SectionHeader";
import { IoSearch } from "react-icons/io5";
import { BsCalendar2Date } from "react-icons/bs";
import { IoKeyOutline } from "react-icons/io5";
import { AiOutlineLike } from "react-icons/ai";

const items = [
  {
    id: 1,
    icon: <IoSearch className="fill-text-white h-10 w-10" />,
    title: "Choose your car",
    number: "01",
    description:
      "Browse our extensive fleet and select the perfect vehicle for your need",
  },
  {
    id: 2,
    icon: <BsCalendar2Date className="fill-text-white h-10 w-10" />,
    title: "Pick Date & Location",
    number: "02",
    description:
      "Select your pickup and return dates along with your preferred location.",
  },
  {
    id: 3,
    icon: <IoKeyOutline className="stroke-text-white h-10 w-10" />,
    title: "Book & Pay",
    number: "03",
    description:
      "Complete your booking with our secure payment systema and get instant confirmation",
  },
  {
    id: 4,
    icon: <AiOutlineLike className="fill-text-white h-10 w-10" />,
    title: "Choose your car",
    number: "04",
    description:
      "Pick up your car and enjoy your journey with our premium rental service",
  },
];

const HowItWorks = () => {
  return (
    <>
      <ReContainer>
        <div className="bg-white p-10 flex flex-col justify-center items-center">
          <SectionHeader header="How It Works" />
          <p className="mt-2 mb-10 mx-auto text-text-muted">
            Renting a product has never been easier. Follow these simple steps
            to get on the road in minutes.{" "}
          </p>
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-10">
            {items.map((item) => (
              <HowItWorksCard
                icon={item.icon}
                title={item.title}
                number={item.number}
                description={item.description}
              />
            ))}
            {/* <HowItWorksCard
              icon={items[0].icon}
              title={items[0].title}
              number={items[0].number}
              description={items[0].description}
            />
            <HowItWorksCard
              img="/Vector(1).png"
              title="Pick Date & Location"
              number="02"
              description="Select your pickup and return dates along with your preferred location."
            />
            <HowItWorksCard
              img="/Vector(3).png"
              title="Book & Pay"
              number="03"
              description="Complete your booking with our secure payment system and get instant confirmation."
            />
            <HowItWorksCard
              img="/vector(4).png"
              title="Hit the Road"
              number="04"
              description="Pick up your car and enjoy your journey with our premium rental service"
            /> */}
          </div>
        </div>
      </ReContainer>
    </>
  );
};

export default HowItWorks;
