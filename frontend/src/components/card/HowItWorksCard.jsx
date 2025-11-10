import React from "react";

const HowItWorksCard = (props) => {
  let {img, number, title, description}= props;
  return (
    <>
      <div className="rounded-b-3xl bg-white shadow-xl p-4 border-t-0 border-2 flex flex-col justify-center items-center w-full h-full group-[]:">
        <div className="rounded-full w-16 h-16 bg-light-primary flex justify-center items-center my-2">
          <img src={img} alt="logo" className="object-contain" />
        </div>
        <div className="relative left-22 bottom-6 text-primary text-sm">{number}</div>
        <div className="flex flex-col gap-8 w-9/10 mx-auto">
          <div className="text-center font-medium">{title}</div>
          <p className="my-2 text-center text-text-muted">
            {description}
          </p>
        </div>
      </div>
    </>
  );
};

export default HowItWorksCard;
