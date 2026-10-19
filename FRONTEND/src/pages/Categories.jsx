import React, { useState, useMemo } from "react";
import { FiSearch, FiPlus, FiEdit2, FiTrash2, FiImage, FiX } from "react-icons/fi";

const initialCategories = [
  { id: 1, name: "Electronics", products: 124, status: "Active", image: "" },
  { id: 2, name: "Fashion", products: 86, status: "Active", image: "" },
  { id: 3, name: "Home & Kitchen", products: 52, status: "Active", image: "" },
  { id: 4, name: "Beauty", products: 31, status: "Inactive", image: "" },
];

const emptyForm = { name: "", status: "Active", image: "" };

const Categories = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  const filtered = useMemo(
    () =>
      categories.filter((c) =>
        c.name.toLowerCase().includes(search.trim().toLowerCase())
      ),
    [categories, search]
  );

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setError("");
  };

  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setForm((f) => ({ ...f, image: URL.createObjectURL(file) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setError("Category name is required");
      return;
    }

    if (editingId) {
      setCategories((list) =>
        list.map((c) => (c.id === editingId ? { ...c, ...form } : c))
      );
    } else {
      setCategories((list) => [
        { id: Date.now(), products: 0, ...form },
        ...list,
      ]);
    }
    resetForm();
  };

  const handleEdit = (cat) => {
    setEditingId(cat.id);
    setForm({ name: cat.name, status: cat.status, image: cat.image });
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this category?")) {
      setCategories((list) => list.filter((c) => c.id !== id));
      if (editingId === id) resetForm();
    }
  };

  return (
    <div className="space-y-5 p-5">
      {/* Create / Edit form */}
      <form
        onSubmit={handleSubmit}
        className="rounded-lg bg-white p-7 shadow-sm"
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-3xl font-semibold text-gray-900">
            {editingId ? "Edit Category" : "Create Category"}
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

        <div className="grid gap-5 md:grid-cols-[1fr_220px_220px]">
          <div>
            <label className="mb-1 block text-sm text-gray-600">Category name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. Electronics"
              className="w-full rounded-md border border-gray-200 px-3 py-3 text-sm outline-none focus:border-[#4C9A5F]"
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}

            <label className="mb-1 mt-4 block text-sm text-gray-600">Status</label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="w-full rounded-md border border-gray-200 px-3 py-3 text-sm outline-none focus:border-[#4C9A5F]"
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="mb-1 block text-sm text-gray-600">Category image</label>
            <label className="flex h-36 cursor-pointer items-center justify-center overflow-hidden rounded-md border border-dashed border-gray-300 text-gray-500 hover:border-[#4C9A5F]">
              {form.image ? (
                <img src={form.image} alt="Preview" className="h-full w-full object-cover" />
              ) : (
                <span className="flex flex-col items-center gap-2 text-sm">
                  <FiImage size={26} />
                  Click to upload
                </span>
              )}
              <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
            </label>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 rounded-md bg-[#4C9A5F] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#3f8450]"
          >
            {editingId ? <FiEdit2 size={16} /> : <FiPlus size={18} />}
            {editingId ? "Save changes" : "Create category"}
          </button>
        </div>
      </form>

      {/* Category list */}
      <div className="rounded-lg bg-white p-7 shadow-sm">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-3xl font-semibold text-gray-900">All Categories</h2>

          <div className="flex items-center rounded-md border border-gray-200 px-3 py-2.5">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search category"
              className="w-56 bg-transparent text-sm outline-none placeholder:text-gray-400"
            />
            <FiSearch size={18} className="text-gray-500" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-center">
            <thead>
              <tr className="bg-gray-50 text-gray-900">
                <th className="rounded-l-md py-4 font-semibold">No</th>
                <th className="py-4 text-left font-semibold">Category</th>
                <th className="py-4 font-semibold">Products</th>
                <th className="py-4 font-semibold">Status</th>
                <th className="rounded-r-md py-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((cat, index) => (
                <tr key={cat.id} className="border-b border-gray-100 last:border-0">
                  <td className="py-4 text-gray-800">{index + 1}.</td>
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      {cat.image ? (
                        <img
                          src={cat.image}
                          alt={cat.name}
                          className="h-11 w-11 rounded-md object-cover"
                        />
                      ) : (
                        <div className="flex h-11 w-11 items-center justify-center rounded-md bg-green-50 font-semibold text-[#4C9A5F]">
                          {cat.name.charAt(0)}
                        </div>
                      )}
                      <span className="font-medium text-gray-900">{cat.name}</span>
                    </div>
                  </td>
                  <td className="py-4 text-gray-800">{cat.products}</td>
                  <td className="py-4">
                    <span
                      className={`inline-flex items-center gap-2 font-medium ${
                        cat.status === "Active" ? "text-emerald-500" : "text-gray-400"
                      }`}
                    >
                      <span
                        className={`h-3 w-3 rounded-full ${
                          cat.status === "Active" ? "bg-emerald-500" : "bg-gray-300"
                        }`}
                      />
                      {cat.status}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleEdit(cat)}
                        className="rounded-md p-2 text-gray-600 transition hover:bg-green-50 hover:text-[#4C9A5F]"
                        aria-label={`Edit ${cat.name}`}
                      >
                        <FiEdit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(cat.id)}
                        className="rounded-md p-2 text-gray-600 transition hover:bg-red-50 hover:text-red-500"
                        aria-label={`Delete ${cat.name}`}
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <p className="py-12 text-center text-gray-500">
              No categories found. Try a different search or create a new category above.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Categories;
