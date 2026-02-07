import { useState } from "react";
<<<<<<< HEAD
import { Bell, Search, Car, CreditCard, Bike } from "lucide-react";
=======
import {
  Car,
  CreditCard,
  Bike,
  CheckCircle,
  XCircle,
} from "lucide-react";
import Sidebar from "./Sidebar";
>>>>>>> 87f4838fb4e177dc5525e3a5b49d20efb68be9be
import TopNavbar from "./TopNavbar";

export default function KYCHub() {
  const initialData = {
    pending: [
      {
        id: 1,
        name: "Prinsha Shrestha",
        type: "Driver’s License",
        time: "2h ago",
        icon: Car,
        email: "prinshashrestha@gmail.com",
        phone: "9840007774",
        location: "Lalitpur",
        citizenship: "1234567890",
        dob: "08/19/1998",
        expiry: "5/20/2028",
        front: "/doc-front.png",
        back: "/doc-back.png",
      },
      {
        id: 2,
        name: "Prinsha Shrestha",
        type: "Identity Document",
        time: "3h ago",
        icon: CreditCard,
      },
      {
        id: 3,
        name: "Prinsha Shrestha",
        type: "Motorcycle License",
        time: "6h ago",
        icon: Bike,
      },
    ],
    history: [],
  };

  const [data, setData] = useState(initialData);
  const [tab, setTab] = useState("pending");
  const [active, setActive] = useState(initialData.pending[0]);
  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");

  const isDecided =
    active?.status === "approved" || active?.status === "rejected";

  const list = tab === "pending" ? data.pending : data.history;

  const decide = (status) => {
    if (status === "rejected" && !reason.trim()) {
      alert("Rejection reason is required");
      return;
    }

<<<<<<< HEAD
    setReviews((prev) =>
      prev.map((r) =>
        r.id === activeId
          ? { ...r, status: decision === "approve" ? "approved" : "rejected" }
          : r,
      ),
    );
=======
    const updated = {
      ...active,
      status,
      time: "Just now",
    };
>>>>>>> 87f4838fb4e177dc5525e3a5b49d20efb68be9be

    setData((prev) => ({
      pending: prev.pending.filter((i) => i.id !== active.id),
      history: [updated, ...prev.history],
    }));

    setActive(updated);
    setReason("");
    setNotes("");
  };

  return (
    <div className="flex min-h-screen bg-[#F6FAFC]">
      <Sidebar />

      <main className="flex-1">
        <TopNavbar title="KYC & Documentation Verification Hub" />

        <div className="px-10 py-6 grid grid-cols-[320px_1fr] gap-8">
          {/* LEFT */}
          <div>
            <div className="mb-4 font-semibold">
              {tab === "pending" ? "Pending Review" : "Verification History"}
            </div>

            <div className="bg-white border rounded-lg overflow-hidden">
              {list.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      setActive(item);
                      setTab(item.status ? "history" : "pending");
                    }}
                    className={`flex justify-between items-center px-4 py-4 border-b cursor-pointer ${
                      active?.id === item.id
                        ? "bg-[#E8F4F7] border-l-4 border-[#008CA8]"
                        : ""
                    }`}
                  >
                    <div className="flex gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center font-semibold text-[#008CA8]">
                        PS
                      </div>
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-xs text-gray-400">
                          {item.type} · {item.time}
                        </div>
                      </div>
                    </div>

                    {item.status === "approved" && (
                      <CheckCircle className="text-green-500" />
                    )}
                    {item.status === "rejected" && (
                      <XCircle className="text-red-500" />
                    )}
                    {!item.status && Icon && <Icon />}
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-6">
            {/* TAB SWITCH */}
            <div className="flex justify-center">
              <div className="bg-white border rounded-lg p-1 flex w-80">
                <button
                  onClick={() => setTab("pending")}
                  className={`px-4 py-1 text-sm rounded ${
                    tab === "pending"
                      ? "bg-[#008CA8] text-white"
                      : "text-gray-400"
                  }`}
                >
                  Pending reviews
                </button>
                <button
                  onClick={() => setTab("history")}
                  className={`px-4 py-1 text-sm rounded ${
                    tab === "history"
                      ? "bg-[#008CA8] text-white"
                      : "text-gray-400"
                  }`}
                >
                  Verification History
                </button>
              </div>
            </div>

            {active && (
              <>
                {/* STATUS */}
                {isDecided && (
                  <div
                    className={`p-4 rounded-xl text-sm flex items-center gap-2 ${
                      active.status === "approved"
                        ? "bg-green-50 text-green-700"
                        : "bg-red-50 text-red-700"
                    }`}
                  >
                    {active.status === "approved" ? (
                      <CheckCircle size={18} />
                    ) : (
                      <XCircle size={18} />
                    )}
                    This document has been {active.status}.
                  </div>
                )}

                {/* USER CARD */}
                <div className="bg-white p-6 rounded-xl flex justify-between items-center">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center font-bold text-[#008CA8]">
                      PS
                    </div>
                    <div>
                      <div className="font-semibold">{active.name}</div>
                      <div className="text-sm text-gray-400">
                        {active.email || "—"}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-6 text-sm text-gray-500">
                    <div>📞 {active.phone || "—"}</div>
                    <div>📍 {active.location || "—"}</div>
                  </div>
                </div>

                {/* DOCUMENTS */}
                <div className="grid grid-cols-2 gap-6">
                  <Doc label="FRONT OF LICENSE" src={active.front} />
                  <Doc label="BACK OF LICENSE" src={active.back} alt />
                </div>

                {/* DETAILS + DECISION */}
                <div className="grid grid-cols-[1fr_320px] gap-6">
                  <div className="bg-white p-6 rounded-xl grid grid-cols-2 gap-4">
                    <Input label="Full Name" value={active.name} />
                    <Input
                      label="Citizenship Number"
                      value={active.citizenship || "—"}
                    />
                    <Input label="Date of Birth" value={active.dob || "—"} />
                    <Input label="Expiry Date" value={active.expiry || "—"} />
                  </div>

                  {/* FINAL DECISION */}
                  <div
                    className={`bg-white p-6 rounded-xl ${
                      isDecided ? "opacity-60 pointer-events-none" : ""
                    }`}
                  >
                    <h3 className="font-semibold mb-4">Final Decision</h3>

                    <Input
                      label="Rejection Reason"
                      value={reason}
                      onChange={setReason}
                      placeholder="Give a reason"
                      editable
                    />

                    <textarea
                      className="w-full mt-4 border rounded-lg p-3 text-sm"
                      rows={4}
                      placeholder="Enter review notes..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />

                    <div className="flex justify-end gap-3 mt-6">
                      <button
                        onClick={() => decide("rejected")}
                        className="border border-red-500 text-red-500 px-4 py-2 rounded-lg"
                      >
                        REJECT
                      </button>
                      <button
                        onClick={() => decide("approved")}
                        className="bg-[#008CA8] text-white px-4 py-2 rounded-lg"
                      >
                        APPROVE
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

/* ---------- Helpers ---------- */

function Input({ label, value, editable, onChange, placeholder }) {
  return (
    <div>
      <label className="text-xs text-gray-400">{label}</label>
      <input
        value={value}
        placeholder={placeholder}
        readOnly={!editable}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full mt-1 border rounded-lg px-3 py-2 text-sm"
      />
    </div>
  );
}

function Doc({ label, src, alt }) {
  return (
    <div>
      <p className="text-xs text-gray-400 mb-2">{label}</p>
      {src ? (
        <div className="h-40 rounded-xl overflow-hidden border">
          <img
            src={src}
            alt={label}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div
          className={`h-40 rounded-xl ${
            alt ? "bg-blue-200" : "bg-blue-100"
          }`}
        />
      )}
    </div>
  );
}
