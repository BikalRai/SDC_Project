import { FaList } from "react-icons/fa6";
import { LuCirclePlus, LuLogOut, LuSettings } from "react-icons/lu";
import { LuShoppingBag } from "react-icons/lu";
import UserDashboardLink from "./UserDashboardLink";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/slices/auth.slice";
import { logo } from "@/utils/imports";

const navLinks = [
  {
    id: 1,
    icon: <FaList />,
    linkName: "My Listed Items",
    path: "/user/dashboard",
  },
  {
    id: 2,
    icon: <LuCirclePlus />,
    linkName: "Add New Item",
    path: "/user/add",
  },
  {
    id: 3,
    icon: <LuShoppingBag />,
    linkName: "My Rentals",
    path: "/user/rentals",
  },
  {
    id: 4,
    icon: <LuSettings />,
    linkName: "Profile & Settings",
    path: "/user/settings",
  },
];

const UserDashboardNavBar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  return (
    <nav className="min-h-dvh w-full flex flex-col items-center gap-10 py-0 sm:py-3 shadow-lg sticky top-0 bg-background">
      <div className="flex flex-col">
        <Link to="/">
          <div className="text-xl sm:text-2xl font-bold text-primary text-center">
            <Link to="/">
              <img src={logo} alt="LOGO" />
            </Link>
          </div>
          <div className="hidden md:block text-xs sm:text-sm text-center font-light text-text-muted">
            welcome, {user?.fullName}
          </div>
        </Link>
      </div>
      <div className="flex flex-col gap-10">
        {navLinks.map((link) => (
          <UserDashboardLink
            key={link.id}
            icon={link.icon}
            linkName={link.linkName}
            path={link.path}
          />
        ))}
      </div>
      <div
        onClick={() => dispatch(logoutUser())}
        className="
          flex items-center font-medium gap-2 p-3 rounded hover:text-primary
          transition-all duration-300 cursor-pointer mt-auto
        "
      >
        <span className="flex items-center justify-center text-lg">
          <LuLogOut />
        </span>
        <span className="text-base leading-none transition-all duration-300 w-0 hidden md:w-fit md:block">
          Logout
        </span>
      </div>
    </nav>
  );
};

export default UserDashboardNavBar;
