import React from "react";
import NavSearch from "../searchBar/NavSearch";
import { LuBell } from "react-icons/lu";
import { GoQuestion } from "react-icons/go";
import NavIcons from "./NavIcons";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const navIcons = [
  { id: 1, icon: LuBell, title: "Notification" },
  { id: 2, icon: GoQuestion, title: "Help" },
];

const UserDashboardHeader = () => {
  const { user } = useSelector((state) => state.auth);

  console.log(user);
  return (
    <div className="max-h-[100px] shadow bg-gray-300">
      <div className="flex items-center justify-between py-2 px-4 md:px-8 lg:px-12">
        <NavSearch />
        <div className="flex items-center gap-2 md:gap-4 lg:gap-5 text-text-muted">
          {navIcons.map((icon) => (
            <NavIcons key={icon.id} icon={icon.icon} title={icon.title} />
          ))}
          <Link to="/user/profile">
            <Avatar
              alt={user?.fullName}
              src={user?.image}
              className="hover:drop-shadow-2xl cursor-pointer transition-all duration-300"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardHeader;
