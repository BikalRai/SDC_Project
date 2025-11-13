import { NavLink } from "react-router-dom";

const UserDashboardLink = ({ icon, linkName, path }) => {
  return (
    <NavLink
      to={`${path}`}
      className={({ isActive }) =>
        `flex items-center font-medium gap-2 p-3 rounded ${
          isActive ? "text-primary bg-[#0090B833]" : ""
        } hover:text-text-white hover:bg-primary transition-all duration-300 cursor-pointer`
      }
    >
      <span className='text-lg'>{icon}</span>
      <span className='text-sm leading-none transition-all duration-300 w-0 hidden md:w-fit md:block'>{`${linkName}`}</span>
    </NavLink>
  );
};

export default UserDashboardLink;
