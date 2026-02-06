import React from "react";
import { Bell, Search, User } from "lucide-react";

const formatToday = () => {
  const now = new Date();
  return now.toLocaleString("en-US", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

const TopNavbar = ({
  title = "Title",
  onSearch,
  avatarUrl,
}) => {
  const hasAvatar = avatarUrl && avatarUrl.trim() !== "";

  return (
    <header className="w-full bg-[#F5F7FA] px-6 py-4 mb-2">
      <div className="flex items-center justify-between gap-6">
        
        {/* LEFT */}
        <div>
          <h1 className="text-[15px] font-semibold text-slate-800">
            {title}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {formatToday()}
          </p>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">
          
          {/* Notification */}
          <button className="p-2 rounded-full hover:bg-slate-200 transition">
            <Bell size={18} className="text-slate-600" />
          </button>

          {/* Search */}
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search here"
              onChange={(e) => onSearch?.(e.target.value)}
              className="
                w-[220px]
                pl-9 pr-4 py-2
                text-sm
                rounded-full
                bg-white
                text-slate-700
                placeholder:text-slate-400
                focus:outline-none
                focus:ring-2
                focus:ring-slate-200
              "
            />
          </div>

          {/* Avatar */}
          {hasAvatar ? (
            <img
              src={avatarUrl}
              alt="User"
              className="w-9 h-9 rounded-full object-cover cursor-pointer"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center cursor-pointer">
              <User size={18} className="text-slate-500" />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;
