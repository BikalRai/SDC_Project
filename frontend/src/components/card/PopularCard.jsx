import React from "react";
import PrimaryButton from "../buttons/PrimaryButton";

const PopularCard = ({
  name,
  image,
  reviews,
  rating,
  passenger,
  type,
  price,
}) => {
  return (
    <>
      <div className="max-w-xs mx-auto bg-white rounded-2xl shadow-[0_10px_30px_rgba(7,22,50,0.06)] p-6 w-64">
        <div className="h-36 flex items-center justify-center">
          <img
            src={`${image}`}
            alt={`${name}`}
            className="object-contain h-full w-full rounded-xl"
          />
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-semibold">{name}</h3>

          <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                fill="#F8B400"
              />
            </svg>
            <span className="font-medium">{rating}</span>
            <span className="text-gray-400">({reviews} reviews)</span>
          </div>

          <div className="flex items-center justify-between mt-4 text-gray-500 text-sm">
            <div className="flex items-center gap-2">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 12a3 3 0 100-6 3 3 0 000 6zM4 20a8 8 0 0116 0H4z"
                  fill="currentColor"
                />
              </svg>
              <span>{passenger} Passangers</span>
            </div>

            <div className="flex items-center gap-2">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 3v2M12 19v2M4.2 6.2l1.4 1.4M18.4 16.4l1.4 1.4M3 12h2M19 12h2M4.2 17.8l1.4-1.4M18.4 7.6l1.4-1.4"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>{type}</span>
            </div>
          </div>
          <div className="flex items-center justify-between mt-4 text-gray-500 text-sm">
            <div className="flex items-center gap-2">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 2v6M18 2v6M3 10h18M12 22V10"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Air Conditioning</span>
            </div>
          </div>

          <hr className="my-4 border-t-2 border-gray-100" />

          <div className="flex items-center justify-between flex-col">
            <div className="flex items-center justify-between w-full mb-2">
              <p className="text-sm text-gray-500">Price</p>
              <div className="flex items-center">
                <span className="text-xl font-bold">Rs-{price}</span>
                <span className="text-sm text-gray-400">/day</span>
              </div>
            </div>

            <PrimaryButton btnText="Rent Now" className="w-full" />
          </div>
        </div>
      </div>
    </>
  );
};

export default PopularCard;
