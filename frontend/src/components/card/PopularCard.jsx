import React from "react";
import PrimaryButton from "../buttons/PrimaryButton";
import { FaLongArrowAltRight } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { MdCategory } from "react-icons/md";

const PopularCard = ({ item }) => {
  return (
    <>
      <div className='bg-white rounded-2xl p-6 hover:shadow-2xl cursor-pointer transition-all duration-300'>
        <div className='h-36 flex items-center'>
          <img
            src={`${item?.imageUrl}`}
            alt={`${item?.name}`}
            className='object-contain h-full w-full rounded-xl'
          />
        </div>

        <div className='mt-4'>
          <h3
            className='text-base font-medium line-clamp-3 h-[4.5rem]'
            title={item?.name}
          >
            {item?.name}
          </h3>

          <div className='flex items-center gap-2 mt-2 text-xs text-gray-600'>
            <FaStar className='fill-amber-300 text-base' />
            <span className='font-medium'>{0}</span>
            <span className='text-gray-400'>({0} reviews)</span>
          </div>

          <div className='flex items-center justify-between mt-4 text-gray-500 text-sm'>
            <div className='flex items-center gap-2'>
              <MdCategory />
              <span>{item?.category}</span>
            </div>
          </div>

          <div className='line-clamp-3 h-[4.5rem] mt-4'>
            <h3 className='text-base font-medium'>Specifications</h3>
            <div className='flex flex-col text-xs text-text-muted'>
              {item?.specifications?.map((spec, i) => (
                <p key={i}>{spec}</p>
              ))}
            </div>
          </div>

          <hr className='my-4 border-t-2 border-gray-100' />

          <div className='flex items-center justify-between flex-col'>
            <div className='flex items-center justify-between w-full mb-2'>
              <p className='text-sm text-gray-500'>Price</p>
              <div className='flex items-center'>
                <span className='text-xl font-bold'>Rs-{item?.dailyRate}</span>
                <span className='text-sm text-gray-400'>/day</span>
              </div>
            </div>

            <PrimaryButton
              btnText='Rent Now'
              icon={<FaLongArrowAltRight />}
              className='w-full'
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PopularCard;
