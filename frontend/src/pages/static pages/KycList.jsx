import React, { useMemo, useState } from "react";
import { Filter } from "lucide-react";
import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavBar";
import { useNavigate } from "react-router-dom";

export default function KYCList() {
  const navigate = useNavigate();

  const rows = [
    {
      id: 1,
      name: "Prinsha Shrestha",
      avatar: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=prinsha",
      doc: "Driver License",
      date: "Jan 11, 2026, 8:30 AM",
      rawDate: "2026-01-11T08:30:00",
      status: "Pending",
    },
    {
      id: 2,
      name: "Prinsha Shrestha",
      avatar: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=prinsha",
      doc: "Identity Document",
      date: "Jan 09, 2026, 7:34 PM",
      rawDate: "2026-01-09T19:34:00",
      status: "Pending",
    },
    {
      id: 3,
      name: "Prinsha Shrestha",
      avatar: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=prinsha",
      doc: "Driver License",
      date: "Jan 09, 2026, 6:55 PM",
      rawDate: "2026-01-09T18:55:00",
      status: "Pending",
    },
    {
      id: 4,
      name: "Prinsha Shrestha",
      avatar: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=prinsha",
      doc: "Motorcycle License",
      date: "Jan 07, 2026, 10:30 AM",
      rawDate: "2026-01-07T10:30:00",
      status: "Pending",
    },
  ];

  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState({
    document: "All",
    status: "All",
    date: "All",
    from: "",
    to: "",
  });

  // ---------------- FILTER LOGIC ----------------
  const filteredRows = useMemo(() => {
    const now = new Date();

    return rows.filter((r) => {
      const rowDate = new Date(r.rawDate);

      if (filters.document !== "All" && r.doc !== filters.document)
        return false;

      if (filters.status !== "All" && r.status !== filters.status) return false;

      if (filters.date === "Today") {
        return rowDate.toDateString() === now.toDateString();
      }

      if (filters.date === "Last7Days") {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(now.getDate() - 7);
        return rowDate >= sevenDaysAgo;
      }

      if (filters.date === "Range" && filters.from && filters.to) {
        return (
          rowDate >= new Date(filters.from) && rowDate <= new Date(filters.to)
        );
      }

      return true;
    });
  }, [rows, filters]);

  return (
    <div className="flex min-h-screen bg-[#F4F7FA]">
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <main className="flex-1 p-8 space-y-6">
        {/* TOP NAVBAR */}
        <TopNavbar
          title="KYC & Documentation Verification Hub"
          onSearch={(v) => console.log("Searching:", v)}
        />

        {/* CARD */}
        <div className="bg-white rounded-xl shadow">
          {/* HEADER */}
          <div className="p-6 border-b flex justify-between items-start">
            <div>
              <h2 className="font-semibold text-gray-800">
                KYC Verification List
              </h2>
              <p className="text-sm text-gray-500">
                Manage all users document list
              </p>
            </div>

            {/* FILTER */}
            <div className="relative">
              <button
                onClick={() => setShowFilter((p) => !p)}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800"
              >
                <Filter size={16} />
                Filter
              </button>

              {showFilter && (
                <div className="absolute right-0 mt-3 w-64 bg-white border rounded-xl shadow-lg p-4 z-20 space-y-3">
                  {/* Document */}
                  <select
                    className="w-full border rounded-md px-3 py-2 text-sm"
                    value={filters.document}
                    onChange={(e) =>
                      setFilters({ ...filters, document: e.target.value })
                    }
                  >
                    <option value="All">All Documents</option>
                    <option value="Driver License">Driver License</option>
                    <option value="Identity Document">Identity Document</option>
                    <option value="Motorcycle License">
                      Motorcycle License
                    </option>
                  </select>

                  {/* Status */}
                  <select
                    className="w-full border rounded-md px-3 py-2 text-sm"
                    value={filters.status}
                    onChange={(e) =>
                      setFilters({ ...filters, status: e.target.value })
                    }
                  >
                    <option value="All">All Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>

                  {/* Date */}
                  <select
                    className="w-full border rounded-md px-3 py-2 text-sm"
                    value={filters.date}
                    onChange={(e) =>
                      setFilters({ ...filters, date: e.target.value })
                    }
                  >
                    <option value="All">All Dates</option>
                    <option value="Today">Today</option>
                    <option value="Last7Days">Last 7 Days</option>
                    <option value="Range">Custom Range</option>
                  </select>

                  {/* CUSTOM RANGE – FIXED */}
                  {filters.date === "Range" && (
                    <div className="space-y-2">
                      <div>
                        <label className="text-xs text-gray-500">From</label>
                        <input
                          type="date"
                          className="w-full border rounded-md px-3 py-2 text-sm"
                          onChange={(e) =>
                            setFilters({
                              ...filters,
                              from: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div>
                        <label className="text-xs text-gray-500">To</label>
                        <input
                          type="date"
                          className="w-full border rounded-md px-3 py-2 text-sm"
                          onChange={(e) =>
                            setFilters({
                              ...filters,
                              to: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() =>
                      setFilters({
                        document: "All",
                        status: "All",
                        date: "All",
                        from: "",
                        to: "",
                      })
                    }
                    className="text-xs text-sky-600 hover:underline"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* TABLE */}
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
              {filteredRows.map((r) => (
                <tr key={r.id} className="border-t">
                  <td className="p-4 flex items-center gap-3">
                    <img src={r.avatar} className="w-8 h-8 rounded-full" />
                    {r.name}
                  </td>
                  <td>{r.doc}</td>
                  <td>{r.date}</td>
                  <td>
                    <span className="bg-orange-100 text-orange-500 px-3 py-1 rounded-full text-xs">
                      • {r.status}
                    </span>
                  </td>
                  <td className="text-right pr-6">
                    <button
                      onClick={() => navigate("/kyc-view")}
                      className="bg-sky-600 text-white px-4 py-2 rounded-md text-xs"
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}

              {filteredRows.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center text-gray-400 py-8">
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
