import { NavLink } from "react-router-dom";

const AppNavLink = ({ link }) => {
  return (
    <NavLink
      to={`${link.path}`}
      className={({ isActive }) =>
        `text-sm font-medium text-primary after:content[""] after:block after:w-0 after:bg-primary after:h-1 hover:after:w-full after:transition-all ${
          isActive ? "after:w-full" : "after:w-0"
        }`
      }
    >
      {link.name[0].toUpperCase() + link.name.slice(1)}{" "}
      {link.name === "about" && "Us"}
    </NavLink>
  );
};

export default AppNavLink;
