import React, { useState, useMemo } from "react";
import { Link } from "react-router";
import {
  FiTrash2,
  FiPlus,
  FiMinus,
  FiShoppingCart,
  FiArrowLeft,
  FiArrowRight,
  FiTag,
  FiCheck,
  FiX,
  FiTruck,
  FiShield,
} from "react-icons/fi";

// Replace with your real cart (Context, Redux or API)
const initialItems = [
  { id: 1, name: "Wireless Headphones", category: "Electronics", price: 4500, oldPrice: 6000, qty: 1, stock: 8 },
  { id: 3, name: "Cotton Panjabi", category: "Fashion", price: 1800, oldPrice: 2400, qty: 2, stock: 15 },
  { id: 8, name: "Premium Basmati Rice 5kg", category: "Groceries", price: 780, oldPrice: 900, qty: 1, stock: 40 },
];

// These should be verified by your backend in a real app
const coupons = {
  WELCOME10: { type: "percentage", value: 10, minOrder: 500 },
  FLAT200: { type: "fixed", value: 200, minOrder: 1500 },
};

const FREE_DELIVERY_ABOVE = 2000;
const DELIVERY_CHARGE = 80;

const money = (n) => `৳${Math.round(n).toLocaleString("en-US")}`;

const CartPage = () => {
  const [items, setItems] = useState(initialItems);
  const [couponInput, setCouponInput] = useState("");
  const [appliedCode, setAppliedCode] = useState(null);
  const [couponError, setCouponError] = useState("");

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.qty, 0),
    [items]
  );
  const savings = useMemo(
    () => items.reduce((sum, i) => sum + (i.oldPrice - i.price) * i.qty, 0),
    [items]
  );
  const itemCount = items.reduce((sum, i) => sum + i.qty, 0);

  const coupon = appliedCode ? coupons[appliedCode] : null;
  const couponActive = coupon && subtotal >= coupon.minOrder;
  const discount = couponActive
    ? coupon.type === "percentage"
      ? (subtotal * coupon.value) / 100
      : Math.min(coupon.value, subtotal)
    : 0;

  const afterDiscount = subtotal - discount;
  const delivery =
    items.length === 0 || afterDiscount >= FREE_DELIVERY_ABOVE ? 0 : DELIVERY_CHARGE;
  const total = afterDiscount + delivery;

  const freeDeliveryLeft = Math.max(0, FREE_DELIVERY_ABOVE - afterDiscount);
  const progress = Math.min(100, (afterDiscount / FREE_DELIVERY_ABOVE) * 100);

  const changeQty = (id, delta) =>
    setItems((list) =>
      list.map((i) =>
        i.id === id
          ? { ...i, qty: Math.min(i.stock, Math.max(1, i.qty + delta)) }
          : i
      )
    );

  const removeItem = (id) => setItems((list) => list.filter((i) => i.id !== id));

  const clearCart = () => {
    if (window.confirm("Remove all items from your cart?")) {
      setItems([]);
      setAppliedCode(null);
    }
  };

  const applyCoupon = (e) => {
    e.preventDefault();
    const code = couponInput.trim().toUpperCase();
    if (!code) {
      setCouponError("Enter a coupon code");
      return;
    }
    const found = coupons[code];
    if (!found) {
      setCouponError("This coupon code is not valid");
      return;
    }
    if (subtotal < found.minOrder) {
      setCouponError(`Minimum order ${money(found.minOrder)} required for this coupon`);
      return;
    }
    setAppliedCode(code);
    setCouponError("");
    setCouponInput("");
  };

  const removeCoupon = () => {
    setAppliedCode(null);
    setCouponError("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simple header */}
      <header className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link to="/" className="text-2xl font-extrabold tracking-wide text-[#4C9A5F]">
            DEALPORT
          </Link>
          <Link
            to="/"
            className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-[#4C9A5F]"
          >
            <FiArrowLeft size={16} />
            Continue shopping
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">Shopping Cart</h1>
            <p className="mt-1 text-gray-500">
              {items.length === 0
                ? "Your cart is empty"
                : `${itemCount} ${itemCount === 1 ? "item" : "items"} in your cart`}
            </p>
          </div>
          {items.length > 0 && (
            <button
              onClick={clearCart}
              className="flex items-center gap-2 rounded-md border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 hover:border-red-300 hover:text-red-500"
            >
              <FiTrash2 size={16} />
              Clear cart
            </button>
          )}
        </div>

        {items.length === 0 ? (
          /* Empty state */
          <div className="rounded-lg bg-white px-6 py-20 text-center shadow-sm">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-green-50 text-[#4C9A5F]">
              <FiShoppingCart size={34} />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">Your cart is empty</h2>
            <p className="mx-auto mt-2 max-w-sm text-gray-500">
              Looks like you have not added anything yet. Explore our products and
              find something you like.
            </p>
            <Link
              to="/"
              className="mt-7 inline-flex items-center gap-2 rounded-md bg-[#4C9A5F] px-7 py-3 font-medium text-white transition hover:bg-[#3f8450]"
            >
              Start shopping
              <FiArrowRight size={18} />
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
            {/* Items */}
            <section className="space-y-4">
              {/* Free delivery progress */}
              <div className="rounded-lg bg-white p-5 shadow-sm">
                <div className="mb-3 flex items-center gap-3 text-sm">
                  <FiTruck size={20} className="text-[#4C9A5F]" />
                  {freeDeliveryLeft > 0 ? (
                    <p className="text-gray-700">
                      Add <b className="text-[#4C9A5F]">{money(freeDeliveryLeft)}</b> more
                      to get free delivery
                    </p>
                  ) : (
                    <p className="font-medium text-[#4C9A5F]">
                      You have unlocked free delivery
                    </p>
                  )}
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-[#4C9A5F] transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Item list */}
              <div className="rounded-lg bg-white p-2 shadow-sm sm:p-4">
                {items.map((item, index) => (
                  <div
                    key={item.id}
                    className={`flex flex-wrap items-center gap-4 p-3 sm:flex-nowrap ${
                      index !== items.length - 1 ? "border-b border-gray-100" : ""
                    }`}
                  >
                    <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-md bg-green-50 text-4xl font-bold text-[#4C9A5F]/40">
                      {item.name.charAt(0)}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-gray-500">{item.category}</p>
                      <h3 className="truncate font-semibold text-gray-900">{item.name}</h3>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="font-semibold text-[#4C9A5F]">{money(item.price)}</span>
                        <span className="text-sm text-gray-400 line-through">
                          {money(item.oldPrice)}
                        </span>
                      </div>
                      {item.qty >= item.stock && (
                        <p className="mt-1 text-xs text-amber-600">
                          Only {item.stock} in stock
                        </p>
                      )}
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center rounded-md border border-gray-200">
                      <button
                        onClick={() => changeQty(item.id, -1)}
                        disabled={item.qty <= 1}
                        aria-label="Decrease quantity"
                        className="p-2.5 text-gray-600 hover:text-[#4C9A5F] disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <FiMinus size={16} />
                      </button>
                      <span className="w-9 text-center text-sm font-medium">{item.qty}</span>
                      <button
                        onClick={() => changeQty(item.id, 1)}
                        disabled={item.qty >= item.stock}
                        aria-label="Increase quantity"
                        className="p-2.5 text-gray-600 hover:text-[#4C9A5F] disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <FiPlus size={16} />
                      </button>
                    </div>

                    <p className="w-24 text-right font-semibold text-gray-900">
                      {money(item.price * item.qty)}
                    </p>

                    <button
                      onClick={() => removeItem(item.id)}
                      aria-label={`Remove ${item.name}`}
                      className="rounded-md p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-500"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Summary */}
            <aside className="h-fit space-y-4 lg:sticky lg:top-6">
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h2 className="mb-5 text-2xl font-semibold text-gray-900">Order Summary</h2>

                {/* Coupon */}
                <label className="mb-1 block text-sm text-gray-600">Coupon code</label>
                {appliedCode ? (
                  <div className="flex items-center justify-between rounded-md bg-green-50 px-4 py-3">
                    <span className="flex items-center gap-2 text-sm font-semibold text-[#4C9A5F]">
                      <FiCheck size={16} />
                      {appliedCode} applied
                    </span>
                    <button
                      onClick={removeCoupon}
                      aria-label="Remove coupon"
                      className="text-gray-500 hover:text-red-500"
                    >
                      <FiX size={18} />
                    </button>
                  </div>
                ) : (
                  <form onSubmit={applyCoupon} className="flex gap-2">
                    <div className="flex flex-1 items-center gap-2 rounded-md border border-gray-200 px-3 focus-within:border-[#4C9A5F]">
                      <FiTag size={16} className="text-gray-400" />
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                        placeholder="Enter code"
                        className="w-full bg-transparent py-3 text-sm uppercase outline-none placeholder:normal-case placeholder:text-gray-400"
                      />
                    </div>
                    <button
                      type="submit"
                      className="rounded-md bg-gray-900 px-5 text-sm font-medium text-white hover:bg-gray-700"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponError && <p className="mt-1 text-sm text-red-500">{couponError}</p>}
                {appliedCode && !couponActive && (
                  <p className="mt-1 text-sm text-amber-600">
                    Coupon needs a minimum order of {money(coupon.minOrder)}
                  </p>
                )}

                {/* Totals */}
                <dl className="mt-6 space-y-3 border-t border-gray-100 pt-5 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <dt>Subtotal</dt>
                    <dd className="font-medium text-gray-900">{money(subtotal)}</dd>
                  </div>
                  {savings > 0 && (
                    <div className="flex justify-between text-gray-600">
                      <dt>Product savings</dt>
                      <dd className="font-medium text-emerald-500">-{money(savings)}</dd>
                    </div>
                  )}
                  {discount > 0 && (
                    <div className="flex justify-between text-gray-600">
                      <dt>Coupon discount</dt>
                      <dd className="font-medium text-emerald-500">-{money(discount)}</dd>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-600">
                    <dt>Delivery</dt>
                    <dd className="font-medium text-gray-900">
                      {delivery === 0 ? (
                        <span className="text-emerald-500">Free</span>
                      ) : (
                        money(delivery)
                      )}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                    <dt className="text-base font-semibold text-gray-900">Total</dt>
                    <dd className="text-2xl font-bold text-[#4C9A5F]">{money(total)}</dd>
                  </div>
                </dl>

                <Link
                  to="/checkout"
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-[#4C9A5F] py-3.5 font-medium text-white transition hover:bg-[#3f8450]"
                >
                  Proceed to checkout
                  <FiArrowRight size={18} />
                </Link>

                <p className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
                  <FiShield size={14} />
                  Secure payment with bKash, Nagad, card or cash on delivery
                </p>
              </div>

              <div className="rounded-lg border border-dashed border-[#4C9A5F]/50 bg-green-50 p-4 text-sm text-gray-700">
                Try <b className="text-[#4C9A5F]">WELCOME10</b> for 10% off, or{" "}
                <b className="text-[#4C9A5F]">FLAT200</b> for ৳200 off orders above ৳1,500.
              </div>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
};

export default CartPage;
