import React from "react";
import FloatingBlobs from "../components/FloatingBlobs";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import circle from '../assets/Circle.svg?react'

function LandingPage() {
  const navigate = useNavigate();
  return (
    <FloatingBlobs>
    <div className="min-h-screen bg-transparent">
      {/* Navigation */}
      <nav className="bg-transparent shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-blue-600">LOGO</h1>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a
                  href="#home"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
                >
                  Home
                </a>
                <a
                  href="#categories"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
                >
                  Categories
                </a>
                <a
                  href="#pricing"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
                >
                  Pricing
                </a>
                <a
                  href="#about"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
                >
                  About Us
                </a>
              </div>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300 shadow-xl"
                onClick={() => navigate("/login")}
              >
                Log in
              </Button>
              <button
                className="bg-primary hover:bg-light-primary text-white px-4 py-2 rounded-md text-sm font-medium transition duration-300 shadow-xl"
                onClick={() => navigate("/register")}
              >
                Join now
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center pb-8 pt-20">
          {/* Main Heading */}
          <h1 className="text-5xl font-medium text-gray-900 mb-6">
            Discover Your <span className="text-primary">Perfect Rental</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-text-muted max-w-3xl mx-auto">
            Rent Scooters, Cars, Clothes and Items in just a click.
          </p>
        </div>

        {/* Search Filters */}
        <div className="bg-transparent p-4 md:p-6 w-[92%] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[80%_1fr] items-center justify-center w-full mx-auto">
            <div className="bg-white rounded-lg grid grid-cols-1 md:grid-cols-[40%_1fr_1fr] items-center ">
              {/* Location Search */}
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Search Location"
                  className="w-full px-4 py-5 rounded-bl-lg rounded-tl-lg border-gray-400 border-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                />
              </div>

              {/* Rental Types */}
              <div className="space-y-2">
                <select className="w-full px-4 py-5 border-y-2 border-gray-400  focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300">
                  <option value="">Rental types</option>
                  <option value="scooters">Scooters</option>
                  <option value="cars">Cars</option>
                  <option value="clothes">Clothes</option>
                  <option value="items">Items</option>
                </select>
              </div>

              {/* Price Range */}
              <div className="space-y-2">
                <select className="w-full px-4 py-5 border-gray-400 border-2 rounded-br-lg rounded-tr-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300">
                  <option value="">Price Range</option>
                  <option value="0-20">100rs - 1500rs</option>
                  <option value="20-50">1500rs - 3750rs</option>
                  <option value="50-100">3750rs - 7500rs</option>
                  <option value="100+">7500rs+</option>
                </select>
              </div>
            </div>

            {/* Check Results Button */}
            <div className="text-center">
              <button className="ml-3 bg-primary hover:bg-light-primary text-white font-semibold py-5 px-8 text-lg transition duration-300 transform hover:scale-105">
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
            <Button
              size="lg"
              className="relative left-64 bg-primary py-7 px-11"
            >
              Explore Now{" "}
              <span className="material-symbols-outlined pl-4">arrow_right</span>
            </Button>
          </div>
          <div className="p-8">
            <img
              src={circle}
              alt="decorative"
              className="w-full h-full object-contain pointer-events-none"
            />
          </div>
        </div>
      </div>
    </div>
    </FloatingBlobs>
  );
}

export default LandingPage;
