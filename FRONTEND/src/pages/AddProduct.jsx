import React, { useState, useEffect } from "react";
import { FiImage, FiX, FiPlus, FiCheck } from "react-icons/fi";

// Replace this with categories fetched from your API
const categoryOptions = [
  "Electronics",
  "Fashion",
  "Home & Kitchen",
  "Beauty",
  "Groceries",
];

const MAX_IMAGES = 5;

const emptyForm = {
  name: "",
  category: "",
  brand: "",
  sku: "",
  description: "",
  price: "",
  discountPrice: "",
  stock: "",
  unit: "pcs",
  status: "Active",
  featured: false,
};

const inputClass =
  "w-full rounded-md border border-gray-200 px-3 py-3 text-sm outline-none focus:border-[#4C9A5F]";

const Field = ({ label, error, children }) => (
  <div>
    <label className="mb-1 block text-sm text-gray-600">{label}</label>
    {children}
    {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
  </div>
);

const AddProducts = () => {
  const [form, setForm] = useState(emptyForm);
  const [images, setImages] = useState([]); // { file, preview }
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);

  // Free the preview URLs when the page closes
  useEffect(() => {
    return () => images.forEach((img) => URL.revokeObjectURL(img.preview));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setField = (name, value) => setForm((f) => ({ ...f, [name]: value }));

  const handleImages = (e) => {
    const files = Array.from(e.target.files || []);
    const room = MAX_IMAGES - images.length;
    const next = files.slice(0, room).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((list) => [...list, ...next]);
    if (files.length > room) {
      setErrors((er) => ({ ...er, images: `You can upload up to ${MAX_IMAGES} images` }));
    } else {
      setErrors((er) => ({ ...er, images: undefined }));
    }
    e.target.value = "";
  };

  const removeImage = (index) => {
    setImages((list) => {
      URL.revokeObjectURL(list[index].preview);
      return list.filter((_, i) => i !== index);
    });
  };

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !tags.includes(t)) setTags((list) => [...list, t]);
    setTagInput("");
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Product name is required";
    if (!form.category) e.category = "Choose a category";
    if (!form.price || Number(form.price) <= 0) e.price = "Enter a valid price";
    if (
      form.discountPrice &&
      Number(form.discountPrice) >= Number(form.price || 0)
    )
      e.discountPrice = "Discount price must be lower than the price";
    if (form.stock === "" || Number(form.stock) < 0) e.stock = "Enter stock quantity";
    if (images.length === 0) e.images = "Add at least one product image";
    return e;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;

    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => data.append(key, value));
    data.append("tags", JSON.stringify(tags));
    images.forEach((img) => data.append("images", img.file));

    // TODO: send to your backend, e.g.
    // await axios.post("http://localhost:5000/api/products", data);
    console.log("Product ready to send:", Object.fromEntries(data.entries()));

    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
    handleReset();
  };

  const handleReset = () => {
    images.forEach((img) => URL.revokeObjectURL(img.preview));
    setForm(emptyForm);
    setImages([]);
    setTags([]);
    setTagInput("");
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 p-5">
      {saved && (
        <div className="flex items-center gap-2 rounded-md bg-green-50 px-4 py-3 text-sm font-medium text-[#4C9A5F]">
          <FiCheck size={18} />
          Product added successfully
        </div>
      )}

      {/* Basic information */}
      <section className="rounded-lg bg-white p-7 shadow-sm">
        <h2 className="mb-5 text-3xl font-semibold text-gray-900">Add Product</h2>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <Field label="Product name" error={errors.name}>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setField("name", e.target.value)}
                placeholder="e.g. Wireless Headphones"
                className={inputClass}
              />
            </Field>
          </div>

          <Field label="Category" error={errors.category}>
            <select
              value={form.category}
              onChange={(e) => setField("category", e.target.value)}
              className={inputClass}
            >
              <option value="">Select category</option>
              {categoryOptions.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Brand">
            <input
              type="text"
              value={form.brand}
              onChange={(e) => setField("brand", e.target.value)}
              placeholder="e.g. Sony"
              className={inputClass}
            />
          </Field>

          <Field label="SKU">
            <input
              type="text"
              value={form.sku}
              onChange={(e) => setField("sku", e.target.value.toUpperCase())}
              placeholder="e.g. WH-1000"
              className={`${inputClass} uppercase`}
            />
          </Field>

          <Field label="Status">
            <select
              value={form.status}
              onChange={(e) => setField("status", e.target.value)}
              className={inputClass}
            >
              <option>Active</option>
              <option>Draft</option>
              <option>Out of stock</option>
            </select>
          </Field>

          <div className="md:col-span-2">
            <Field label="Description">
              <textarea
                rows={5}
                value={form.description}
                onChange={(e) => setField("description", e.target.value)}
                placeholder="Describe the product: features, size, material..."
                className={`${inputClass} resize-none`}
              />
            </Field>
          </div>
        </div>
      </section>

      {/* Pricing & stock */}
      <section className="rounded-lg bg-white p-7 shadow-sm">
        <h3 className="mb-5 text-2xl font-semibold text-gray-900">Pricing and stock</h3>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <Field label="Price (৳)" error={errors.price}>
            <input
              type="number"
              min="0"
              value={form.price}
              onChange={(e) => setField("price", e.target.value)}
              placeholder="0"
              className={inputClass}
            />
          </Field>

          <Field label="Discount price (৳)" error={errors.discountPrice}>
            <input
              type="number"
              min="0"
              value={form.discountPrice}
              onChange={(e) => setField("discountPrice", e.target.value)}
              placeholder="Optional"
              className={inputClass}
            />
          </Field>

          <Field label="Stock quantity" error={errors.stock}>
            <input
              type="number"
              min="0"
              value={form.stock}
              onChange={(e) => setField("stock", e.target.value)}
              placeholder="0"
              className={inputClass}
            />
          </Field>

          <Field label="Unit">
            <select
              value={form.unit}
              onChange={(e) => setField("unit", e.target.value)}
              className={inputClass}
            >
              <option value="pcs">Piece</option>
              <option value="kg">Kg</option>
              <option value="g">Gram</option>
              <option value="l">Litre</option>
              <option value="box">Box</option>
            </select>
          </Field>
        </div>
      </section>

      {/* Images */}
      <section className="rounded-lg bg-white p-7 shadow-sm">
        <h3 className="mb-1 text-2xl font-semibold text-gray-900">Product images</h3>
        <p className="mb-5 text-sm text-gray-500">
          Up to {MAX_IMAGES} images. The first image is the main one.
        </p>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {images.map((img, i) => (
            <div
              key={img.preview}
              className="relative h-36 overflow-hidden rounded-md border border-gray-200"
            >
              <img src={img.preview} alt={`Product ${i + 1}`} className="h-full w-full object-cover" />
              {i === 0 && (
                <span className="absolute bottom-2 left-2 rounded bg-[#4C9A5F] px-2 py-0.5 text-xs font-medium text-white">
                  Main
                </span>
              )}
              <button
                type="button"
                onClick={() => removeImage(i)}
                aria-label={`Remove image ${i + 1}`}
                className="absolute right-2 top-2 rounded-full bg-white p-1 text-gray-700 shadow hover:text-red-500"
              >
                <FiX size={16} />
              </button>
            </div>
          ))}

          {images.length < MAX_IMAGES && (
            <label className="flex h-36 cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-dashed border-gray-300 text-sm text-gray-500 hover:border-[#4C9A5F] hover:text-[#4C9A5F]">
              <FiImage size={26} />
              Add image
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImages}
                className="hidden"
              />
            </label>
          )}
        </div>
        {errors.images && <p className="mt-2 text-sm text-red-500">{errors.images}</p>}
      </section>

      {/* Tags & options */}
      <section className="rounded-lg bg-white p-7 shadow-sm">
        <h3 className="mb-5 text-2xl font-semibold text-gray-900">Tags and options</h3>

        <label className="mb-1 block text-sm text-gray-600">Tags</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTag();
              }
            }}
            placeholder="Type a tag and press Enter"
            className={inputClass}
          />
          <button
            type="button"
            onClick={addTag}
            aria-label="Add tag"
            className="rounded-md border border-gray-200 px-4 text-gray-600 hover:border-[#4C9A5F] hover:text-[#4C9A5F]"
          >
            <FiPlus size={18} />
          </button>
        </div>

        {tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {tags.map((t) => (
              <span
                key={t}
                className="flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-sm text-[#4C9A5F]"
              >
                {t}
                <button
                  type="button"
                  onClick={() => setTags((list) => list.filter((x) => x !== t))}
                  aria-label={`Remove tag ${t}`}
                >
                  <FiX size={14} />
                </button>
              </span>
            ))}
          </div>
        )}

        <label className="mt-6 flex cursor-pointer items-center gap-3 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => setField("featured", e.target.checked)}
            className="h-4 w-4 accent-[#4C9A5F]"
          />
          Show this product as featured
        </label>
      </section>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={handleReset}
          className="rounded-md border border-gray-200 bg-white px-6 py-3 text-sm text-gray-700 hover:bg-gray-50"
        >
          Reset
        </button>
        <button
          type="submit"
          className="flex items-center gap-2 rounded-md bg-[#4C9A5F] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#3f8450]"
        >
          <FiPlus size={18} />
          Add product
        </button>
      </div>
    </form>
  );
};

export default AddProducts;
