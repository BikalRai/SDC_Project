const Footer = () => {
  return (
    <>
      <footer className='bg-primary text-white py-8 px-4'>
        <div className='max-w-full mx-auto'>
          {/* Main Footer Content */}
          <div className='grid grid-cols-2 md:grid-cols-4 gap-1 sm:gap-8 mb-4 sm:mb-24 sm:mt-12 max-w-6xl mx-auto'>
            {/* Frame Column */}
            <div>
              <h3 className='font-medium text-sm sm:text-lg mb-4 sm:text-left text-center'>
                Rents
              </h3>
              <ul className='space-y-2 hidden sm:block'>
                <li className='text-gray-300 hover:text-white cursor-pointer'>
                  Scooter
                </li>
                <li className='text-gray-300 hover:text-white cursor-pointer'>
                  Car
                </li>
                <li className='text-gray-300 hover:text-white cursor-pointer'>
                  Furniture
                </li>
                <li className='text-gray-300 hover:text-white cursor-pointer'>
                  Clothes
                </li>
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h3 className='font-medium text-sm sm:text-lg mb-4 text-left sm:text-left'>
                Company
              </h3>
              <ul className='space-y-2 hidden sm:block'>
                <li className='text-gray-300 hover:text-white cursor-pointer'>
                  About Us
                </li>
                <li className='text-gray-300 hover:text-white cursor-pointer'>
                  How it Works
                </li>
                <li className='text-gray-300 hover:text-white cursor-pointer'>
                  Safety
                </li>
                <li className='text-gray-300 hover:text-white cursor-pointer'>
                  Careers
                </li>
              </ul>
            </div>

            {/* Support Column */}
            <div>
              <h3 className='font-medium text-sm sm:text-lg mb-4 text-center sm:text-left'>
                Support
              </h3>
              <ul className='space-y-2 hidden sm:block'>
                <li className='text-gray-300 hover:text-white cursor-pointer'>
                  Help Center
                </li>
                <li className='text-gray-300 hover:text-white cursor-pointer'>
                  Contact Us
                </li>
                <li className='text-gray-300 hover:text-white cursor-pointer'>
                  Terms of Service
                </li>
                <li className='text-gray-300 hover:text-white cursor-pointer'>
                  Privacy Policy
                </li>
              </ul>
            </div>

            {/* For Providers Column */}
            <div>
              <h3 className='font-medium text-sm sm:text-lg mb-4 text-left'>
                For Providers
              </h3>
              <ul className='space-y-2 hidden sm:block'>
                <li className='text-gray-300 hover:text-white cursor-pointer'>
                  Join as Provider
                </li>
                <li className='text-gray-300 hover:text-white cursor-pointer'>
                  Provider Resources
                </li>
                <li className='text-gray-300 hover:text-white cursor-pointer'>
                  Verification Process
                </li>
                <li className='text-gray-300 hover:text-white cursor-pointer'>
                  Provider App
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className='border-t border-white pt-6'>
            <div className='flex flex-col md:flex-row justify-center items-center'>
              <p className='text-white text-sm mb-4 md:mb-0'>
                © 2025 Kiraya Bejar. All rights reserved. Made with{" "}
                <span className='text-red-500'>♥</span> in Nepal
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
