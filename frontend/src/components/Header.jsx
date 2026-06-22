import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { MessageCircle, Home, Image, Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: "Feed", icon: Home, path: "/feed" },
    { label: "Posts", icon: Image, path: "/posts" },
    { label: "Chats", icon: MessageCircle, path: "/chats" },
  ];

  const goTo = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-8 py-3 bg-white/60 backdrop-blur-xl border-b border-white/40 shadow-sm">

        {/* BRAND */}
        <motion.div
          onClick={() => navigate("/feed")}
          className="cursor-pointer flex items-center gap-1 select-none"
        >
          {"Friendly".split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, type: "spring", stiffness: 300 }}
              whileHover={{ y: -3, color: "#3b82f6" }}
              className="text-xl font-bold text-gray-800 transition-colors"
            >
              {char}
            </motion.span>
          ))}
        </motion.div>

        {/* DESKTOP NAV */}
        <div className="hidden sm:flex items-center gap-3">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <motion.button
                key={item.label}
                onClick={() => goTo(item.path)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-4 py-2 rounded-2xl transition-all cursor-pointer
                  ${isActive ? "bg-blue-500 text-white shadow-lg" : "bg-white/60 text-gray-700 hover:bg-white/90"}`}
              >
                <Icon size={17} />
                <span className="font-medium text-sm">{item.label}</span>
              </motion.button>
            );
          })}

          <motion.img
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/profile")}
            src={user?.image || "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Twitter_default_profile_400x400.png/250px-Twitter_default_profile_400x400.png"}
            alt="user"
            className="w-9 h-9 rounded-full object-cover border-2 border-blue-400 cursor-pointer shadow-md"
          />
        </div>

        {/* MOBILE RIGHT */}
        <div className="flex sm:hidden items-center gap-3">
          <motion.img
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/profile")}
            src={user?.image || "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Twitter_default_profile_400x400.png/250px-Twitter_default_profile_400x400.png"}
            alt="user"
            className="w-8 h-8 rounded-full object-cover border-2 border-blue-400 cursor-pointer shadow-md"
          />
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMenuOpen((p) => !p)}
            className="p-2 rounded-xl bg-white/60 border border-white/70 text-gray-700 cursor-pointer"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>
      </header>

      {/* MOBILE DROPDOWN */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[61px] left-0 right-0 z-40 bg-white/80 backdrop-blur-xl border-b border-white/40 shadow-lg px-4 py-3 flex flex-col gap-2 sm:hidden"
          >
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <motion.button
                  key={item.label}
                  onClick={() => goTo(item.path)}
                  whileTap={{ scale: 0.97 }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all cursor-pointer
                    ${isActive ? "bg-blue-500 text-white" : "bg-white/60 text-gray-700"}`}
                >
                  <Icon size={18} />
                  {item.label}
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* SPACER so content doesn't hide behind fixed header */}
      <div className="h-[61px]" />
    </>
  );
}