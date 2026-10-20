import React, { useState, useMemo } from "react";
import { Link } from "react-router";
import {
  FiSearch,
  FiShoppingCart,
  FiHeart,
  FiUser,
  FiMenu,
  FiX,
  FiStar,
  FiTruck,
  FiShield,
  FiRefreshCw,
  FiHeadphones,
  FiSmartphone,
  FiShoppingBag,
  FiHome,
  FiSmile,
  FiPackage,
  FiArrowRight,
  FiCopy,
  FiCheck,
  FiFacebook,
  FiInstagram,
  FiTwitter,
} from "react-icons/fi";

const GREEN = "#4C9A5F";

const navLinks = ["Home", "Shop", "Categories", "Deals", "Contact"];

const categories = [
  { name: "Electronics", icon: FiSmartphone, count: 124 },
  { name: "Fashion", icon: FiShoppingBag, count: 86 },
  { name: "Home & Kitchen", icon: FiHome, count: 52 },
  { name: "Beauty", icon: FiSmile, count: 31 },
  { name: "Groceries", icon: FiPackage, count: 210 },
];

// Replace with products fetched from your API
const products = [
  { id: 1, name: "Wireless Headphones", category: "Electronics", price: 4500, oldPrice: 6000, rating: 4.5, reviews: 128 },
  { id: 2, name: "Smart Watch Series 5", category: "Electronics", price: 7800, oldPrice: 9500, rating: 4.7, reviews: 96 },
  { id: 3, name: "Cotton Panjabi", category: "Fashion", price: 1800, oldPrice: 2400, rating: 4.3, reviews: 64 },
  { id: 4, name: "Leather Wallet", category: "Fashion", price: 950, oldPrice: 1300, rating: 4.4, reviews: 52 },
  { id: 5, name: "Non-stick Cookware Set", category: "Home & Kitchen", price: 3200, oldPrice: 4200, rating: 4.6, reviews: 74 },
  { id: 6, name: "Electric Kettle 1.8L", category: "Home & Kitchen", price: 1450, oldPrice: 1900, rating: 4.2, reviews: 41 },
  { id: 7, name: "Herbal Face Wash", category: "Beauty", price: 420, oldPrice: 550, rating: 4.1, reviews: 33 },
  { id: 8, name: "Premium Basmati Rice 5kg", category: "Groceries", price: 780, oldPrice: 900, rating: 4.8, reviews: 210 },
];

const features = [
  { icon: FiTruck, title: "Fast delivery", text: "Delivery across Bangladesh in 2-5 days" },
  { icon: FiShield, title: "Secure payment", text: "bKash, Nagad, card and cash on delivery" },
  { icon: FiRefreshCw, title: "Easy returns", text: "7 days return on eligible products" },
  { icon: FiHeadphones, title: "24/7 support", text: "We are here whenever you need help" },
];

const money = (n) => `৳${n.toLocaleString("en-US")}`;

const Stars = ({ rating }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((n) => (
      <FiStar
        key={n}
        size={14}
        className={n <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "text-gray-300"}
      />
    ))}
  </div>
);

const HomePage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState({}); // { productId: quantity }
  const [wishlist, setWishlist] = useState([]);
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);

  const visibleProducts = useMemo(
    () =>
      products.filter((p) => {
        const matchCat = activeCategory === "All" || p.category === activeCategory;
        const matchSearch = p.name.toLowerCase().includes(search.trim().toLowerCase());
        return matchCat && matchSearch;
      }),
    [activeCategory, search]
  );

  const addToCart = (id) => setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));

  const toggleWishlist = (id) =>
    setWishlist((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id]));

  const copyCoupon = async () => {
    try {
      await navigator.clipboard.writeText("WELCOME10");
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard may be blocked */
    }
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) return;
    // TODO: send email to your backend
    setSubscribed(true);
    setEmail("");
  };

  const goToShop = () =>
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Promo bar */}
      <div className="bg-[#4C9A5F] px-4 py-2 text-center text-sm text-white">
        Free delivery on orders above ৳2,000. Use code <b>WELCOME10</b> for 10% off
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4">
          <Link to="/" className="text-2xl font-extrabold tracking-wide text-[#4C9A5F]">
            DEALPORT
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((l, i) => (
              <a
                key={l}
                href="#"
                className={`text-sm font-medium transition hover:text-[#4C9A5F] ${
                  i === 0 ? "text-[#4C9A5F]" : "text-gray-700"
                }`}
              >
                {l}
              </a>
            ))}
          </nav>

          <div className="hidden flex-1 items-center rounded-md border border-gray-200 px-3 py-2.5 md:flex lg:max-w-xs">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && goToShop()}
              placeholder="Search products"
              className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
            />
            <FiSearch size={18} className="text-gray-500" />
          </div>

          <div className="flex items-center gap-1">
            <button
              className="relative rounded-md p-2.5 text-gray-700 hover:bg-green-50 hover:text-[#4C9A5F]"
              aria-label="Wishlist"
            >
              <FiHeart size={20} />
              {wishlist.length > 0 && (
                <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
                  {wishlist.length}
                </span>
              )}
            </button>
            <button
              className="relative rounded-md p-2.5 text-gray-700 hover:bg-green-50 hover:text-[#4C9A5F]"
              aria-label="Cart"
            >
              <FiShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#4C9A5F] px-1 text-[10px] font-semibold text-white">
                  {cartCount}
                </span>
              )}
            </button>
            <Link
              to="/login"
              className="ml-1 hidden items-center gap-2 rounded-md bg-[#4C9A5F] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#3f8450] sm:flex"
            >
              <FiUser size={16} />
              Login
            </Link>
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="rounded-md p-2.5 text-gray-700 hover:bg-gray-100 lg:hidden"
              aria-label="Menu"
            >
              {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="border-t border-gray-100 px-5 pb-5 lg:hidden">
            <div className="my-4 flex items-center rounded-md border border-gray-200 px-3 py-2.5 md:hidden">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products"
                className="w-full bg-transparent text-sm outline-none"
              />
              <FiSearch size={18} className="text-gray-500" />
            </div>
            <nav className="flex flex-col">
              {navLinks.map((l) => (
                <a key={l} href="#" className="rounded-md px-2 py-3 text-gray-700 hover:bg-green-50">
                  {l}
                </a>
              ))}
              <Link to="/login" className="mt-2 rounded-md bg-[#4C9A5F] px-4 py-3 text-center font-medium text-white">
                Login
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-green-50">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 lg:grid-cols-2 lg:py-24">
          <div className="relative z-10">
            <span className="mb-4 inline-block rounded-full bg-white px-4 py-1.5 text-sm font-medium text-[#4C9A5F] shadow-sm">
              New season offers are live
            </span>
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Shop smart,
              <br />
              <span className="text-[#4C9A5F]">save more</span> every day
            </h1>
            <p className="mt-5 max-w-lg text-lg text-gray-600">
              Thousands of quality products from trusted sellers, delivered to your
              door with secure payment and easy returns.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={goToShop}
                className="flex items-center gap-2 rounded-md bg-[#4C9A5F] px-7 py-3.5 font-medium text-white transition hover:bg-[#3f8450]"
              >
                Shop now
                <FiArrowRight size={18} />
              </button>
              <a
                href="#deals"
                className="rounded-md border border-[#4C9A5F] px-7 py-3.5 font-medium text-[#4C9A5F] transition hover:bg-white"
              >
                View deals
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-8">
              {[
                ["6,000+", "Happy customers"],
                ["500+", "Products"],
                ["4.8", "Average rating"],
              ].map(([value, label]) => (
                <div key={label}>
                  <p className="text-2xl font-bold">{value}</p>
                  <p className="text-sm text-gray-500">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Decorative visual (no external images needed) */}
          <div className="relative mx-auto hidden h-[420px] w-full max-w-md lg:block">
            <div className="absolute inset-0 rounded-[2.5rem] bg-[#4C9A5F]" />
            <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-[#4C9A5F]/20" />
            <div className="absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-[#4C9A5F]/20" />
            <div className="absolute left-8 top-10 rounded-xl bg-white p-4 shadow-xl">
              <FiShoppingBag size={34} className="text-[#4C9A5F]" />
              <p className="mt-2 text-sm font-semibold">Up to 40% off</p>
              <p className="text-xs text-gray-500">On fashion items</p>
            </div>
            <div className="absolute bottom-10 right-8 rounded-xl bg-white p-4 shadow-xl">
              <FiSmartphone size={34} className="text-[#4C9A5F]" />
              <p className="mt-2 text-sm font-semibold">New gadgets</p>
              <p className="text-xs text-gray-500">Just arrived</p>
            </div>
            <div className="absolute left-1/2 top-1/2 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-5xl font-extrabold text-white">
              D
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-5 py-12">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex items-center gap-4 rounded-lg bg-white p-5 shadow-sm ring-1 ring-gray-100">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-50 text-[#4C9A5F]">
                <Icon size={22} />
              </div>
              <div>
                <p className="font-semibold">{title}</p>
                <p className="text-sm text-gray-500">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-5 pb-12">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-semibold">Shop by category</h2>
            <p className="mt-1 text-gray-500">Find what you need faster</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {categories.map(({ name, icon: Icon, count }) => (
            <button
              key={name}
              onClick={() => {
                setActiveCategory(name);
                goToShop();
              }}
              className="group rounded-lg bg-white p-6 text-center shadow-sm ring-1 ring-gray-100 transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-green-50 text-[#4C9A5F] transition group-hover:bg-[#4C9A5F] group-hover:text-white">
                <Icon size={26} />
              </div>
              <p className="font-semibold">{name}</p>
              <p className="text-sm text-gray-500">{count} products</p>
            </button>
          ))}
        </div>
      </section>

      {/* Products */}
      <section id="products" className="mx-auto max-w-7xl scroll-mt-24 px-5 pb-14">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-semibold">Featured products</h2>
            <p className="mt-1 text-gray-500">Hand-picked deals just for you</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {["All", ...categories.map((c) => c.name)].map((c) => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  activeCategory === c
                    ? "bg-[#4C9A5F] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-green-50 hover:text-[#4C9A5F]"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {visibleProducts.length === 0 ? (
          <p className="py-14 text-center text-gray-500">
            No products found. Try a different category or search.
          </p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {visibleProducts.map((p) => {
              const discount = Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100);
              const liked = wishlist.includes(p.id);
              return (
                <div key={p.id} className="group overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-gray-100 transition hover:shadow-md">
                  <div className="relative flex h-48 items-center justify-center bg-green-50">
                    <span className="text-6xl font-bold text-[#4C9A5F]/30">
                      {p.name.charAt(0)}
                    </span>
                    <span className="absolute left-3 top-3 rounded bg-red-500 px-2 py-1 text-xs font-semibold text-white">
                      -{discount}%
                    </span>
                    <button
                      onClick={() => toggleWishlist(p.id)}
                      aria-label="Add to wishlist"
                      className="absolute right-3 top-3 rounded-full bg-white p-2 shadow hover:scale-110"
                    >
                      <FiHeart size={16} className={liked ? "fill-red-500 text-red-500" : "text-gray-600"} />
                    </button>
                  </div>

                  <div className="p-4">
                    <p className="text-xs text-gray-500">{p.category}</p>
                    <h3 className="mt-1 line-clamp-1 font-semibold">{p.name}</h3>
                    <div className="mt-2 flex items-center gap-2">
                      <Stars rating={p.rating} />
                      <span className="text-xs text-gray-500">({p.reviews})</span>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold text-[#4C9A5F]">{money(p.price)}</span>
                        <span className="ml-2 text-sm text-gray-400 line-through">{money(p.oldPrice)}</span>
                      </div>
                      <button
                        onClick={() => addToCart(p.id)}
                        aria-label={`Add ${p.name} to cart`}
                        className="relative rounded-md bg-[#4C9A5F] p-2.5 text-white transition hover:bg-[#3f8450]"
                      >
                        <FiShoppingCart size={18} />
                        {cart[p.id] > 0 && (
                          <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-gray-900 px-1 text-[10px] font-semibold text-white">
                            {cart[p.id]}
                          </span>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Coupon banner */}
      <section id="deals" className="mx-auto max-w-7xl scroll-mt-24 px-5 pb-14">
        <div className="relative overflow-hidden rounded-2xl bg-[#4C9A5F] px-8 py-12 text-white md:px-14">
          <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10" />
          <div className="absolute -bottom-20 right-32 h-48 w-48 rounded-full bg-white/10" />
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-6">
            <div>
              <p className="text-sm font-medium text-white/80">Limited time offer</p>
              <h2 className="mt-1 text-3xl font-semibold md:text-4xl">Get 10% off your first order</h2>
              <p className="mt-2 text-white/80">Use this code at checkout on orders above ৳500.</p>
            </div>
            <button
              onClick={copyCoupon}
              className="flex items-center gap-3 rounded-md border-2 border-dashed border-white/70 bg-white/10 px-6 py-4 text-xl font-bold tracking-widest transition hover:bg-white/20"
            >
              WELCOME10
              {copied ? <FiCheck size={20} /> : <FiCopy size={20} />}
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-green-50">
        <div className="mx-auto max-w-3xl px-5 py-14 text-center">
          <h2 className="text-3xl font-semibold">Join our newsletter</h2>
          <p className="mt-2 text-gray-600">Get new offers and updates in your inbox. No spam.</p>

          {subscribed ? (
            <p className="mt-6 inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 font-medium text-[#4C9A5F] shadow-sm">
              <FiCheck size={18} />
              Thanks for subscribing
            </p>
          ) : (
            <form onSubmit={handleSubscribe} className="mt-6 flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full rounded-md border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#4C9A5F]"
              />
              <button
                type="submit"
                className="rounded-md bg-[#4C9A5F] px-7 py-3 text-sm font-medium text-white hover:bg-[#3f8450]"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-2xl font-extrabold tracking-wide text-white">DEALPORT</p>
            <p className="mt-3 text-sm text-gray-400">
              Your trusted online marketplace for quality products at fair prices.
            </p>
            <div className="mt-5 flex gap-3">
              {[FiFacebook, FiInstagram, FiTwitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-[#4C9A5F]"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-4 font-semibold text-white">Shop</p>
            <ul className="space-y-2 text-sm">
              {categories.map((c) => (
                <li key={c.name}>
                  <a href="#" className="hover:text-white">{c.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 font-semibold text-white">Support</p>
            <ul className="space-y-2 text-sm">
              {["Track order", "Returns and refunds", "Shipping info", "FAQ", "Contact us"].map((l) => (
                <li key={l}>
                  <a href="#" className="hover:text-white">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 font-semibold text-white">Contact</p>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>dealport@gmail.com</li>
              <li>Dhaka, Bangladesh</li>
              <li>Open daily, 9:00 am to 9:00 pm</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 py-5 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Dealport. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
