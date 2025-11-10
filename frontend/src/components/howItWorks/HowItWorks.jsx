import React from "react";
import ReContainer from "../containers/ReContainer";
import HowItWorksCard from "../card/HowItWorksCard";
import SectionHeader from "../header/SectionHeader";

const HowItWorks = () => {
  return (
    <>
      <ReContainer>
        <div className='bg-white p-10 flex flex-col justify-center items-center'>
          <SectionHeader header='How It Works' />
          <p className='mt-2 mb-10 mx-auto text-text-muted'>
            Renting a product has never been easier. Follow these simple steps
            to get on the road in minutes.{" "}
          </p>
          <div className='grid md:grid-cols-2 xl:grid-cols-4 grid-rows-1 gap-4 w-9/10 mx-auto'>
            <HowItWorksCard
              img='/Vector.png'
              title='Choose your car'
              number='01'
              description='Browse our extensive fleet and select the perfect vehicle for your need'
            />
            <HowItWorksCard
              img='/Vector(1).png'
              title='Pick Date & Location'
              number='02'
              description='Select your pickup and return dates along with your preferred location.'
            />
            <HowItWorksCard
              img='/Vector(3).png'
              title='Book & Pay'
              number='03'
              description='Complete your booking with our secure payment system and get instant confirmation.'
            />
            <HowItWorksCard
              img='/vector(4).png'
              title='Hit the Road'
              number='04'
              description='Pick up your car and enjoy your journey with our premium rental service'
            />
          </div>
        </div>
      </ReContainer>
    </>
  );
};

export default HowItWorks;
