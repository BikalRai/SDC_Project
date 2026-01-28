import React from "react";
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

/* ---------- DATA (dynamic-ready) ---------- */
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

/* ---------- MAIN ---------- */
export function AdminDashboard() {
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

        {/* TOP GRID */}
        <div className="grid grid-cols-12 gap-6">
          {/* LEFT CARDS */}
          <div className="col-span-4 space-y-6">
            <StatCard
              title="TOTAL REVENUE"
              value="Rs-58,675"
              badge="+12.5%"
              iconBg="bg-green-100"
            />

            <StatCard
              title="ACTIVE RENTALS"
              value="3"
              badge="-2.5%"
              subLabel="PENDING PICKUPS"
              subValue="1"
              subBadge="5.0%"
              iconBg="bg-green-100"
            />

            {/* DONUT */}
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

              <div className="space-y-2 text-sm mt-4">
                {hireCancelData.map((d) => (
                  <div key={d.name} className="flex justify-between">
                    <span className="flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ background: d.color }}
                      />
                      {d.name}
                    </span>
                    <span className="font-semibold">{d.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="col-span-8 space-y-6">
            {/* AVAILABILITY */}
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

            {/* TABLE */}
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

            {/* LINE CHART */}
            <div className="bg-white rounded-xl p-6 border">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Earning Summary</h3>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  Jul 2025–Oct 2025 <ChevronDown size={16} />
                </div>
              </div>

              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={revenueData} margin={{ left: -20, right: 10 }}>
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

/* ---------- SMALL COMPONENTS ---------- */
function SidebarItem({ icon, label, active }) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer ${
        active ? "bg-[#0093B8] text-white" : "text-slate-700 hover:bg-white/60"
      }`}
    >
      {icon} {label}
    </div>
  );
}

function StatCard({ title, value, badge, subLabel, subValue, subBadge }) {
  return (
    <div className="bg-white rounded-xl p-6 border">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs text-slate-400 font-semibold">{title}</p>
          <p className="text-lg font-bold mt-2">{value}</p>
        </div>
        {badge && (
          <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded">
            {badge}
          </span>
        )}
      </div>

      {subLabel && (
        <div className="mt-4">
          <p className="text-xs text-slate-400 font-semibold">{subLabel}</p>
          <div className="flex items-center gap-2 mt-1">
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

/* ================= PAYMENT DETAILS PAGE ================= */
export default function PaymentDetails() {
  const transactions = [
    {
      date: "Jan 11, 2026, 8:30 AM",
      customer: "John Doe",
      product: "Aprilia SR 125",
      amount: "Rs–1200",
      status: "Pending",
    },
    {
      date: "Jan 09, 2026, 7:34 PM",
      customer: "Piggie Kumar",
      product: "Working table",
      amount: "Rs–1500",
      status: "Completed",
    },
    {
      date: "Jan 09, 2026, 6:55 PM",
      customer: "Arham Urf",
      product: "Suzuki Celerio ZXI",
      amount: "Rs–2000",
      status: "Pending",
    },
    {
      date: "Jan 07, 2026, 10:30 AM",
      customer: "Fhatima Dona",
      product: "Audi R8",
      amount: "Rs–1550",
      status: "Completed",
    },
    {
      date: "Jan 07, 2026, 5:30 PM",
      customer: "Chyangra Lal",
      product: "Office Chair",
      amount: "Rs–500",
      status: "Pending",
    },
    {
      date: "Jan 06, 2026, 4:12 PM",
      customer: "Suleman Pakya",
      product: "Suzuki Celerio ZXI",
      amount: "Rs–1200",
      status: "Completed",
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#F5F8FA] font-sans">
      {/* SIDEBAR (shared) */}
      <Sidebar />
      

      {/* CONTENT */}
      <main className="flex-1 px-10 py-6">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-lg font-semibold">
              Earnings & Payment Details
            </h2>
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

        {/* TRANSACTION TABLE */}
        <div className="bg-white rounded-xl border mb-8">
          <div className="flex justify-between items-center px-6 py-5 border-b">
            <div>
              <h3 className="font-semibold">Transaction History</h3>
              <p className="text-sm text-slate-400">
                Manage and track all customer payment
              </p>
            </div>
            <button className="flex items-center gap-2 text-sm text-slate-500">
              <Filter size={16} /> Filter
            </button>
          </div>

          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="py-4">TRANSACTION DATE</th>
                <th>CUSTOMER</th>
                <th>PRODUCT</th>
                <th>AMOUNT</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t, i) => (
                <tr key={i} className="border-t">
                  <td className="py-4 px-4">{t.date}</td>
                  <td className="flex items-center gap-2 px-4">
                    👤 {t.customer}
                  </td>
                  <td className="px-4">{t.product}</td>
                  <td className="px-4 font-semibold">{t.amount}</td>
                  <td className="px-4">
                    <span
                      className={`px-4 py-1 rounded-full text-xs ${t.status === "Completed" ? "bg-green-100 text-green-600" : "bg-orange-100 text-orange-500"}`}
                    >
                      • {t.status}
                    </span>
                  </td>
                  <td className="px-4">
                    <button className="bg-[#0093B8] text-white px-4 py-1.5 rounded-md text-xs">
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between items-center px-6 py-4 text-sm text-slate-400">
            <span>Showing 1 to 6 of 25 transactions</span>
            <div className="flex gap-2">
              <button className="border px-3 py-1 rounded">‹</button>
              <button className="bg-[#0093B8] text-white px-3 py-1 rounded">
                1
              </button>
              <button className="border px-3 py-1 rounded">2</button>
              <button className="border px-3 py-1 rounded">3</button>
              <button className="border px-3 py-1 rounded">›</button>
            </div>
          </div>
        </div>

        {/* INFO CARDS */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border p-6">
            <h4 className="font-semibold mb-2">Payment Resolution</h4>
            <p className="text-sm text-slate-400 mb-2">
              Stuck with a transaction? Visit our resolution center to handle
              payment disputes.
            </p>
            <a className="text-sm text-[#0093B8]">Go to resolution center</a>
          </div>

          <div className="bg-white rounded-xl border p-6">
            <h4 className="font-semibold mb-2">Monthly Reports</h4>
            <p className="text-sm text-slate-400 mb-2">
              Download your full financial statement and tax documents for the
              past month.
            </p>
            <a className="text-sm text-[#0093B8]">Download Statement</a>
          </div>
        </div>
      </main>
    </div>
  );
}
