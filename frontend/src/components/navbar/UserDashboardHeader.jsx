import React from "react";
import NavSearch from "../searchBar/NavSearch";
import { LuBell } from "react-icons/lu";
import { GoQuestion } from "react-icons/go";
import NavIcons from "./NavIcons";
import { Avatar } from "@mui/material";

const navIcons = [
  { id: 1, icon: LuBell, title: "Notification" },
  { id: 2, icon: GoQuestion, title: "Help" },
];

const UserDashboardHeader = () => {
  return (
    <div className='max-h-[100px] shadow'>
      <div className='flex items-center justify-between py-6 px-12'>
        <NavSearch />
        <div className='flex items-center gap-5 text-text-muted'>
          {navIcons.map((icon) => (
            <NavIcons key={icon.id} icon={icon.icon} title={icon.title} />
          ))}
          <Avatar
            alt='Remy Sharp'
            src=''
            className='hover:drop-shadow-2xl cursor-pointer transition-all duration-300'
          />
        </div>
      </div>
    </div>
  );
};

export default UserDashboardHeader;
