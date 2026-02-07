import { useState } from "react";
import {
  Settings,
  Server,
  Database,
  HardDrive,
  Bike,
  Car,
  Sofa,
} from "lucide-react";
import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";

export default function SystemSettings() {
  const [platformName, setPlatformName] = useState("Kiraya Bazar");
  const [supportEmail, setSupportEmail] = useState("kirayabazar45@gmail.com");
  const [currency, setCurrency] = useState("NRP (Rs)");
  const [timezone, setTimezone] = useState("Asia/Kathmandu");

  const [notifications, setNotifications] = useState({
    bookingEmails: true,
    inventoryAlerts: true,
    systemUpdates: false,
  });

  const categories = [
    {
      id: 1,
      name: "Scooters",
      count: 124,
      icon: Bike,
      bg: "bg-sky-100",
      text: "text-sky-700",
    },
    {
      id: 2,
      name: "Cars",
      count: 24,
      icon: Car,
      bg: "bg-green-100",
      text: "text-green-700",
    },
    {
      id: 3,
      name: "Furniture",
      count: 67,
      icon: Sofa,
      bg: "bg-orange-100",
      text: "text-orange-700",
    },
  ];

  const handleSave = () => {
    console.log({
      platformName,
      supportEmail,
      currency,
      timezone,
      notifications,
    });
    alert("Settings saved successfully!");
  };

  const inputStyle =
    "w-full mt-1 p-2 border rounded-lg text-sm transition focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 hover:border-sky-400";

  return (
    <div className="flex h-screen bg-[#F4F8FB]">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <TopNavbar title="System Settings & Configurations" />

        <div className="px-6">
          {/* Tabs */}
          <div className="border-b">
            <button className="pb-2 border-b-2 border-sky-600 text-sky-600 text-sm font-medium">
              General Settings
            </button>
          </div>

          <div className="grid grid-cols-12 gap-6 mt-6">
            {/* Platform Configuration */}
            <div className="col-span-8 bg-white rounded-xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <Settings size={18} />
                <h3 className="font-semibold">Platform Configuration</h3>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-sm text-gray-500">Platform name</label>
                  <input
                    value={platformName}
                    onChange={(e) => setPlatformName(e.target.value)}
                    className={inputStyle}
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-500">Support Email</label>
                  <input
                    value={supportEmail}
                    onChange={(e) => setSupportEmail(e.target.value)}
                    className={inputStyle}
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-500">
                    Default Currency
                  </label>
                  <input
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className={`${inputStyle} bg-gray-100`}
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-500">Time Zone</label>
                  <input
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className={inputStyle}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button className="px-4 py-2 text-sm rounded-lg bg-gray-100 hover:bg-gray-200 active:scale-95 transition">
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 text-sm rounded-lg bg-sky-600 text-white hover:bg-sky-700 active:scale-95 transition shadow"
                >
                  Save change
                </button>
              </div>

              {/* Category Overview */}
              <div className="bg-white rounded-xl p-6 mt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold">Category Overview</h3>
                  <button className="text-sky-600 text-sm hover:underline">
                    Manage all categories →
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {categories.map((cat) => {
                    const Icon = cat.icon;
                    return (
                      <div
                        key={cat.id}
                        className={`${cat.bg} p-4 rounded-xl cursor-pointer hover:scale-[1.02] active:scale-95 transition`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={cat.text} />
                          <div>
                            <p className="font-medium">{cat.name}</p>
                            <p className="text-xs text-gray-500">
                              {cat.count} Items
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="col-span-4 space-y-6">
              {/* Quick Status */}
              <div className="bg-white rounded-xl p-6">
                <h3 className="font-semibold mb-4">Quick Status</h3>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="flex items-center gap-2">
                      <Server size={14} className="text-green-500" />
                      Server Status
                    </span>
                    <span className="text-green-600">Online</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="flex items-center gap-2">
                      <Database size={14} className="text-green-500" />
                      API Endpoint
                    </span>
                    <span className="text-green-600">Connected</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="flex items-center gap-2">
                      <HardDrive size={14} />
                      Auto-Backups
                    </span>
                    <span className="text-sky-600">Daily</span>
                  </div>
                </div>
              </div>

              {/* Help Card */}
              <div className="bg-green-100 rounded-xl p-6">
                <h3 className="font-semibold text-green-900 mb-2">
                  Need Help?
                </h3>
                <p className="text-sm text-green-800">
                  If you need assistance with platform configuration, our
                  technical team is available 24/7.
                </p>
                <button className="mt-4 px-4 py-2 border rounded-lg text-sm hover:bg-white active:scale-95 transition">
                  View Documentation
                </button>
              </div>

              {/* Notification Alerts */}
              <div className="bg-white rounded-xl p-6">
                <h3 className="font-semibold mb-4">Notification Alerts</h3>

                {[
                  { key: "bookingEmails", label: "New Booking Emails" },
                  { key: "inventoryAlerts", label: "Inventory Low Alerts" },
                  { key: "systemUpdates", label: "System Updates" },
                ].map((item) => (
                  <div
                    key={item.key}
                    className="flex justify-between items-center mb-3"
                  >
                    <span className="text-sm">{item.label}</span>
                    <input
                      type="checkbox"
                      checked={notifications[item.key]}
                      onChange={() =>
                        setNotifications({
                          ...notifications,
                          [item.key]: !notifications[item.key],
                        })
                      }
                      className="cursor-pointer accent-sky-600"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
