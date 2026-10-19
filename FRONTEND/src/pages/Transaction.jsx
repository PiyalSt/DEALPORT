import React, { useState, useMemo, useEffect } from "react";
import {
  FiSearch,
  FiFilter,
  FiDownload,
  FiChevronLeft,
  FiChevronRight,
  FiX,
  FiEye,
} from "react-icons/fi";

// Replace with data fetched from your API
const transactions = [
  { id: "T-1001", customerId: "#5563", name: "Rahim Uddin", date: "2026-10-01T11:29:00", method: "bKash", status: "Paid", amount: 40000 },
  { id: "T-1002", customerId: "#5571", name: "Nusrat Jahan", date: "2026-10-02T15:10:00", method: "Card", status: "Paid", amount: 12500 },
  { id: "T-1003", customerId: "#5580", name: "Karim Hossain", date: "2026-10-03T09:45:00", method: "Nagad", status: "Pending", amount: 8200 },
  { id: "T-1004", customerId: "#5594", name: "Sadia Akter", date: "2026-10-04T18:22:00", method: "Cash on delivery", status: "Pending", amount: 3600 },
  { id: "T-1005", customerId: "#5602", name: "Tanvir Ahmed", date: "2026-10-05T13:05:00", method: "Card", status: "Failed", amount: 22000 },
  { id: "T-1006", customerId: "#5610", name: "Mim Chowdhury", date: "2026-10-06T10:30:00", method: "bKash", status: "Paid", amount: 5400 },
  { id: "T-1007", customerId: "#5623", name: "Jahid Hasan", date: "2026-10-07T17:40:00", method: "Nagad", status: "Refunded", amount: 9800 },
  { id: "T-1008", customerId: "#5631", name: "Farhana Islam", date: "2026-10-08T12:15:00", method: "Card", status: "Paid", amount: 31000 },
  { id: "T-1009", customerId: "#5645", name: "Imran Khan", date: "2026-10-09T08:50:00", method: "bKash", status: "Paid", amount: 1750 },
  { id: "T-1010", customerId: "#5652", name: "Rima Begum", date: "2026-10-10T19:05:00", method: "Cash on delivery", status: "Paid", amount: 6900 },
  { id: "T-1011", customerId: "#5667", name: "Sabbir Rahman", date: "2026-10-12T14:20:00", method: "Card", status: "Pending", amount: 15400 },
  { id: "T-1012", customerId: "#5678", name: "Lamia Sultana", date: "2026-10-14T11:00:00", method: "Nagad", status: "Failed", amount: 2300 },
  { id: "T-1013", customerId: "#5689", name: "Arif Mahmud", date: "2026-10-15T16:35:00", method: "bKash", status: "Paid", amount: 27500 },
  { id: "T-1014", customerId: "#5694", name: "Tasnim Rahman", date: "2026-10-17T10:10:00", method: "Card", status: "Paid", amount: 8800 },
  { id: "T-1015", customerId: "#5701", name: "Masud Parvez", date: "2026-10-18T20:45:00", method: "Cash on delivery", status: "Pending", amount: 4100 },
];

const PAGE_SIZE = 8;

const statusStyle = {
  Paid: { text: "text-emerald-500", dot: "bg-emerald-500" },
  Pending: { text: "text-amber-500", dot: "bg-amber-500" },
  Failed: { text: "text-red-500", dot: "bg-red-500" },
  Refunded: { text: "text-sky-500", dot: "bg-sky-500" },
};

const formatDate = (iso) => {
  const d = new Date(iso);
  const day = d.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
  const time = d
    .toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })
    .toLowerCase();
  return `${day} | ${time}`;
};

const money = (n) => `৳${n.toLocaleString("en-US")}`;

const inputClass =
  "w-full rounded-md border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#4C9A5F]";

const Transaction = () => {
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [status, setStatus] = useState("All");
  const [method, setMethod] = useState("All");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const list = transactions.filter((t) => {
      const matchSearch =
        !q ||
        t.customerId.toLowerCase().includes(q) ||
        t.name.toLowerCase().includes(q) ||
        t.id.toLowerCase().includes(q);
      const matchStatus = status === "All" || t.status === status;
      const matchMethod = method === "All" || t.method === method;
      const day = t.date.slice(0, 10);
      const matchFrom = !from || day >= from;
      const matchTo = !to || day <= to;
      return matchSearch && matchStatus && matchMethod && matchFrom && matchTo;
    });

    const sorters = {
      newest: (a, b) => new Date(b.date) - new Date(a.date),
      oldest: (a, b) => new Date(a.date) - new Date(b.date),
      high: (a, b) => b.amount - a.amount,
      low: (a, b) => a.amount - b.amount,
    };
    return [...list].sort(sorters[sort]);
  }, [search, status, method, from, to, sort]);

  // Back to page 1 whenever filters change
  useEffect(() => setPage(1), [search, status, method, from, to, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const summary = useMemo(() => {
    const sum = (s) =>
      filtered.filter((t) => t.status === s).reduce((acc, t) => acc + t.amount, 0);
    return {
      paid: sum("Paid"),
      pending: sum("Pending"),
      failed: sum("Failed") + sum("Refunded"),
    };
  }, [filtered]);

  const hasFilters = status !== "All" || method !== "All" || from || to;

  const clearFilters = () => {
    setStatus("All");
    setMethod("All");
    setFrom("");
    setTo("");
  };

  const exportCsv = () => {
    const header = ["Transaction ID", "Customer ID", "Customer", "Date", "Method", "Status", "Amount"];
    const rows = filtered.map((t) => [
      t.id,
      t.customerId,
      t.name,
      new Date(t.date).toLocaleString("en-GB"),
      t.method,
      t.status,
      t.amount,
    ]);
    const csv = [header, ...rows]
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-5 p-5">
      {/* Summary */}
      <div className="grid gap-5 md:grid-cols-3">
        {[
          { label: "Received", value: summary.paid, color: "text-emerald-500" },
          { label: "Pending", value: summary.pending, color: "text-amber-500" },
          { label: "Failed and refunded", value: summary.failed, color: "text-red-500" },
        ].map((card) => (
          <div key={card.label} className="rounded-lg bg-white p-6 shadow-sm">
            <p className="text-gray-500">{card.label}</p>
            <p className={`mt-2 text-3xl font-semibold ${card.color}`}>{money(card.value)}</p>
          </div>
        ))}
      </div>

      {/* Table card */}
      <div className="rounded-lg bg-white p-7 shadow-sm">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-3xl font-semibold text-gray-900">Transaction</h2>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center rounded-md border border-gray-200 px-3 py-2.5">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search customer or ID"
                className="w-52 bg-transparent text-sm outline-none placeholder:text-gray-400"
              />
              <FiSearch size={18} className="text-gray-500" />
            </div>

            <button
              onClick={exportCsv}
              className="flex items-center gap-2 rounded-md border border-gray-200 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
            >
              <FiDownload size={16} />
              Export
            </button>

            <button
              onClick={() => setShowFilter((s) => !s)}
              className="flex items-center gap-3 rounded-md bg-[#4C9A5F] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#3f8450]"
            >
              Filter
              <FiFilter size={16} />
            </button>
          </div>
        </div>

        {/* Filter panel */}
        {showFilter && (
          <div className="mb-6 rounded-md border border-gray-100 bg-gray-50 p-5">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
              <div>
                <label className="mb-1 block text-sm text-gray-600">Status</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)} className={inputClass}>
                  <option>All</option>
                  <option>Paid</option>
                  <option>Pending</option>
                  <option>Failed</option>
                  <option>Refunded</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm text-gray-600">Payment method</label>
                <select value={method} onChange={(e) => setMethod(e.target.value)} className={inputClass}>
                  <option>All</option>
                  <option>bKash</option>
                  <option>Nagad</option>
                  <option>Card</option>
                  <option>Cash on delivery</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm text-gray-600">From</label>
                <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className="mb-1 block text-sm text-gray-600">To</label>
                <input type="date" value={to} onChange={(e) => setTo(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className="mb-1 block text-sm text-gray-600">Sort by</label>
                <select value={sort} onChange={(e) => setSort(e.target.value)} className={inputClass}>
                  <option value="newest">Newest first</option>
                  <option value="oldest">Oldest first</option>
                  <option value="high">Amount: high to low</option>
                  <option value="low">Amount: low to high</option>
                </select>
              </div>
            </div>

            {hasFilters && (
              <button
                onClick={clearFilters}
                className="mt-4 flex items-center gap-1 text-sm text-gray-600 hover:text-red-500"
              >
                <FiX size={16} />
                Clear filters
              </button>
            )}
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-center">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-gray-900">
                <th className="rounded-l-md py-4 font-semibold">No</th>
                <th className="py-4 font-semibold">Id Customer</th>
                <th className="py-4 font-semibold">Order Date</th>
                <th className="py-4 font-semibold">Method</th>
                <th className="py-4 font-semibold">Status</th>
                <th className="py-4 font-semibold">Amount</th>
                <th className="rounded-r-md py-4 font-semibold">Details</th>
              </tr>
            </thead>
            <tbody>
              {pageItems.map((t, i) => {
                const s = statusStyle[t.status];
                return (
                  <tr key={t.id} className="border-b border-gray-100 text-gray-800 last:border-0 hover:bg-gray-50/70">
                    <td className="py-4">{(page - 1) * PAGE_SIZE + i + 1}.</td>
                    <td className="py-4">{t.customerId}</td>
                    <td className="py-4">{formatDate(t.date)}</td>
                    <td className="py-4">{t.method}</td>
                    <td className="py-4">
                      <span className={`inline-flex items-center gap-2 font-medium ${s.text}`}>
                        <span className={`h-3 w-3 rounded-full ${s.dot}`} />
                        {t.status}
                      </span>
                    </td>
                    <td className="py-4 font-medium">{money(t.amount)}</td>
                    <td className="py-4">
                      <button
                        onClick={() => setSelected(t)}
                        className="rounded-md p-2 text-gray-600 transition hover:bg-green-50 hover:text-[#4C9A5F]"
                        aria-label={`View ${t.id}`}
                      >
                        <FiEye size={18} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <p className="py-12 text-center text-gray-500">
              No transactions match your search or filters.
            </p>
          )}
        </div>

        {/* Pagination */}
        {filtered.length > 0 && (
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm text-gray-600">
            <p>
              Showing {(page - 1) * PAGE_SIZE + 1} to{" "}
              {Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} transactions
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                aria-label="Previous page"
                className="rounded-md p-2 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <FiChevronLeft size={18} />
              </button>
              {Array.from({ length: totalPages }, (_, n) => n + 1).map((n) => (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className={`h-9 w-9 rounded-md ${
                    n === page ? "bg-[#4C9A5F] font-medium text-white" : "hover:bg-gray-100"
                  }`}
                >
                  {n}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                aria-label="Next page"
                className="rounded-md p-2 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <FiChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Details modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900">Transaction details</h3>
              <button
                onClick={() => setSelected(null)}
                className="rounded-md p-1 text-gray-500 hover:bg-gray-100"
                aria-label="Close"
              >
                <FiX size={20} />
              </button>
            </div>

            <dl className="divide-y divide-gray-100 text-sm">
              {[
                ["Transaction ID", selected.id],
                ["Customer", selected.name],
                ["Customer ID", selected.customerId],
                ["Date", formatDate(selected.date)],
                ["Payment method", selected.method],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between py-3">
                  <dt className="text-gray-500">{label}</dt>
                  <dd className="font-medium text-gray-900">{value}</dd>
                </div>
              ))}
              <div className="flex justify-between py-3">
                <dt className="text-gray-500">Status</dt>
                <dd className={`inline-flex items-center gap-2 font-medium ${statusStyle[selected.status].text}`}>
                  <span className={`h-3 w-3 rounded-full ${statusStyle[selected.status].dot}`} />
                  {selected.status}
                </dd>
              </div>
              <div className="flex justify-between py-3">
                <dt className="text-gray-500">Amount</dt>
                <dd className="text-lg font-semibold text-gray-900">{money(selected.amount)}</dd>
              </div>
            </dl>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transaction;
