import React from "react";
import FloatingBlobs from "../components/FloatingBlobs";
import InfoCard from "../components/InfoCard";

const completeProfile = () => {
  return (
    <>
      <FloatingBlobs>
        <div className="h-screen bg-transparent flex justify-center items-center p-10">
          <div className="bg-white rounded-3xl w-full shadow-lg h-full flex flex-col p-12">
            <h1 className="text-3xl font-bold text-text-black mb-8 text-left">
              Complete Your Profile (1/4)
            </h1>

            {/* progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-3.5 my-4">
              <div
                className="bg-green-500 h-2.5 rounded-full relative top-0.5 "
                style={{ width: "25%" }}
              ></div>
            </div>

            <div className="flex flex-col justify-center items-center">
              <InfoCard
                icon="❤️"
                title="Set your profile picture"
                description="Your picture will make it easier for people to recognize you."
              ></InfoCard>

              <InfoCard
                icon="❤️"
                title="Add your phone number"
                description="In emergencies, people will know how to reach you."
              ></InfoCard>

              <InfoCard
                icon="❤️"
                title="Add your location"
                description="Adding your location helps people to pick up rental products."
              ></InfoCard>
            </div>
          </div>
        </div>
      </FloatingBlobs>
    </>
  );
};

export default completeProfile;
