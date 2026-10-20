import React, { useState } from "react";
import { Link } from "react-router";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiCheck,
  FiAlertCircle,
} from "react-icons/fi";

const inputWrap =
  "flex items-center gap-3 rounded-md border border-gray-200 bg-white px-3 focus-within:border-[#4C9A5F]";
const inputClass =
  "w-full bg-transparent py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const setField = (name, value) => {
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name] || errors.form)
      setErrors((er) => ({ ...er, [name]: undefined, form: undefined }));
  };

  const validate = () => {
    const e = {};
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email))
      e.email = "Enter a valid email address";
    if (!form.password) e.password = "Password is required";
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
        email: form.email.trim().toLowerCase(),
        password: form.password,
      };

      // TODO: send to your backend, e.g.
      // const { data } = await axios.post("http://localhost:5000/api/auth/login", payload);
      // form.remember
      //   ? localStorage.setItem("token", data.token)
      //   : sessionStorage.setItem("token", data.token);
      // navigate("/dashboard");
      console.log("Login payload:", { ...payload, password: "••••••••" });
    } catch (err) {
      setErrors({ form: "Invalid email or password. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left brand panel */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-[#4C9A5F] p-12 text-white lg:flex">
        <div className="text-3xl font-extrabold tracking-wide">DEALPORT</div>

        <div className="relative z-10">
          <h2 className="mb-4 text-4xl font-semibold leading-tight">
            Welcome back,
            <br />
            good to see you again
          </h2>
          <p className="max-w-md text-white/80">
            Log in to check your sales, manage orders and keep your store
            running smoothly.
          </p>

          <div className="mt-10 grid max-w-md grid-cols-3 gap-4">
            {[
              ["৳50,000", "Weekly sales"],
              ["6,000", "Customers"],
              ["10.08k", "Orders"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-lg bg-white/15 p-4 backdrop-blur-sm"
              >
                <p className="text-xl font-bold">{value}</p>
                <p className="mt-1 text-xs text-white/80">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="relative z-10 text-sm text-white/70">
          © {new Date().getFullYear()} Dealport. All rights reserved.
        </p>

        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10" />
        <div className="absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-white/10" />
      </div>

      {/* Form panel */}
      <div className="flex w-full items-center justify-center px-6 py-10 lg:w-1/2">
        <div className="w-full max-w-md">
          <div className="mb-8 text-2xl font-extrabold tracking-wide text-[#4C9A5F] lg:hidden">
            DEALPORT
          </div>

          <h1 className="text-3xl font-semibold text-gray-900">Log in</h1>
          <p className="mb-7 mt-2 text-gray-500">
            Enter your email and password to continue.
          </p>

          {errors.form && (
            <div className="mb-5 flex items-center gap-2 rounded-md bg-red-50 px-4 py-3 text-sm text-red-600">
              <FiAlertCircle size={18} />
              {errors.form}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
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
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="mb-1 flex items-center justify-between">
                <label className="text-sm text-gray-600">Password</label>
                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-[#4C9A5F] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className={inputWrap}>
                <FiLock className="text-gray-400" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => setField("password", e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
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
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            {/* Remember me */}
            <label className="flex cursor-pointer items-center gap-3 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={form.remember}
                onChange={(e) => setField("remember", e.target.checked)}
                className="h-4 w-4 accent-[#4C9A5F]"
              />
              Remember me
            </label>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-md bg-[#4C9A5F] py-3 text-sm font-medium text-white transition hover:bg-[#3f8450] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Logging in...
                </>
              ) : (
                <>
                  <FiCheck size={16} />
                  Log in
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Do not have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-[#4C9A5F] hover:underline"
            >
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
