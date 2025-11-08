import { useNavigate } from "react-router-dom";
import { Button } from "../Button";

const AppNavBar = () => {
  const navigate = useNavigate();
  return (
    <nav className='bg-transparent sticky top-0 z-50'>
      <div className='mx-auto'>
        <div className='flex justify-between items-center h-16'>
          {/* Logo */}
          <div className='flex-shrink-0'>
            <h1 className='text-2xl font-bold text-blue-600'>LOGO</h1>
          </div>

          {/* Navigation Links */}
          <div className='hidden md:block'>
            <div className='ml-10 flex items-baseline space-x-8'>
              <a
                href='#home'
                className='text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300'
              >
                Home
              </a>
              <a
                href='#categories'
                className='text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300'
              >
                Categories
              </a>
              <a
                href='#pricing'
                className='text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300'
              >
                Pricing
              </a>
              <a
                href='#about'
                className='text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300'
              >
                About Us
              </a>
            </div>
          </div>

          {/* Auth Buttons */}
          <div className='flex items-center space-x-4'>
            <Button
              variant='outline'
              className='text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300 shadow-xl'
              onClick={() => navigate("/login")}
            >
              Log in
            </Button>
            <button
              className='bg-primary hover:bg-light-primary text-white px-4 py-2 rounded-md text-sm font-medium transition duration-300 shadow-xl'
              onClick={() => navigate("/register")}
            >
              Join now
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AppNavBar;
