import { Bell, Search, Car, CreditCard, Bike } from "lucide-react";
import Sidebar from "./Sidebar";

export default function KYCHubReview() {
  const reviews = [
    {
      id: 1,
      type: "Driver's License",
      time: "2h ago",
      icon: Car,
      active: true,
    },
    { id: 2, type: "Identity Document", time: "3h ago", icon: CreditCard },
    { id: 3, type: "Motorcycle License", time: "6h ago", icon: Bike },
    { id: 4, type: "Driver's License", time: "6h ago", icon: Car },
  ];

  return (
    <div className="min-h-screen bg-[#F4F7FA] flex">
      {/* SIDEBAR */}
      <Sidebar />

      {/* Main */}
      <main className="flex-1">
        {/* Header */}
        <header className="flex items-center justify-between px-10 py-6 border-b bg-[#F4F7FA]">
          <div>
            <h1 className="font-semibold text-lg">
              KYC & Documentation Verification Hub
            </h1>
            <p className="text-sm text-gray-500">Tue, 13th Jan, 2026, 7:30AM</p>
          </div>
          <div className="flex items-center gap-6">
            <Bell className="text-gray-400" />
            <div className="relative">
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={18}
              />
              <input
                className="pl-10 pr-4 py-2 rounded-xl bg-white shadow text-sm"
                placeholder="Search here"
              />
            </div>
            <div className="w-10 h-10 rounded-full bg-teal-200" />
          </div>
        </header>

        {/* Content */}
        <div className="px-10 py-6 grid grid-cols-[320px_1fr] gap-6">
          {/* Left list */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <h2 className="font-semibold">Pending Review</h2>
              <span className="bg-orange-400 text-white text-xs px-3 py-1 rounded-full">
                4 PENDING
              </span>
            </div>

            <div className="border rounded-lg overflow-hidden bg-white">
              {reviews.map((r) => {
                const Icon = r.icon;
                return (
                  <div
                    key={r.id}
                    className={`flex items-center justify-between px-4 py-4 border-b last:border-b-0 ${
                      r.active ? "bg-teal-50 border-l-4 border-teal-500" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-teal-200 flex items-center justify-center font-semibold text-teal-700">
                        PS
                      </div>
                      <div>
                        <div className="font-medium">Prinsha Shrestha</div>
                        <div className="text-sm text-gray-400">
                          {r.type} · {r.time}
                        </div>
                      </div>
                    </div>
                    <Icon size={18} className="text-gray-600" />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right panel */}
          <div className="space-y-6">
            {/* User info */}
            <div className="bg-white rounded-lg p-6 flex items-center justify-between shadow">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-teal-200 flex items-center justify-center font-bold text-teal-700">
                  PS
                </div>
                <div>
                  <div className="font-semibold">Prinsha Shrestha</div>
                  <div className="text-sm text-gray-400">
                    prinshashrestha@gmail.com
                  </div>
                </div>
              </div>
              <div className="flex gap-6 text-sm text-gray-500">
                <div>📞 9840007774</div>
                <div>📍 Lalitpur</div>
                <button className="bg-gray-100 px-3 py-1 rounded">
                  View Profile
                </button>
              </div>
            </div>

            {/* Documents */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="text-xs text-gray-400 mb-2">
                  FRONT OF LICENSE
                </div>
                <div className="h-40 bg-blue-200 rounded-lg" />
              </div>
              <div>
                <div className="text-xs text-gray-400 mb-2">
                  BACK OF LICENSE
                </div>
                <div className="h-40 bg-blue-300 rounded-lg" />
              </div>
            </div>

            {/* Form + decision */}
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2 bg-white rounded-lg p-6 shadow grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-500">Full Name</label>
                  <input
                    className="w-full border rounded px-3 py-2"
                    value="Prinsha Shrestha"
                    readOnly
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-500">
                    Citizenship Number
                  </label>
                  <input
                    className="w-full border rounded px-3 py-2"
                    value="1234567890"
                    readOnly
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-500">Date of Birth</label>
                  <input
                    className="w-full border rounded px-3 py-2"
                    value="08/19/1998"
                    readOnly
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-500">Expiry Date</label>
                  <input
                    className="w-full border rounded px-3 py-2 text-red-500"
                    value="5/20/2028"
                    readOnly
                  />
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow flex flex-col gap-4">
                <h3 className="font-semibold">Final Decision</h3>
                <div>
                  <label className="text-sm text-gray-500">
                    Rejection Reason
                  </label>
                  <input
                    className="w-full border rounded px-3 py-2"
                    placeholder="Give a reason"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-sm text-gray-500">
                    Internal Notes
                  </label>
                  <textarea
                    className="w-full h-full border rounded px-3 py-2"
                    placeholder="Enter review notes..."
                  />
                </div>
                <div className="flex gap-3 justify-end">
                  <button className="border border-red-500 text-red-500 px-4 py-2 rounded">
                    REJECT
                  </button>
                  <button className="bg-teal-600 text-white px-4 py-2 rounded">
                    APPROVE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
