import React from "react";
import FloatingBlobs from "../components/FloatingBlobs";
import { Button } from "../components/Button";

function LandingPage() {
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
                <a href="#home" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300">
                  Home
                </a>
                <a href="#categories" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300">
                  Categories
                </a>
                <a href="#pricing" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300">
                  Pricing
                </a>
                <a href="#about" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300">
                  About Us
                </a>
              </div>
            </div>
            
            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300 shadow-xl"
              >
                Log in
              </Button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-300 shadow-xl">
                Join now
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Discover Your Perfect Rental
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Rent Scooters, Cars, Clothes and Items in just a click.
          </p>

          {/* Search Filters */}
          <div className="bg-transparent rounded-2xl shadow-lg p-6 md:p-8 w-full mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 items-center">
              {/* Location Search */}
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Search Location"
                  className="w-full px-4 py-3 border border-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                />
              </div>

              {/* Rental Types */}
              <div className="space-y-2">
                <select className="w-full px-4 py-3 border border-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300">
                  <option value="">Rental types</option>
                  <option value="scooters">Scooters</option>
                  <option value="cars">Cars</option>
                  <option value="clothes">Clothes</option>
                  <option value="items">Items</option>
                </select>
              </div>

              {/* Price Range */}
              <div className="space-y-2">
                <select className="w-full px-4 py-3 border border-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300">
                  <option value="">Price Range</option>
                  <option value="0-20">100rs - 1500rs</option>
                  <option value="20-50">1500rs - 3750rs</option>
                  <option value="50-100">3750rs - 7500rs</option>
                  <option value="100+">7500rs+</option>
                </select>
              </div>

              {/* Check Results Button */}
              <div className="">
                <button className="ml-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 text-lg transition duration-300 transform hover:scale-105">
                  Check results
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </FloatingBlobs>
  );
}

export default LandingPage;
