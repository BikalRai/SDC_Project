import { useState } from "react";
import { Bell, Search, Car, CreditCard, Bike } from "lucide-react";
import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavBar";

export default function KYCHubReview() {
  const initialReviews = [
    {
      id: 1,
      name: "Prinsha Shrestha",
      email: "prinshashrestha@gmail.com",
      phone: "9840007774",
      location: "Lalitpur",
      type: "Driver's License",
      time: "2h ago",
      icon: Car,
      status: "pending",
      docFront: "",
      docBack: "",
      data: {
        citizenship: "1234567890",
        dob: "08/19/1998",
        expiry: "5/20/2028",
      },
    },
    {
      id: 2,
      name: "Prinsha Shrestha",
      email: "prinshashrestha@gmail.com",
      phone: "9840007774",
      location: "Lalitpur",
      type: "Identity Document",
      time: "3h ago",
      icon: CreditCard,
      status: "pending",
    },
    {
      id: 3,
      name: "Prinsha Shrestha",
      email: "prinshashrestha@gmail.com",
      phone: "9840007774",
      location: "Lalitpur",
      type: "Motorcycle License",
      time: "6h ago",
      icon: Bike,
      status: "pending",
    },
    {
      id: 4,
      name: "Prinsha Shrestha",
      email: "prinshashrestha@gmail.com",
      phone: "9840007774",
      location: "Lalitpur",
      type: "Driver's License",
      time: "6h ago",
      icon: Car,
      status: "pending",
    },
  ];

  const [reviews, setReviews] = useState(initialReviews);
  const [activeId, setActiveId] = useState(reviews[0].id);
  const [rejectReason, setRejectReason] = useState("");
  const [notes, setNotes] = useState("");

  const activeReview = reviews.find((r) => r.id === activeId);
  const pendingCount = reviews.filter((r) => r.status === "pending").length;

  const initials = activeReview.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  const handleDecision = (decision) => {
    if (decision === "reject" && !rejectReason.trim()) {
      alert("Please provide a rejection reason.");
      return;
    }

    setReviews((prev) =>
      prev.map((r) =>
        r.id === activeId
          ? { ...r, status: decision === "approve" ? "approved" : "rejected" }
          : r
      )
    );

    setRejectReason("");
    setNotes("");
  };

  return (
    <div className="min-h-screen bg-[#F4F7FA] flex">
      <Sidebar />

      <main className="flex-1">
        <TopNavbar
          title="KYC & Documentation Verification Hub"
          onSearch={(value) => console.log("Searching:", value)}
        />

        <div className="px-10 py-6 grid grid-cols-[320px_1fr] gap-6">
          {/* LEFT LIST */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <h2 className="font-semibold">Pending Review</h2>
              <span className="bg-orange-400 text-white text-xs px-3 py-1 rounded-full">
                {pendingCount} PENDING
              </span>
            </div>

            <div className="border rounded-lg overflow-hidden bg-white">
              {reviews.map((r) => {
                const Icon = r.icon;
                const isActive = r.id === activeId;

                return (
                  <div
                    key={r.id}
                    onClick={() => setActiveId(r.id)}
                    className={`flex items-center justify-between px-4 py-4 border-b last:border-b-0 cursor-pointer transition ${
                      isActive
                        ? "bg-teal-50 border-l-4 border-teal-500"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-teal-200 flex items-center justify-center font-semibold text-teal-700">
                        {r.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <div className="font-medium">{r.name}</div>
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

          {/* RIGHT PANEL */}
          <div className="space-y-6">
            {/* USER INFO */}
            <div className="bg-white rounded-lg p-6 flex items-center justify-between shadow">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-teal-200 flex items-center justify-center font-bold text-teal-700">
                  {initials}
                </div>
                <div>
                  <div className="font-semibold">{activeReview.name}</div>
                  <div className="text-sm text-gray-400">
                    {activeReview.email}
                  </div>
                </div>
              </div>
              <div className="flex gap-6 text-sm text-gray-500">
                <div>📞 {activeReview.phone}</div>
                <div>📍 {activeReview.location}</div>
                <button className="bg-gray-100 px-3 py-1 rounded">
                  View Profile
                </button>
              </div>
            </div>

            {/* DOCUMENTS */}
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

            {/* FORM + DECISION */}
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2 bg-white rounded-lg p-6 shadow grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-500">Full Name</label>
                  <input
                    className="w-full border rounded px-3 py-2"
                    value={activeReview.name}
                    readOnly
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-500">
                    Citizenship Number
                  </label>
                  <input
                    className="w-full border rounded px-3 py-2"
                    value={activeReview.data?.citizenship || ""}
                    readOnly
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-500">Date of Birth</label>
                  <input
                    className="w-full border rounded px-3 py-2"
                    value={activeReview.data?.dob || ""}
                    readOnly
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-500">Expiry Date</label>
                  <input
                    className="w-full border rounded px-3 py-2 text-red-500"
                    value={activeReview.data?.expiry || ""}
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
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                  />
                </div>

                <div className="flex-1">
                  <label className="text-sm text-gray-500">
                    Internal Notes
                  </label>
                  <textarea
                    className="w-full h-full border rounded px-3 py-2"
                    placeholder="Enter review notes..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>

                <div className="flex gap-3 justify-end">
                  <button
                    onClick={() => handleDecision("reject")}
                    className="border border-red-500 text-red-500 px-4 py-2 rounded"
                  >
                    REJECT
                  </button>
                  <button
                    onClick={() => handleDecision("approve")}
                    className="bg-teal-600 text-white px-4 py-2 rounded"
                  >
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
