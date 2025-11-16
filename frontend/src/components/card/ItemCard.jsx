import React from "react";
import { FaChevronRight } from "react-icons/fa6";
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";

const ItemCard = ({ name, price, image, features = [] }) => {
  return (
    <div className="flex-shrink-0 w-[274px] p-3 grid gap-2 bg-background hover:bg-gray-100 hover:shadow-lg transition cursor-pointer">
      {/* Image Section */}
      <div className="lg:max-h-80 relative h-[323px] w-full">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover rounded-xl"
        />
      </div>

      {/* Info Section */}
      <div className="grid gap-4">
        <h3 className="text-xl font-semibold relative">{name}</h3>

        <h4 className="font-semibold before:block before:h-[1px] before:bg-gray-300 before:w-full before:mb-1">
          Rs {" " + price}/day
        </h4>

        {/* Features */}
        {features.length > 0 && (
          <div className="font-medium">
            <p className="text-text-muted">Specifications</p>
            <div>
              {features.map((feature, index) => (
                <p
                  key={index}
                  className="flex items-center gap-2 text-sm text-text-muted"
                >
                  <FaChevronRight />
                  <span>{feature}</span>
                </p>
              ))}
            </div>
          </div>
        )}
        <div className="">
          <SecondaryButton btnText="Book Now" className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
