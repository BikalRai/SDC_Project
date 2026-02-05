import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Bell,
  Search,
  ChevronDown,
  ArrowUp,
  ArrowDown,
  Filter,
  Key,
  Clock,
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
import TopNavbar from "./TopNavBar";

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
  { label: "Total Hired", value: 51, color: "#3B82F6", trend: "up" },
  { label: "Total Canceled", value: 20, color: "#DC2626", trend: "up" },
  { label: "Total Pending", value: 29, color: "#22C55E", trend: "down" },
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
  const [filter, setFilter] = useState("All");
  const [open, setOpen] = useState(false);

  const filteredProducts =
    filter === "All" ? products : products.filter((p) => p.status === filter);

  return (
    <div className="flex min-h-screen bg-[#F5F8FA] font-sans">
      <Sidebar />

      {/* CONTENT */}
      <main className="flex-1 px-4 sm:px-6 lg:px-10 py-6">
        {/* HEADER */}
        <TopNavbar
          title="Today's Statistics"
          onSearch={(value) => console.log("Searching:", value)}
          // avatarUrl="/user-avatar.png"
        />

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT */}
          <div className="lg:col-span-4 space-y-6">
            <StatCard title="TOTAL REVENUE" value="Rs-58,675" badge="+12.5%" />

            {/* ACTIVE RENTALS */}
            <div className="bg-white rounded-xl border p-5 w-full">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-md bg-green-100 flex items-center justify-center">
                    <Key size={16} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400 tracking-wide">
                      ACTIVE RENTALS
                    </p>
                    <p className="text-lg font-semibold text-slate-800 mt-1">
                      3
                    </p>
                  </div>
                </div>
                <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full font-medium">
                  -2.5%
                </span>
              </div>

              <div className="flex justify-between items-start">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-md bg-orange-100 flex items-center justify-center">
                    <Clock size={16} className="text-orange-500" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400 tracking-wide">
                      PENDING PICKUPS
                    </p>
                    <p className="text-lg font-semibold text-slate-800 mt-1">
                      1
                    </p>
                  </div>
                </div>
                <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full font-medium">
                  5.0%
                </span>
              </div>
            </div>

            {/* HIRE VS CANCEL */}
            <div className="bg-white rounded-xl border p-5 w-full">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-xs font-semibold text-slate-400 tracking-wide">
                  HIRE VS CANCEL
                </h4>
                <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded">
                  Today
                </span>
              </div>

              <div className="flex justify-center mb-4">
                <PieChart width={160} height={160}>
                  <Pie
                    data={hireCancelData}
                    dataKey="value"
                    innerRadius={55}
                    outerRadius={75}
                    startAngle={90}
                    endAngle={-270}
                  >
                    {hireCancelData.map((d, i) => (
                      <Cell key={i} fill={d.color} />
                    ))}
                  </Pie>
                </PieChart>
              </div>

              <div className="space-y-2 text-sm">
                {hireCancelData.map((item, i) => (
                  <div key={i} className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      {item.label}
                    </div>
                    <div className="flex items-center gap-1">
                      {item.value}%
                      {item.trend === "up" ? (
                        <ArrowUp size={14} className="text-green-500" />
                      ) : (
                        <ArrowDown size={14} className="text-red-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-8 space-y-6">
            {/* Product Availability */}
            <div className="bg-white rounded-xl p-6 border">
              <h3 className="font-semibold mb-4">Product Availability</h3>

              <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
                <select className="h-11 border rounded-md px-4 text-sm">
                  <option>Product number</option>
                </select>

                <div className="flex">
                  <input
                    type="date"
                    className="h-11 border rounded-l-md px-3"
                  />
                  <input
                    type="time"
                    className="h-11 border rounded-r-md px-3"
                  />
                </div>

                <button className="h-11 px-6 bg-[#0093B8] text-white rounded-md">
                  Check
                </button>
              </div>
            </div>

            {/* TABLE */}
            <div className="bg-white rounded-xl border">
              <div className="flex justify-between items-center px-6 py-4">
                <h3 className="font-semibold">Live product status</h3>

                <div className="relative">
                  <button
                    onClick={() => setOpen(!open)}
                    className="flex items-center gap-2 text-sm text-slate-500"
                  >
                    <Filter size={16} /> Filter
                  </button>

                  {open && (
                    <div className="absolute right-0 mt-2 w-44 bg-white border rounded-md shadow">
                      {["All", "Available", "Unavailable"].map((s) => (
                        <button
                          key={s}
                          onClick={() => {
                            setFilter(s);
                            setOpen(false);
                          }}
                          className="w-full px-4 py-2 text-left hover:bg-slate-100"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="overflow-x-auto max-h-[360px]">
                <table className="w-full text-sm min-w-[700px]">
                  <thead className="sticky top-0 bg-white border-b">
                    <tr className="text-slate-400">
                      <th className="py-3">No.</th>
                      <th>Product name</th>
                      <th>Owner</th>
                      <th>Status</th>
                      <th>Earning</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((p) => (
                      <tr key={p.id} className="border-b">
                        <td className="py-4 text-center">{p.id}</td>
                        <td className="text-center">{p.name}</td>
                        <td className="text-center">{p.owner}</td>
                        <td className="text-center">{p.status}</td>
                        <td className="text-center">—</td>
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
            </div>

            {/* CHART */}
            <div className="bg-white rounded-xl p-6 border">
              <h3 className="font-semibold mb-4">Earning Summary</h3>
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={revenueData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line dataKey="value" stroke="#3B82F6" strokeWidth={2} />
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

function StatCard({ title, value, badge }) {
  return (
    <div className="bg-white rounded-xl p-6 border">
      <p className="text-xs text-slate-400 font-semibold">{title}</p>
      <p className="text-lg font-bold mt-2">{value}</p>
      {badge && (
        <span className="text-xs bg-green-100 text-green-600 px-2 rounded">
          {badge}
        </span>
      )}
    </div>
  );
}
