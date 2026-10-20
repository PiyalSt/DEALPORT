import React, { useState } from "react";
import { Link } from "react-router";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiLock,
  FiEye,
  FiEyeOff,
  FiCheck,
} from "react-icons/fi";

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  agree: false,
};

const inputWrap =
  "flex items-center gap-3 rounded-md border border-gray-200 bg-white px-3 focus-within:border-[#4C9A5F]";
const inputClass =
  "w-full bg-transparent py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400";

const getStrength = (pw) => {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score; // 0 - 4
};

const strengthMeta = [
  { label: "", color: "bg-gray-200" },
  { label: "Weak", color: "bg-red-500" },
  { label: "Fair", color: "bg-amber-500" },
  { label: "Good", color: "bg-lime-500" },
  { label: "Strong", color: "bg-emerald-500" },
];

const Register = () => {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const setField = (name, value) => {
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email address";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    else if (!/^(?:\+?88)?01[3-9]\d{8}$/.test(form.phone.replace(/[\s-]/g, "")))
      e.phone = "Enter a valid Bangladeshi phone number";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 8) e.password = "Password must be at least 8 characters";
    if (!form.confirmPassword) e.confirmPassword = "Confirm your password";
    else if (form.password !== form.confirmPassword)
      e.confirmPassword = "Passwords do not match";
    if (!form.agree) e.agree = "You must accept the terms to continue";
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;

    setLoading(true);
    try {
      const payload = {
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        phone: form.phone.trim(),
        password: form.password,
      };

      // TODO: send to your backend, e.g.
      // await axios.post("http://localhost:5000/api/auth/register", payload);
      console.log("Register payload:", { ...payload, password: "••••••••" });

      setSuccess(true);
      setForm(emptyForm);
    } catch (err) {
      setErrors({ form: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const strength = getStrength(form.password);

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left brand panel */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-[#4C9A5F] p-12 text-white lg:flex">
        <div className="text-3xl font-extrabold tracking-wide">DEALPORT</div>

        <div className="relative z-10">
          <h2 className="mb-4 text-4xl font-semibold leading-tight">
            Manage your store
            <br />
            from one dashboard
          </h2>
          <p className="max-w-md text-white/80">
            Track sales, orders, customers and coupons in one place. Create your
            admin account to get started.
          </p>

          <ul className="mt-8 space-y-3 text-white/90">
            {["Real-time sales overview", "Easy product and category management", "Coupons and transaction tracking"].map(
              (item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                    <FiCheck size={14} />
                  </span>
                  {item}
                </li>
              )
            )}
          </ul>
        </div>

        <p className="relative z-10 text-sm text-white/70">
          © {new Date().getFullYear()} Dealport. All rights reserved.
        </p>

        {/* decorative circles */}
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10" />
        <div className="absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-white/10" />
      </div>

      {/* Form panel */}
      <div className="flex w-full items-center justify-center px-6 py-10 lg:w-1/2">
        <div className="w-full max-w-md">
          <div className="mb-8 text-2xl font-extrabold tracking-wide text-[#4C9A5F] lg:hidden">
            DEALPORT
          </div>

          <h1 className="text-3xl font-semibold text-gray-900">Create account</h1>
          <p className="mb-7 mt-2 text-gray-500">
            Fill in your details to register as an admin.
          </p>

          {success && (
            <div className="mb-5 flex items-center gap-2 rounded-md bg-green-50 px-4 py-3 text-sm font-medium text-[#4C9A5F]">
              <FiCheck size={18} />
              Account created successfully. You can log in now.
            </div>
          )}
          {errors.form && (
            <div className="mb-5 rounded-md bg-red-50 px-4 py-3 text-sm text-red-600">
              {errors.form}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Name */}
            <div>
              <label className="mb-1 block text-sm text-gray-600">Full name</label>
              <div className={inputWrap}>
                <FiUser className="text-gray-400" size={18} />
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setField("name", e.target.value)}
                  placeholder="Your full name"
                  autoComplete="name"
                  className={inputClass}
                />
              </div>
              {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="mb-1 block text-sm text-gray-600">Email</label>
              <div className={inputWrap}>
                <FiMail className="text-gray-400" size={18} />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setField("email", e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className={inputClass}
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="mb-1 block text-sm text-gray-600">Phone number</label>
              <div className={inputWrap}>
                <FiPhone className="text-gray-400" size={18} />
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setField("phone", e.target.value)}
                  placeholder="01XXXXXXXXX"
                  autoComplete="tel"
                  className={inputClass}
                />
              </div>
              {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="mb-1 block text-sm text-gray-600">Password</label>
              <div className={inputWrap}>
                <FiLock className="text-gray-400" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => setField("password", e.target.value)}
                  placeholder="At least 8 characters"
                  autoComplete="new-password"
                  className={inputClass}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>

              {form.password && (
                <div className="mt-2">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((n) => (
                      <div
                        key={n}
                        className={`h-1.5 flex-1 rounded-full ${
                          n <= strength ? strengthMeta[strength].color : "bg-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Strength: {strengthMeta[strength].label || "Too short"}
                  </p>
                </div>
              )}
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            {/* Confirm password */}
            <div>
              <label className="mb-1 block text-sm text-gray-600">Confirm password</label>
              <div className={inputWrap}>
                <FiLock className="text-gray-400" size={18} />
                <input
                  type={showConfirm ? "text" : "password"}
                  value={form.confirmPassword}
                  onChange={(e) => setField("confirmPassword", e.target.value)}
                  placeholder="Re-enter your password"
                  autoComplete="new-password"
                  className={inputClass}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((s) => !s)}
                  aria-label={showConfirm ? "Hide password" : "Show password"}
                  className="text-gray-400 hover:text-gray-600"
                >
                  {showConfirm ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Terms */}
            <div>
              <label className="flex cursor-pointer items-start gap-3 text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={form.agree}
                  onChange={(e) => setField("agree", e.target.checked)}
                  className="mt-0.5 h-4 w-4 accent-[#4C9A5F]"
                />
                <span>
                  I agree to the{" "}
                  <a href="#" className="font-medium text-[#4C9A5F] hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="font-medium text-[#4C9A5F] hover:underline">
                    Privacy Policy
                  </a>
                </span>
              </label>
              {errors.agree && <p className="mt-1 text-sm text-red-500">{errors.agree}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-[#4C9A5F] py-3 text-sm font-medium text-white transition hover:bg-[#3f8450] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-[#4C9A5F] hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
