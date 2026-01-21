import PrimaryButton from "../buttons/PrimaryButton";
import ReContainer from "../containers/ReContainer";
import SecondaryButton from "../buttons/SecondaryButton";
import AppNavLink from "./AppNavLink";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import { Avatar } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "@/slices/auth.slice";
import { logo } from "@/utils/imports";

const navLinks = [
  { id: 1, name: "home", path: "/" },
  { id: 2, name: "categories", path: "/categories" },
  { id: 3, name: "how", path: "/kyc" },
  { id: 4, name: "about", path: "/about" },
];

const AppNavBar = () => {
  const [open, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleNavIsOpen = () => {
    setIsOpen(!open);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <ReContainer>
      <nav className='bg-transparent sticky top-0 z-50'>
        <div className='mx-auto'>
          <div className='flex items-center h-16'>
            {/* Logo */}
            <div className='flex-shrink-0 grow'>
              <div className='w-28 cursor-pointer' onClick={scrollToTop}>
                <img src={logo} alt='Logo' className='w-full aspect-square' />
              </div>
            </div>

            {/* hamburger */}
            <GiHamburgerMenu
              className={`lg:hidden h-6 w-6 cursor-pointer hover:fill-light-primary transition ${
                open ? `hidden` : "block"
              }`}
              fill='#0090B8'
              onClick={handleNavIsOpen}
            />

            <div
              className={`${
                open ? "flex" : "hidden"
              } absolute top-0 right-0 bg-card-bg p-5 rounded-2xl flex-col min-h-dvh gap-4 lg:static lg:min-h-fit lg:bg-transparent lg:flex lg:flex-row lg:grow lg:justify-between lg:p-0`}
            >
              {/* Navigation Links */}
              <div className='flex flex-col items-center gap-5 mt-4 lg:flex-row lg:mt-0'>
                <div
                  className='text-primary cursor-pointer absolute right-4 top-4 lg:hidden'
                  onClick={handleNavIsOpen}
                >
                  x
                </div>
                {navLinks.map((link) => (
                  <AppNavLink key={link.id} link={link} />
                ))}
              </div>

              {isAuthenticated ? (
                <div className='cursor-pointer' onClick={handleLogout}>
                  <Avatar />
                </div>
              ) : (
                <div className='flex items-center gap-4 ml-auto'>
                  <Link to='/login'>
                    <SecondaryButton btnText='Log In' />
                  </Link>
                  <Link to='/register'>
                    <PrimaryButton btnText='Join Now' />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </ReContainer>
  );
};

export default AppNavBar;
