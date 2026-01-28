import {
  Bell,
  Search,
  ShieldCheck,
  FileText,
  CreditCard,
  LogOut,
  Settings,
  LayoutDashboard,
} from "lucide-react";
import Sidebar from "./Sidebar";

export default function KYCHub() {
  const rows = [
    {
      id: 1,
      name: "Prinsha Shrestha",
      doc: "Driver License",
      date: "Jan 11, 2026, 8:30 AM",
    },
    {
      id: 2,
      name: "Prinsha Shrestha",
      doc: "Identity Document",
      date: "Jan 09, 2026, 7:34 PM",
    },
    {
      id: 3,
      name: "Prinsha Shrestha",
      doc: "Driver License",
      date: "Jan 09, 2026, 6:55 PM",
    },
    {
      id: 4,
      name: "Prinsha Shrestha",
      doc: "Motorcycle License",
      date: "Jan 07, 2026, 10:30 AM",
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#F4F7FA]">
      {/* SIDEBAR */}
      <Sidebar />

      {/* Main */}
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-xl font-semibold text-gray-800">
              KYC & Documentation Verification Hub
            </h1>
            <p className="text-sm text-gray-500">Tue, 13th Jan, 2026, 7:30AM</p>
          </div>

          <div className="flex items-center gap-6">
            <Bell className="text-gray-400" />
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                className="pl-10 pr-4 py-2 rounded-xl bg-white shadow text-sm"
                placeholder="Search here"
              />
            </div>
            <img
              src="https://i.pravatar.cc/40"
              className="w-10 h-10 rounded-full"
            />
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-xl shadow">
          <div className="p-6 border-b">
            <h2 className="font-semibold text-gray-800">
              KYC Verification List
            </h2>
            <p className="text-sm text-gray-500">
              Manage all users document list
            </p>
          </div>

          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-600">
              <tr>
                <th className="p-4">Users</th>
                <th>Document Type</th>
                <th>Submission Date</th>
                <th>Status</th>
                <th className="text-right pr-6">Action</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t">
                  <td className="p-4 flex items-center gap-3">
                    <img
                      src="https://i.pravatar.cc/32"
                      className="w-8 h-8 rounded-full"
                    />
                    {r.name}
                  </td>
                  <td>{r.doc}</td>
                  <td>{r.date}</td>
                  <td>
                    <span className="bg-orange-100 text-orange-500 px-3 py-1 rounded-full text-xs">
                      • Pending
                    </span>
                  </td>
                  <td className="text-right pr-6">
                    <button className="bg-sky-600 text-white px-4 py-2 rounded-md text-xs">
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active }) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer ${
        active ? "bg-teal-500 text-white" : "hover:bg-white/60"
      }`}
    >
      {icon}
      {label}
    </div>
  );
}
