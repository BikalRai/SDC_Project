import React from "react";
import { Navigate, NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarCheck,
  BellRing,
  Settings,
  ShieldCheck,
  CreditCard,
  LogOut,
} from "lucide-react";
import { logo } from "@/utils/imports";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "@/slices/auth.slice";
import { useDispatch } from "react-redux";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem("authToken"); // Clear storage manually to be safe
    localStorage.removeItem("refreshToken");
    navigate("/login", { replace: true }); // Force redirect
  };
  return (
    <aside className="w-[260px] bg-[#DFF0E1] px-6 py-8 flex flex-col justify-between h-screen sticky top-0 border-r border-slate-200">
      {/* TOP */}
      <div>
        {/* LOGO */}
        <div
          className="flex pl-2 items-center gap-2 mb-12"
          onClick={() => navigate("/")}
        >
          <div className="flex-shrink-0">
            <div className="w-11 cursor-pointer">
              <img src={logo} alt="Logo" className="w-full aspect-square" />
            </div>
          </div>
          <span className="text-xs text-slate-500 cursor-pointer">
            Kiraya Bazar
          </span>
        </div>

        {/* NAV */}
        <nav className="space-y-2 text-sm">
          <SidebarItem
            to="/admin-dashboard"
            icon={<LayoutDashboard size={18} />}
            label="Dashboard"
          />
          <SidebarItem
            to="/bookings"
            icon={<CalendarCheck size={18} />}
            label="Bookings"
          />
          <SidebarItem
            to="/notifications"
            icon={<BellRing size={18} />}
            label="Notifications"
          />
          <SidebarItem
            to="/settings"
            icon={<Settings size={18} />}
            label="Settings"
          />

          <p className="mt-8 mb-2 text-xs text-slate-500">Report</p>

          <SidebarItem
            to="/kyc-list"
            icon={<ShieldCheck size={18} />}
            label="KYC Hub"
          />
          <SidebarItem
            to="/admin-payment"
            icon={<CreditCard size={18} />}
            label="Payment Details"
          />
        </nav>
      </div>

      {/* LOGOUT */}
      <button
        onClick={handleLogout}
        className="flex items-center justify-center gap-2 text-sm bg-[#0093B8] text-white py-2 rounded-lg cursor-pointer"
      >
        <LogOut size={16} /> Logout
      </button>
    </aside>
  );
};

export default Sidebar;

/* ---------- SIDEBAR ITEM ---------- */
function SidebarItem({ icon, label, to }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer
        ${
          isActive
            ? "bg-[#0093B8] text-white"
            : "text-slate-700 hover:bg-white/60"
        }`
      }
    >
      {icon}
      {label}
    </NavLink>
  );
}
