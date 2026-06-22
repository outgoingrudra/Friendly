import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/auth.js";
import { Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext.jsx";

export default function Login() {
  const navigate = useNavigate();
  const { fetchUser } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email.trim() || !form.password.trim()) {
      return toast.error("Email and password are required");
    }

    setSubmitting(true);
    const loadingToast = toast.loading("Logging you in...");

    try {
      const res = await login(form);
      await fetchUser();
      if (res.success) {
        toast.success("Welcome back 👋", { id: loadingToast });
        navigate("/feed");
      } else {
        toast.error(res.message, { id: loadingToast });
      }
    } catch (err) {
      toast.error(err?.message || "Login failed", { id: loadingToast });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-pink-50 px-4 relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-20 -top-10 -left-10" />
      <div className="absolute w-96 h-96 bg-pink-200 rounded-full blur-3xl opacity-20 -bottom-10 -right-10" />

      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="relative w-full max-w-md bg-white/70 backdrop-blur-2xl border border-white/80 rounded-[2.5rem] p-8 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.12)]"
      >
        {/* Logo mark */}
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-400 to-pink-400 shadow-lg flex items-center justify-center">
            <span className="text-white text-xl font-bold">F</span>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
            Welcome back
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Sign in to your Friendly account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="relative group">
            <Mail
              className="absolute left-3.5 top-3.5 text-gray-400 group-focus-within:text-blue-400 transition-colors"
              size={17}
            />
            <input
              name="email"
              type="email"
              placeholder="Email address"
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white/80 border border-gray-200 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100 transition text-sm text-gray-700 placeholder:text-gray-400"
            />
          </div>

          {/* Password */}
          <div className="relative group">
            <Lock
              className="absolute left-3.5 top-3.5 text-gray-400 group-focus-within:text-blue-400 transition-colors"
              size={17}
            />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
              className="w-full pl-10 pr-11 py-3 rounded-2xl bg-white/80 border border-gray-200 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100 transition text-sm text-gray-700 placeholder:text-gray-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              className="absolute right-3.5 top-3.5 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={showPassword ? "hide" : "show"}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.15 }}
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>

          {/* Forgot password */}
          <div className="flex justify-end">
            <span className="text-xs text-blue-400 hover:text-blue-500 cursor-pointer hover:underline">
              Forgot password?
            </span>
          </div>

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            disabled={submitting}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold text-sm shadow-[0_6px_20px_-5px_rgba(59,130,246,0.5)] hover:shadow-[0_8px_24px_-5px_rgba(59,130,246,0.6)] transition-all disabled:opacity-60 cursor-pointer"
          >
            {submitting ? "Signing in..." : "Sign in"}
            {!submitting && <ArrowRight size={16} />}
          </motion.button>
        </form>

        {/* Footer */}
        <p className="text-sm text-gray-400 mt-6 text-center">
          No account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-blue-500 cursor-pointer font-medium hover:underline"
          >
            Sign up
          </span>
        </p>
      </motion.div>
    </div>
  );
}
