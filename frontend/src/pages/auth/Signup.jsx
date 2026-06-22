import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { signup } from "../../api/auth.js";
import { User, Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext.jsx";

export default function Signup() {
  const navigate = useNavigate();
  const { fetchUser } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
      return toast.error("All fields are required");
    }

    setSubmitting(true);
    const loadingToast = toast.loading("Creating your account...");

    try {
      const res = await signup(form);
      await fetchUser();
      if (res.success) {
        toast.success("Account created successfully 🎉", { id: loadingToast });
        navigate("/feed");
      } else {
        toast.error(res.message, { id: loadingToast });
      }
    } catch (err) {
      toast.error(err?.message || "Signup failed", { id: loadingToast });
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
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
            className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-400 to-pink-400 shadow-lg flex items-center justify-center"
          >
            <span className="text-white text-xl font-bold">F</span>
          </motion.div>
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Create account</h2>
          <p className="text-gray-400 text-sm mt-1">Join Friendly and start connecting</p>
        </motion.div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 }}
            className="relative group"
          >
            <User className="absolute left-3.5 top-3.5 text-gray-400 group-focus-within:text-blue-400 transition-colors" size={17} />
            <input
              name="name"
              placeholder="Full name"
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white/80 border border-gray-200 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100 transition text-sm text-gray-700 placeholder:text-gray-400"
            />
          </motion.div>

          {/* Email */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="relative group"
          >
            <Mail className="absolute left-3.5 top-3.5 text-gray-400 group-focus-within:text-blue-400 transition-colors" size={17} />
            <input
              name="email"
              type="email"
              placeholder="Email address"
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white/80 border border-gray-200 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100 transition text-sm text-gray-700 placeholder:text-gray-400"
            />
          </motion.div>

          {/* Password */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 }}
            className="relative group"
          >
            <Lock className="absolute left-3.5 top-3.5 text-gray-400 group-focus-within:text-blue-400 transition-colors" size={17} />
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
          </motion.div>

          {/* Submit */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold text-sm shadow-[0_6px_20px_-5px_rgba(59,130,246,0.5)] hover:shadow-[0_8px_24px_-5px_rgba(59,130,246,0.6)] transition-all disabled:opacity-60 cursor-pointer"
            >
              {submitting ? "Creating account..." : "Sign up"}
              {!submitting && (
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <ArrowRight size={16} />
                </motion.span>
              )}
            </motion.button>
          </motion.div>
        </form>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-sm text-gray-400 mt-6 text-center"
        >
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-500 cursor-pointer font-medium hover:underline"
          >
            Sign in
          </span>
        </motion.p>
      </motion.div>
    </div>
  );
}