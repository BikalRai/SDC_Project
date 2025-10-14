import React from "react";

const InfoCard = ({ icon, title, description }) => {
  return (
    <div className="w-full bg-white hover:bg-gray-300 flex justify-start items-center border border-gray-300 h-21 cursor-pointer transition my-4">
      <div className="mx-4 text-2xl">{icon}</div>
      <div>
        <h1 className="mt-1 text-primary text-lg font-bold">{title}</h1>
        <p className="text-text-muted text-md font-semibold">{description}</p>
      </div>
    </div>
  );
};

export default InfoCard;
