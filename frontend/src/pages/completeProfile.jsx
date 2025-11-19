import React, { useState } from "react";
import FloatingBlobs from "../components/FloatingBlobs";
import InfoCard from "../components/InfoCard";
import AppLayout from "@/components/layout/AppLayout";
import { IoIosCloseCircle } from "react-icons/io";
import PrimaryButton from "@/components/buttons/PrimaryButton";

const CompleteProfile = () => {
  const steps = [
    {
      id: 1,
      icon: "🖼️",
      title: "Set your profile picture",
      description:
        "Your picture will make it easier for people to recognize you.",
    },
    {
      id: 2,
      icon: "📞",
      title: "Add your phone number",
      description: "In emergencies, people will know how to reach you.",
    },
    {
      id: 3,
      icon: "📍",
      title: "Add your location",
      description:
        "Adding your location helps people to pick up rental products.",
    },
  ];

  const [activeStep, setActiveStep] = useState(null);

  const handleCardClick = (stepId) => {
    setActiveStep((prev) => (prev === stepId ? null : stepId));
  };

  // Progress bar should be 0% when no step is active
  const progressIndex = steps.findIndex((s) => s.id === activeStep);
  const progressPercentage =
    progressIndex === -1 ? 0 : (progressIndex + 1) * (100 / steps.length);

  return (
    <AppLayout>
      <div className="h-auto bg-transparent flex justify-center items-center p-10">
        <div className="bg-white rounded-3xl w-full shadow-lg h-full flex flex-col p-12">
          <h1 className="text-3xl font-bold text-text-black mb-8 text-left">
            Complete Your Profile ({activeStep || 0}/3)
          </h1>

          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-3.5 my-4">
            <div
              className="bg-green-500 h-2.5 rounded-full relative top-0.5 transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>

          <div className="flex flex-col justify-center items-center w-full">
            {steps.map((step) => (
              <div key={step.id} className="w-full">
                {/* Card with highlight when active */}
                <div
                  onClick={() => handleCardClick(step.id)}
                  className={`transition-all duration-300 ${
                    activeStep === step.id
                      ? "bg-blue-100 border border-blue-400"
                      : "bg-white"
                  }`}
                >
                  <InfoCard
                    icon={step.icon}
                    title={step.title}
                    description={step.description}
                  />
                </div>

                {/* Expanded Section */}
                {activeStep === step.id && (
                  <div className="mb-4 p-5 w-full bg-blue-50 border border-blue-400 rounded-b-xl">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-lg font-semibold mb-2">
                          {step.title}
                        </h2>
                        <p className="text-sm text-gray-700 mb-4">
                          Take action for: <strong>{step.title}</strong>
                        </p>

                        {/* Actions */}
                        <form method="post" className="flex flex-col gap-4">
                          {step.id === 1 && (
                            <div>
                              <label className="block mb-1 font-medium text-gray-700">
                                Upload Profile Picture
                              </label>
                              <input
                                type="file"
                                accept="image/*"
                                className="border border-gray-300 rounded-lg p-2 w-full"
                              />
                            </div>
                          )}

                          {step.id === 2 && (
                            <input
                              type="text"
                              placeholder="Enter phone number"
                              className="border border-gray-300 rounded-lg p-2 w-full"
                            />
                          )}

                          {step.id === 3 && (
                            <input
                              type="text"
                              placeholder="Enter your location"
                              className="border border-gray-300 rounded-lg p-2 w-full"
                            />
                          )}

                          <PrimaryButton btnText="Save" />
                        </form>
                      </div>

                      {/* Close Button */}
                      <button
                        onClick={() => setActiveStep(null)}
                        className="text-4xl text-red-500 hover:text-red-600"
                      >
                        <IoIosCloseCircle />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default CompleteProfile;
