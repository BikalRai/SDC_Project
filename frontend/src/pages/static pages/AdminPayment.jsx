import React, { useMemo, useState } from "react";
import { Bell, Search, Filter } from "lucide-react";
import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";

/* ================= PAYMENT DETAILS PAGE ================= */
export default function PaymentDetails() {
  const transactions = [
    {
      transactionId: "TXN-1001",
      date: "Jan 11, 2026, 8:30 AM",
      rawDate: "2026-01-11T08:30:00",
      customer: "John Doe",
      product: "Aprilia SR 125",
      amount: "Rs–1200",
      status: "Pending",
      paymentMethod: "Wallet",
      reference: "REF92312",
    },
    {
      transactionId: "TXN-1002",
      date: "Jan 09, 2026, 7:34 PM",
      rawDate: "2026-01-09T19:34:00",
      customer: "Piggie Kumar",
      product: "Working table",
      amount: "Rs–1500",
      status: "Completed",
      paymentMethod: "Card",
      reference: "REF76421",
    },
    {
      transactionId: "TXN-1003",
      date: "Jan 09, 2026, 6:55 PM",
      rawDate: "2026-01-09T18:55:00",
      customer: "Arham Urf",
      product: "Suzuki Celerio ZXI",
      amount: "Rs–2000",
      status: "Pending",
      paymentMethod: "Bank Transfer",
      reference: "REF55421",
    },
    {
      transactionId: "TXN-1004",
      date: "Jan 07, 2026, 10:30 AM",
      rawDate: "2026-01-07T10:30:00",
      customer: "Fhatima Dona",
      product: "Audi R8",
      amount: "Rs–1550",
      status: "Completed",
      paymentMethod: "Card",
      reference: "REF99812",
    },
    {
      transactionId: "TXN-1005",
      date: "Jan 07, 2026, 5:30 PM",
      rawDate: "2026-01-07T17:30:00",
      customer: "Chyangra Lal",
      product: "Office Chair",
      amount: "Rs–500",
      status: "Pending",
      paymentMethod: "Wallet",
      reference: "REF22811",
    },
    {
      transactionId: "TXN-1006",
      date: "Jan 06, 2026, 4:12 PM",
      rawDate: "2026-01-06T16:12:00",
      customer: "Suleman Pakya",
      product: "Suzuki Celerio ZXI",
      amount: "Rs–1200",
      status: "Completed",
      paymentMethod: "Bank Transfer",
      reference: "REF66331",
    },
    {
      transactionId: "TXN-1007",
      date: "Jan 05, 2026, 11:00 AM",
      rawDate: "2026-01-05T11:00:00",
      customer: "Alex Rana",
      product: "Mountain Bike",
      amount: "Rs–1800",
      status: "Completed",
      paymentMethod: "Card",
      reference: "REF77129",
    },
  ];

  /* ---------- HEADER DATE ---------- */
  const todayLabel = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  /* ---------- FILTER STATE ---------- */
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState({
    status: "All",
    date: "All",
    from: "",
    to: "",
  });

  /* ---------- PAGINATION ---------- */
  const ITEMS_PER_PAGE = 6;
  const [page, setPage] = useState(1);

  /* ---------- FILTER LOGIC ---------- */
  const filteredTransactions = useMemo(() => {
    const now = new Date();

    return transactions.filter((t) => {
      const txDate = new Date(t.rawDate);

      if (filters.status !== "All" && t.status !== filters.status) return false;

      if (filters.date === "Today") {
        return txDate.toDateString() === now.toDateString();
      }

      if (filters.date === "Last7Days") {
        const last7 = new Date();
        last7.setDate(now.getDate() - 7);
        return txDate >= last7;
      }

      if (filters.date === "Range" && filters.from && filters.to) {
        return (
          txDate >= new Date(filters.from) && txDate <= new Date(filters.to)
        );
      }

      return true;
    });
  }, [transactions, filters]);

  const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);
  const paginatedData = filteredTransactions.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  return (
    <div className="flex min-h-screen bg-[#F5F8FA]">
      <Sidebar />

      <main className="flex-1 px-10 py-6 space-y-8">
        {/* HEADER */}
        <TopNavbar
          title="Earning & Payment Details"
          onSearch={(value) => console.log("Searching:", value)}
          // avatarUrl="/user-avatar.png"
        />

        {/* TABLE */}
        <div className="bg-white rounded-xl border">
          <div className="flex justify-between items-center px-6 py-5 border-b relative">
            <div>
              <h3 className="font-semibold">Transaction History</h3>
              <p className="text-sm text-slate-400">
                Manage and track all customer payment
              </p>
            </div>

            <button
              onClick={() => setShowFilter((p) => !p)}
              className="flex items-center gap-2 text-sm text-slate-600 px-3 py-2 rounded-lg hover:bg-slate-100 cursor-pointer transition"
            >
              <Filter size={16} /> Filter
            </button>

            {showFilter && (
              <div className="absolute right-6 top-20 w-64 bg-white border rounded-xl shadow-lg p-4 space-y-3 z-20">
                <select
                  className="w-full border rounded-md px-3 py-2 text-sm"
                  onChange={(e) =>
                    setFilters({ ...filters, status: e.target.value })
                  }
                >
                  <option value="All">All Status</option>
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                </select>

                <select
                  className="w-full border rounded-md px-3 py-2 text-sm"
                  onChange={(e) =>
                    setFilters({ ...filters, date: e.target.value })
                  }
                >
                  <option value="All">All Dates</option>
                  <option value="Today">Today</option>
                  <option value="Last7Days">Last 7 Days</option>
                  <option value="Range">Custom Range</option>
                </select>

                {filters.date === "Range" && (
                  <div className="space-y-2">
                    <input
                      type="date"
                      className="w-full border rounded-md px-3 py-2 text-sm"
                      onChange={(e) =>
                        setFilters({ ...filters, from: e.target.value })
                      }
                    />
                    <input
                      type="date"
                      className="w-full border rounded-md px-3 py-2 text-sm"
                      onChange={(e) =>
                        setFilters({ ...filters, to: e.target.value })
                      }
                    />
                  </div>
                )}

                <button
                  onClick={() =>
                    setFilters({ status: "All", date: "All", from: "", to: "" })
                  }
                  className="text-xs text-[#0093B8]"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>

          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="py-4 px-4 text-left">TRANSACTION DATE</th>
                <th className="text-left px-4">CUSTOMER</th>
                <th className="text-left px-4">PRODUCT</th>
                <th className="text-left px-4">AMOUNT</th>
                <th className="text-left px-6">STATUS</th>
                <th className="text-left px-4">ACTION</th>
              </tr>
            </thead>

            <tbody>
              {paginatedData.map((t) => (
                <tr key={t.transactionId} className="border-t">
                  <td className="py-4 px-4">{t.date}</td>
                  <td className="px-4">👤 {t.customer}</td>
                  <td className="px-4">{t.product}</td>
                  <td className="px-4 font-semibold">{t.amount}</td>
                  <td className="px-6">
                    <span
                      className={`px-4 py-1 rounded-full text-xs ${
                        t.status === "Completed"
                          ? "bg-green-100 text-green-600"
                          : "bg-orange-100 text-orange-500"
                      }`}
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

          {/* PAGINATION FOOTER */}
          <div className="flex justify-between items-center px-6 py-4 text-sm text-slate-400">
            <span>
              Showing {(page - 1) * ITEMS_PER_PAGE + 1}–
              {Math.min(page * ITEMS_PER_PAGE, filteredTransactions.length)} of{" "}
              {filteredTransactions.length}
            </span>

            <div className="flex gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="border px-3 py-1 rounded disabled:opacity-40"
              >
                ‹
              </button>
              <button className="bg-[#0093B8] text-white px-3 py-1 rounded">
                {page}
              </button>
              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="border px-3 py-1 rounded disabled:opacity-40"
              >
                ›
              </button>
            </div>
          </div>
        </div>

        {/* INFO CARDS — RESTORED */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border p-6">
            <h4 className="font-semibold mb-2">Payment Resolution</h4>
            <p className="text-sm text-slate-400 mb-2">
              Stuck with a transaction? Visit our resolution center to handle
              payment disputes.
            </p>
            <a className="text-sm text-[#0093B8] cursor-pointer">
              Go to resolution center
            </a>
          </div>

          <div className="bg-white rounded-xl border p-6">
            <h4 className="font-semibold mb-2">Monthly Reports</h4>
            <p className="text-sm text-slate-400 mb-2">
              Download your full financial statement and tax documents for the
              past month.
            </p>
            <a className="text-sm text-[#0093B8] cursor-pointer">
              Download Statement
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
