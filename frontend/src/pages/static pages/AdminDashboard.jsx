import React from "react";
import { NavLink } from "react-router-dom";
import {
  Bell,
  Search,
  LayoutDashboard,
  CalendarCheck,
  Settings,
  BellRing,
  ShieldCheck,
  CreditCard,
  LogOut,
  ChevronDown,
  Filter,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import Sidebar from "./Sidebar";

/* ---------- DATA ---------- */
const revenueData = [
  { month: "Jul", value: 38000 },
  { month: "Aug", value: 28000 },
  { month: "Sep", value: 36000 },
  { month: "Oct", value: 25000 },
  { month: "Nov", value: 34000 },
  { month: "Dec", value: 42000 },
];

const hireCancelData = [
  { name: "Total Hired", value: 51, color: "#3B82F6" },
  { name: "Total Canceled", value: 20, color: "#DC2626" },
  { name: "Total Pending", value: 29, color: "#22C55E" },
];

const products = [
  { id: "01", name: "Aprilia SR 125", owner: "John Doe", status: "Available" },
  {
    id: "02",
    name: "Working table",
    owner: "Chyangra Lal",
    status: "Unavailable",
  },
  {
    id: "03",
    name: "Suzuki Celerio ZXI",
    owner: "Suleman Pakya",
    status: "Rented out",
  },
];

/* ================= MAIN ================= */
export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-[#F5F8FA] font-sans">
      {/* SIDEBAR */}
      <Sidebar />

      {/* CONTENT */}
      <main className="flex-1 px-10 py-6">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-lg font-semibold">Today’s Statistics</h2>
            <p className="text-xs text-slate-500">
              Tue, 13th Jan, 2026, 7:30AM
            </p>
          </div>

          <div className="flex items-center gap-6">
            <Bell className="text-slate-400" />
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-3 text-slate-400"
              />
              <input
                className="pl-9 pr-4 py-2 text-sm rounded-xl bg-[#EEF2F5] w-[260px]"
                placeholder="Search here"
              />
            </div>
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-12 gap-6">
          {/* LEFT */}
          <div className="col-span-4 space-y-6">
            <StatCard title="TOTAL REVENUE" value="Rs-58,675" badge="+12.5%" />
            <StatCard
              title="ACTIVE RENTALS"
              value="3"
              badge="-2.5%"
              subLabel="PENDING PICKUPS"
              subValue="1"
              subBadge="5.0%"
            />

            <div className="bg-white rounded-xl p-5 border">
              <div className="flex justify-between mb-4">
                <h4 className="text-xs font-semibold text-slate-500">
                  HIRE VS CANCEL
                </h4>
                <span className="text-xs bg-slate-100 px-2 rounded">Today</span>
              </div>

              <div className="flex justify-center">
                <PieChart width={180} height={180}>
                  <Pie
                    data={hireCancelData}
                    dataKey="value"
                    innerRadius={60}
                    outerRadius={80}
                  >
                    {hireCancelData.map((d, i) => (
                      <Cell key={i} fill={d.color} />
                    ))}
                  </Pie>
                </PieChart>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="col-span-8 space-y-6">
            <div className="bg-white rounded-xl p-6 border">
              <h3 className="font-semibold mb-4">Product Availability</h3>
              <div className="flex items-center gap-4">
                <InputBox placeholder="Product number" />
                <InputBox placeholder="Dec 28,2025" />
                <InputBox placeholder="10 PM" />
                <button className="bg-[#0093B8] text-white px-6 py-2 rounded-lg">
                  Check
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl border">
              <div className="flex justify-between items-center px-6 py-4">
                <h3 className="font-semibold">Live product status</h3>
                <button className="flex items-center gap-2 text-sm text-slate-500">
                  <Filter size={16} /> Filter
                </button>
              </div>

              <table className="w-full text-sm">
                <thead className="text-slate-400 border-t border-b">
                  <tr>
                    <th className="py-3">No.</th>
                    <th>Product name</th>
                    <th>Owner</th>
                    <th>Status</th>
                    <th>Earning</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id} className="border-b last:border-none">
                      <td className="py-4 text-center">{p.id}</td>
                      <td>{p.name}</td>
                      <td>{p.owner}</td>
                      <td
                        className={
                          p.status === "Available"
                            ? "text-green-600"
                            : p.status === "Unavailable"
                              ? "text-red-500"
                              : "text-slate-400"
                        }
                      >
                        • {p.status}
                      </td>
                      <td>—</td>
                      <td className="text-right pr-6">
                        <button className="bg-[#0093B8] text-white px-4 py-1.5 rounded-md text-xs">
                          Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-white rounded-xl p-6 border">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Earning Summary</h3>
                <span className="text-sm text-slate-500 flex items-center gap-2">
                  Jul 2025–Oct 2025 <ChevronDown size={16} />
                </span>
              </div>

              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={revenueData}>
                  <XAxis dataKey="month" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function SidebarItem({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition
        ${isActive ? "bg-[#0093B8] text-white" : "text-slate-700 hover:bg-white/60"}`
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
}

function StatCard({ title, value, badge, subLabel, subValue, subBadge }) {
  return (
    <div className="bg-white rounded-xl p-6 border">
      <p className="text-xs text-slate-400 font-semibold">{title}</p>
      <p className="text-lg font-bold mt-2">{value}</p>
      {badge && (
        <span className="text-xs bg-green-100 text-green-600 px-2 rounded">
          {badge}
        </span>
      )}

      {subLabel && (
        <div className="mt-4">
          <p className="text-xs text-slate-400 font-semibold">{subLabel}</p>
          <div className="flex gap-2">
            <span className="font-semibold">{subValue}</span>
            <span className="text-xs bg-green-100 text-green-600 px-2 rounded">
              {subBadge}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

function InputBox({ placeholder }) {
  return (
    <div className="flex items-center gap-2 border rounded-lg px-3 py-2 text-sm text-slate-500">
      {placeholder} <ChevronDown size={14} />
    </div>
  );
}
