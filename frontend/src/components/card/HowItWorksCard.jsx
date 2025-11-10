import React from "react";

const HowItWorksCard = (props) => {
  let { icon, number, title, description } = props;
  return (
    <>
      <div className='rounded-b-3xl bg-white shadow-xl p-4 flex flex-col justify-center items-center gap-3'>
        <div className='rounded-full w-16 h-16 bg-light-primary flex justify-center items-center my-2'>
          {icon}
        </div>
        <div className='ml-auto text-primary text-sm'>{number}</div>
        <div className='flex flex-col gap-8 w-9/10 mx-auto'>
          <div className='text-center font-medium'>{title}</div>
          <p className='my-2 text-center text-text-muted text-sm'>
            {description}
          </p>
        </div>
      </div>
    </>
  );
};

export default HowItWorksCard;
