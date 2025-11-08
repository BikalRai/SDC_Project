import React from "react";
import FloatingBlobs from "../components/FloatingBlobs";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import AboutUs from "../components/section/AboutUs";
import RentalMarketplace from "../components/section/RentalMarketplace";
import Testimonial from "../components/section/Testimonial";
import { useState } from "react";

function LandingPage() {
  const navigate = useNavigate();

  const [location, setLocation] = useState("");
  const [rentalType, setRentalType] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // prevents page reload
    console.log("Form Data:");
    console.log("Location:", location);
    console.log("Rental Type:", rentalType);
    console.log("Price Range:", priceRange);
    alert(`Searching for ${rentalType} in ${location} within ${priceRange}`);
  };
  return (
    <>
      <div className="min-h-screen bg-transparent">
        <FloatingBlobs>
          {/* Navigation */}

          {/* Hero Section */}
          <div className="max-w-7xl mx-auto py-16">
            <div className="text-center pb-8 pt-20">
              {/* Main Heading */}
              <h1 className='text-5xl font-medium text-gray-900 mb-6'>
                Discover Your{" "}
                <span className='text-primary'>Perfect Rental</span>
              </h1>

              {/* Subheading */}
              <p className='text-xl md:text-2xl text-text-muted max-w-3xl mx-auto'>
                Rent Scooters, Cars, Clothes and Items in just a click.
              </p>
            </div>

            {/* Search Filters */}
            <div className="bg-transparent w-full mx-auto">
              <form
                onSubmit={handleSubmit}
                className="w-full mx-auto px-4 md:px-16 py-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-[80%_1fr] items-center justify-center gap-4">
                  {/* Main Inputs */}
                  <div className="bg-white rounded-lg grid grid-cols-1 md:grid-cols-[40%_1fr_1fr] items-center border border-gray-400">
                    {/* Location Search */}
                    <input
                      type="text"
                      placeholder="Search Location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full px-4 py-5 rounded-bl-lg rounded-tl-lg border-gray-400 border-r md:border-r-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 sm:placeholder:text-sm lg:placeholder:text-base"
                    />

                    {/* Rental Types */}
                    <select
                      value={rentalType}
                      onChange={(e) => setRentalType(e.target.value)}
                      className="w-full px-4 py-5 border-y-2 border-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 sm:text-sm lg:text-base"
                    >
                      <option value="" disabled selected>
                        Rental types
                      </option>
                      <option value="Scooters">Scooters</option>
                      <option value="Cars">Cars</option>
                      <option value="Clothes">Clothes</option>
                      <option value="Items">Items</option>
                    </select>

                    {/* Price Range */}
                    <select
                      value={priceRange}
                      onChange={(e) => setPriceRange(e.target.value)}
                      className="w-full px-4 py-5 border-gray-400 border-2 rounded-br-lg rounded-tr-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 sm:text-sm lg:text-base"
                    >
                      <option value="" disabled selected>
                        Price Range
                      </option>
                      <option value="100rs - 1500rs">100rs - 1500rs</option>
                      <option value="1500rs - 3750rs">1500rs - 3750rs</option>
                      <option value="3750rs - 7500rs">3750rs - 7500rs</option>
                      <option value="7500rs+">7500rs+</option>
                    </select>
                  </div>

                  {/* Check Results Button */}
                  <div className="text-right">
                    <button
                      type="submit"
                      className="md:mt-0 mt-4 md:ml-3 bg-blue-600 hover:bg-blue-700 text-white py-5 px-7 sm:font-normal lg:font-semibold sm:text-md lg:text-lg transition duration-300 transform hover:scale-105 w-full md:w-auto"
                    >
                      Check results
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Content Section */}
          <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid lg:grid-cols-[65%_1fr] grid-cols-1 items-center">
              <div className="text-center md:pr-80 w-full p-0">
                <h2 className="text-4xl font-semibold mb-4 text-primary">
                  Rent What You Need.
                </h2>
                <h2 className='text-4xl font-semibold mb-4 text-primary'>
                  Return When You're Done.
                </h2>
                <p className='text-lg font-normal mb-4'>
                  A smarter, greener, and more affordable way to <br />
                  access what you love.
                </p>
                <Button size="lg" className="relative md:left-64 py-7 px-11">
                  Explore Now{" "}
                  <span className='material-symbols-outlined pl-4'>
                    arrow_right
                  </span>
                </Button> */}
                <PrimaryButton btnText='Explore Now' />
              </div>
              <div className="p-8 hidden lg:block">
                <img
                  src='/Group15.png'
                  alt='decorative'
                  className='w-full h-full object-contain pointer-events-none relative right-16 bottom-24'
                />
              </div>
            </div>
          </div>
        </FloatingBlobs>
      </div>

      <AboutUs />
      <RentalMarketplace />
      <Testimonial />
    </>
  );
}

export default LandingPage;
