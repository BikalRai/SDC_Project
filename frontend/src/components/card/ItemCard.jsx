import React from "react";
import { MdShoppingCart } from "react-icons/md";
import { FaChevronRight } from "react-icons/fa6";
import PrimaryButton from "../buttons/PrimaryButton";

const ItemCard = ({ name, price, image, features = [] }) => {
  return (
    <div className='p-5 grid gap-4 rounded-xl bg-gray-100 hover:bg-gray-300 hover:shadow-lg transition cursor-pointer'>
      {/* Image Section */}
      <div className='lg:max-h-80 relative'>
        <img
          src={image}
          alt={name}
          className='w-full h-full object-cover [clip-path:polygon(12%_0%,100%_0%,100%_88%,88%_100%,0%_100%,0%_12%)]'
        />
      </div>

      {/* Info Section */}
      <div className='grid gap-4'>
        <h3 className='text-xl font-semibold'>{name}</h3>
        <hr />
        <h4 className='font-semibold'>{price}</h4>

        {/* Features */}
        {features.length > 0 && (
          <div className='font-medium'>
            <p className='text-text-muted'>Riding gear includes</p>
            <div>
              {features.map((feature, index) => (
                <p
                  key={index}
                  className='flex items-center gap-2 text-sm text-text-muted'
                >
                  <FaChevronRight />
                  <span>{feature}</span>
                </p>
              ))}
            </div>
          </div>
        )}
        <div className='mt-5'>
          <PrimaryButton btnText='Book Now' />
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
