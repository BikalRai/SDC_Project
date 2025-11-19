import PrimaryButton from "@/components/buttons/PrimaryButton";
import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";

const Verification = () => {
  const [image, setImage] = useState(null);
  const [gender, setGender] = useState("");

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) setImage(URL.createObjectURL(file));
  };

  return (
    <AppLayout>
      <div className="min-h-screen flex flex-col items-center py-8 px-6">
        <div className="w-full max-w-6xl bg-transparent shadow-xl rounded-3xl p-10 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* LEFT SIDE */}
            <div className="flex flex-col items-left">
              <h1 className="text-3xl font-bold text-left text-primary mb-10">
                Logo
              </h1>

              <div className="flex flex-col items-center">
                {/* Avatar */}
                <div className="w-60 h-60 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden shadow-md border border-gray-300">
                  {image ? (
                    <img
                      src={image}
                      alt="profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-6xl text-gray-500">👤</span>
                  )}
                </div>

                {/* Upload Buttons */}
                <div className="flex gap-4 mt-6">
                  <label className="px-6 py-3 rounded-sm text-sm text-white bg-primary hover:bg-light-primary transition cursor-pointer">
                    Upload Image
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleImage}
                    />
                  </label>

                  <label className="px-6 py-3 rounded-sm text-sm text-primary border border-primary hover:text-text-white hover:bg-primary transition cursor-pointer">
                    Change Image
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleImage}
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div>
              <h1 className="text-3xl font-bold text-left text-primary mb-10">
                Profile Verification
              </h1>

              <form className="grid grid-cols-1 gap-5">
                {/* Full Name */}
                <div>
                  <label className="text-sm font-semibold text-gray-600">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full mt-1 px-4 py-3 border rounded-md bg-gray-50 outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="text-sm font-semibold text-gray-600">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    placeholder="+977"
                    className="w-full mt-1 px-4 py-3 border rounded-md bg-gray-50 outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                {/* Age + Gender */}
                <div className="grid grid-cols-3 gap-4 items-end">
                  <div>
                    <label className="text-sm font-semibold text-gray-600">
                      Age
                    </label>
                    <input
                      type="number"
                      min="0"
                      className="w-full mt-1 px-4 py-3 border rounded-md bg-gray-50 outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="text-sm font-semibold text-gray-600 block">
                      Gender
                    </label>
                    <div className="flex gap-4 mt-1">
                      <button
                        type="button"
                        onClick={() => setGender("M")}
                        className={`px-6 py-3 rounded-md border ${
                          gender === "M"
                            ? "bg-primary text-white border-primary"
                            : "bg-gray-100 text-gray-600 border-gray-300"
                        }`}
                      >
                        M
                      </button>

                      <button
                        type="button"
                        onClick={() => setGender("F")}
                        className={`px-6 py-3 rounded-md border ${
                          gender === "F"
                            ? "bg-primary text-white border-primary"
                            : "bg-gray-100 text-gray-600 border-gray-300"
                        }`}
                      >
                        F
                      </button>
                    </div>
                  </div>
                </div>

                {/* City + State */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-600">
                      City
                    </label>
                    <input
                      type="text"
                      className="w-full mt-1 px-4 py-3 border rounded-md bg-gray-50 outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-600">
                      State
                    </label>
                    <select className="w-full mt-1 px-4 py-3 border rounded-md bg-gray-50 outline-none focus:ring-2 focus:ring-primary">
                      <option>Select</option>
                      <option>Bagmati</option>
                      <option>Gandaki</option>
                      <option>Lumbini</option>
                    </select>
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="text-sm font-semibold text-gray-600">
                    Address
                  </label>
                  <input
                    type="text"
                    placeholder="Current Address"
                    className="w-full mt-1 px-4 py-3 border rounded-md bg-gray-50 outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-center mt-10">
                  <PrimaryButton
                    btnText="Submit for Verification"
                    className="w-full"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Verification;
