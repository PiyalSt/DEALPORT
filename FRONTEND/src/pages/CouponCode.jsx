import React, { useState, useMemo } from "react";
import {
  FiSearch,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiCopy,
  FiCheck,
  FiX,
  FiRefreshCw,
} from "react-icons/fi";

const initialCoupons = [
  {
    id: 1,
    code: "WELCOME10",
    type: "percentage",
    value: 10,
    minOrder: 500,
    usageLimit: 100,
    used: 42,
    expiry: "2026-12-31",
    active: true,
  },
  {
    id: 2,
    code: "FLAT200",
    type: "fixed",
    value: 200,
    minOrder: 1500,
    usageLimit: 50,
    used: 50,
    expiry: "2026-11-30",
    active: true,
  },
  {
    id: 3,
    code: "EID25",
    type: "percentage",
    value: 25,
    minOrder: 1000,
    usageLimit: 200,
    used: 120,
    expiry: "2026-06-30",
    active: true,
  },
  {
    id: 4,
    code: "SUMMER5",
    type: "percentage",
    value: 5,
    minOrder: 0,
    usageLimit: 500,
    used: 12,
    expiry: "2027-03-31",
    active: false,
  },
];

const emptyForm = {
  code: "",
  type: "percentage",
  value: "",
  minOrder: "",
  usageLimit: "",
  expiry: "",
  active: true,
};

// Active / Inactive / Expired / Used up
const getStatus = (c) => {
  const today = new Date().toISOString().slice(0, 10);
  if (!c.active) return "Inactive";
  if (c.expiry && c.expiry < today) return "Expired";
  if (c.usageLimit && c.used >= c.usageLimit) return "Used up";
  return "Active";
};

const statusStyle = {
  Active: { text: "text-emerald-500", dot: "bg-emerald-500" },
  Inactive: { text: "text-gray-400", dot: "bg-gray-300" },
  Expired: { text: "text-red-500", dot: "bg-red-500" },
  "Used up": { text: "text-amber-500", dot: "bg-amber-500" },
};

const generateCode = () => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < 8; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
};

const formatDate = (d) =>
  d
    ? new Date(d).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "No expiry";

const inputClass =
  "w-full rounded-md border border-gray-200 px-3 py-3 text-sm outline-none focus:border-[#4C9A5F]";

const CouponCode = () => {
  const [coupons, setCoupons] = useState(initialCoupons);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [errors, setErrors] = useState({});
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [copiedId, setCopiedId] = useState(null);

  const filtered = useMemo(
    () =>
      coupons.filter((c) => {
        const matchSearch = c.code.toLowerCase().includes(search.trim().toLowerCase());
        const matchStatus = statusFilter === "All" || getStatus(c) === statusFilter;
        return matchSearch && matchStatus;
      }),
    [coupons, search, statusFilter]
  );

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setErrors({});
  };

  const validate = () => {
    const e = {};
    const code = form.code.trim().toUpperCase();
    if (!code) e.code = "Coupon code is required";
    else if (coupons.some((c) => c.code === code && c.id !== editingId))
      e.code = "This code already exists";
    if (!form.value || Number(form.value) <= 0) e.value = "Enter a discount value";
    else if (form.type === "percentage" && Number(form.value) > 100)
      e.value = "Percentage cannot be more than 100";
    return e;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;

    const data = {
      ...form,
      code: form.code.trim().toUpperCase(),
      value: Number(form.value),
      minOrder: Number(form.minOrder) || 0,
      usageLimit: Number(form.usageLimit) || 0,
    };

    if (editingId) {
      setCoupons((list) => list.map((c) => (c.id === editingId ? { ...c, ...data } : c)));
    } else {
      setCoupons((list) => [{ id: Date.now(), used: 0, ...data }, ...list]);
    }
    resetForm();
  };

  const handleEdit = (c) => {
    setEditingId(c.id);
    setForm({
      code: c.code,
      type: c.type,
      value: c.value,
      minOrder: c.minOrder || "",
      usageLimit: c.usageLimit || "",
      expiry: c.expiry || "",
      active: c.active,
    });
    setErrors({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this coupon?")) {
      setCoupons((list) => list.filter((c) => c.id !== id));
      if (editingId === id) resetForm();
    }
  };

  const toggleActive = (id) =>
    setCoupons((list) => list.map((c) => (c.id === id ? { ...c, active: !c.active } : c)));

  const handleCopy = async (c) => {
    try {
      await navigator.clipboard.writeText(c.code);
      setCopiedId(c.id);
      setTimeout(() => setCopiedId(null), 1500);
    } catch {
      /* clipboard may be blocked; ignore */
    }
  };

  const discountLabel = (c) => (c.type === "percentage" ? `${c.value}%` : `৳${c.value}`);

  return (
    <div className="space-y-5 p-5">
      {/* Create / Edit form */}
      <form onSubmit={handleSubmit} className="rounded-lg bg-white p-7 shadow-sm">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-3xl font-semibold text-gray-900">
            {editingId ? "Edit Coupon" : "Create Coupon"}
          </h2>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="flex items-center gap-1 rounded-md border border-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              <FiX size={16} />
              Cancel edit
            </button>
          )}
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {/* Code */}
          <div>
            <label className="mb-1 block text-sm text-gray-600">Coupon code</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={form.code}
                onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
                placeholder="e.g. WELCOME10"
                className={`${inputClass} uppercase`}
              />
              <button
                type="button"
                onClick={() => setForm({ ...form, code: generateCode() })}
                title="Generate code"
                aria-label="Generate code"
                className="rounded-md border border-gray-200 px-3 text-gray-600 hover:border-[#4C9A5F] hover:text-[#4C9A5F]"
              >
                <FiRefreshCw size={18} />
              </button>
            </div>
            {errors.code && <p className="mt-1 text-sm text-red-500">{errors.code}</p>}
          </div>

          {/* Type */}
          <div>
            <label className="mb-1 block text-sm text-gray-600">Discount type</label>
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className={inputClass}
            >
              <option value="percentage">Percentage (%)</option>
              <option value="fixed">Fixed amount (৳)</option>
            </select>
          </div>

          {/* Value */}
          <div>
            <label className="mb-1 block text-sm text-gray-600">
              Discount value {form.type === "percentage" ? "(%)" : "(৳)"}
            </label>
            <input
              type="number"
              min="0"
              value={form.value}
              onChange={(e) => setForm({ ...form, value: e.target.value })}
              placeholder={form.type === "percentage" ? "10" : "200"}
              className={inputClass}
            />
            {errors.value && <p className="mt-1 text-sm text-red-500">{errors.value}</p>}
          </div>

          {/* Min order */}
          <div>
            <label className="mb-1 block text-sm text-gray-600">Minimum order (৳)</label>
            <input
              type="number"
              min="0"
              value={form.minOrder}
              onChange={(e) => setForm({ ...form, minOrder: e.target.value })}
              placeholder="0 = no minimum"
              className={inputClass}
            />
          </div>

          {/* Usage limit */}
          <div>
            <label className="mb-1 block text-sm text-gray-600">Usage limit</label>
            <input
              type="number"
              min="0"
              value={form.usageLimit}
              onChange={(e) => setForm({ ...form, usageLimit: e.target.value })}
              placeholder="0 = unlimited"
              className={inputClass}
            />
          </div>

          {/* Expiry */}
          <div>
            <label className="mb-1 block text-sm text-gray-600">Expiry date</label>
            <input
              type="date"
              value={form.expiry}
              onChange={(e) => setForm({ ...form, expiry: e.target.value })}
              className={inputClass}
            />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <label className="flex cursor-pointer items-center gap-3 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={form.active}
              onChange={(e) => setForm({ ...form, active: e.target.checked })}
              className="h-4 w-4 accent-[#4C9A5F]"
            />
            Coupon is active
          </label>

          <button
            type="submit"
            className="flex items-center gap-2 rounded-md bg-[#4C9A5F] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#3f8450]"
          >
            {editingId ? <FiEdit2 size={16} /> : <FiPlus size={18} />}
            {editingId ? "Save changes" : "Create coupon"}
          </button>
        </div>
      </form>

      {/* Coupon list */}
      <div className="rounded-lg bg-white p-7 shadow-sm">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-3xl font-semibold text-gray-900">All Coupons</h2>

          <div className="flex flex-wrap items-center gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-md border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#4C9A5F]"
            >
              <option>All</option>
              <option>Active</option>
              <option>Inactive</option>
              <option>Expired</option>
              <option>Used up</option>
            </select>

            <div className="flex items-center rounded-md border border-gray-200 px-3 py-2.5">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search coupon code"
                className="w-52 bg-transparent text-sm outline-none placeholder:text-gray-400"
              />
              <FiSearch size={18} className="text-gray-500" />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-center">
            <thead>
              <tr className="bg-gray-50 text-gray-900">
                <th className="rounded-l-md py-4 font-semibold">No</th>
                <th className="py-4 text-left font-semibold">Code</th>
                <th className="py-4 font-semibold">Discount</th>
                <th className="py-4 font-semibold">Min order</th>
                <th className="py-4 font-semibold">Used</th>
                <th className="py-4 font-semibold">Expiry</th>
                <th className="py-4 font-semibold">Status</th>
                <th className="rounded-r-md py-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c, index) => {
                const status = getStatus(c);
                const style = statusStyle[status];
                return (
                  <tr key={c.id} className="border-b border-gray-100 last:border-0">
                    <td className="py-4 text-gray-800">{index + 1}.</td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <span className="rounded-md bg-green-50 px-3 py-1.5 font-semibold tracking-wide text-[#4C9A5F]">
                          {c.code}
                        </span>
                        <button
                          onClick={() => handleCopy(c)}
                          className="rounded-md p-1.5 text-gray-500 hover:bg-gray-100"
                          aria-label={`Copy ${c.code}`}
                        >
                          {copiedId === c.id ? (
                            <FiCheck size={16} className="text-emerald-500" />
                          ) : (
                            <FiCopy size={16} />
                          )}
                        </button>
                      </div>
                    </td>
                    <td className="py-4 font-medium text-gray-900">{discountLabel(c)}</td>
                    <td className="py-4 text-gray-800">
                      {c.minOrder ? `৳${c.minOrder}` : "—"}
                    </td>
                    <td className="py-4 text-gray-800">
                      {c.used}
                      {c.usageLimit ? ` / ${c.usageLimit}` : ""}
                    </td>
                    <td className="py-4 text-gray-800">{formatDate(c.expiry)}</td>
                    <td className="py-4">
                      <span className={`inline-flex items-center gap-2 font-medium ${style.text}`}>
                        <span className={`h-3 w-3 rounded-full ${style.dot}`} />
                        {status}
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => toggleActive(c.id)}
                          role="switch"
                          aria-checked={c.active}
                          aria-label={`Toggle ${c.code}`}
                          className={`relative mr-2 h-6 w-11 rounded-full transition ${
                            c.active ? "bg-[#4C9A5F]" : "bg-gray-300"
                          }`}
                        >
                          <span
                            className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all ${
                              c.active ? "left-[22px]" : "left-0.5"
                            }`}
                          />
                        </button>
                        <button
                          onClick={() => handleEdit(c)}
                          className="rounded-md p-2 text-gray-600 transition hover:bg-green-50 hover:text-[#4C9A5F]"
                          aria-label={`Edit ${c.code}`}
                        >
                          <FiEdit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(c.id)}
                          className="rounded-md p-2 text-gray-600 transition hover:bg-red-50 hover:text-red-500"
                          aria-label={`Delete ${c.code}`}
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <p className="py-12 text-center text-gray-500">
              No coupons found. Change the filter or create a new coupon above.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CouponCode;
