import React, { useState } from "react";
import { Button } from "../Button";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-transparent shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-2">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-blue-600">LOGO</h1>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a
                href="#home"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition duration-300"
              >
                Home
              </a>
              <a
                href="#categories"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition duration-300"
              >
                Categories
              </a>
              <a
                href="#pricing"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition duration-300"
              >
                Pricing
              </a>
              <a
                href="#about"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition duration-300"
              >
                About Us
              </a>
            </div>
          </div>

          {/* Burger Menu Button (Mobile) */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none pl-8"
            >
              {isOpen ? (
                // Close Icon
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                // Hamburger Icon
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Auth Buttons (Desktop) */}
          <div className="hidden sm:flex items-center space-x-4">
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

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          <a
            href="#home"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Home
          </a>
          <a
            href="#categories"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Categories
          </a>
          <a
            href="#pricing"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Pricing
          </a>
          <a
            href="#about"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            About Us
          </a>

          {/* Auth Buttons (Mobile) */}
          <div className="flex flex-col items-start px-4 py-2 space-y-2">
            <Button
              variant="outline"
              className="w-full text-gray-700 hover:text-blue-600 shadow"
              onClick={() => navigate("/login")}
            >
              Log in
            </Button>
            <button
              className="w-full bg-primary hover:bg-light-primary text-white px-4 py-2 rounded-md shadow"
              onClick={() => navigate("/register")}
            >
              Join now
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
