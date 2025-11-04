import React from "react";
import FloatingBlobs from "../components/FloatingBlobs";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import circle from "../assets/Circle.svg?react";
import AboutUs from "../components/section/AboutUs";
import RentalMarketplace from "../components/section/RentalMarketplace";
import Testimonial from "../components/section/Testimonial";
import Footer from "../components/section/Footer";
import Navbar from "../components/section/Navbar";

function LandingPage() {
  const navigate = useNavigate();
  return (
    <>
      <div className="min-h-screen bg-transparent">
        <FloatingBlobs>
          {/* Navigation */}
          <Navbar />

          {/* Hero Section */}
          <div className="max-w-7xl mx-auto py-16">
            <div className="text-center pb-8 pt-20">
              {/* Main Heading */}
              <h1 className="text-5xl font-medium text-gray-900 mb-6">
                Discover Your{" "}
                <span className="text-primary">Perfect Rental</span>
              </h1>

              {/* Subheading */}
              <p className="text-xl md:text-2xl text-text-muted max-w-3xl mx-auto">
                Rent Scooters, Cars, Clothes and Items in just a click.
              </p>
            </div>

            {/* Search Filters */}
            <div className="bg-transparent w-full mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-[80%_1fr] items-center justify-center w-full mx-auto px-16 md:px-2">
                <div className="bg-white rounded-lg grid grid-cols-1 md:grid-cols-[40%_1fr_1fr] items-center ">
                  {/* Location Search */}
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Search Location"
                      className="w-full px-4 py-5 rounded-bl-lg rounded-tl-lg border-gray-400 border-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 sm:placeholder:text-sm lg:placeholder:text-base"
                    />
                  </div>

                  {/* Rental Types */}
                  <div className="space-y-2">
                    <select className="w-full px-4 py-5 border-y-2 border-gray-400  focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 sm:text-sm lg:text-base">
                      <option value="">Rental types</option>
                      <option value="scooters">Scooters</option>
                      <option value="cars">Cars</option>
                      <option value="clothes">Clothes</option>
                      <option value="items">Items</option>
                    </select>
                  </div>

                  {/* Price Range */}
                  <div className="space-y-2">
                    <select className="w-full px-4 py-5 border-gray-400 border-2 rounded-br-lg rounded-tr-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 sm:text-sm lg:text-base">
                      <option value="">Price Range</option>
                      <option value="0-20">100rs - 1500rs</option>
                      <option value="20-50">1500rs - 3750rs</option>
                      <option value="50-100">3750rs - 7500rs</option>
                      <option value="100+">7500rs+</option>
                    </select>
                  </div>
                </div>

                {/* Check Results Button */}
                <div className="text-right">
                  <button className="md:mt-0 mt-4 md:ml-3 bg-primary hover:bg-light-primary text-white py-5 px-7 sm:font-normal lg:font-semibold sm:text-md lg:text-lg transition duration-300 transform hover:scale-105 w-full md:w-auto">
                    Check results
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-[65%_1fr]">
              <div className="text-center pr-80">
                <h2 className="text-4xl font-semibold mb-4 text-primary">
                  Rent What You Need.
                </h2>
                <h2 className="text-4xl font-semibold mb-4 text-primary">
                  Return When You're Done.
                </h2>
                <p className="text-lg font-normal mb-4">
                  A smarter, greener, and more affordable way to <br />
                  access what you love.
                </p>
                <Button size="lg" className="relative left-64 py-7 px-11">
                  Explore Now{" "}
                  <span className="material-symbols-outlined pl-4">
                    arrow_right
                  </span>
                </Button>
              </div>
              <div className="p-8">
                <img
                  src="/Group15.png"
                  alt="decorative"
                  className="w-full h-full object-contain pointer-events-none relative right-16 bottom-24"
                />
              </div>
            </div>
          </div>
        </FloatingBlobs>
      </div>

      <AboutUs />
      <RentalMarketplace />
      <Testimonial />
      <Footer />
    </>
  );
}

export default LandingPage;
