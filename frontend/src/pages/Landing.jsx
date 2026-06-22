import { motion } from "framer-motion";
import { Users, MessageCircle, Image as ImageIcon, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import friendlyImg from "../assets/landing_image.png";

export default function Landing() {
  const navigate = useNavigate();

  const features = [
    { icon: UserPlus, label: "Make Connections" },
    { icon: MessageCircle, label: "Chat Freely" },
    { icon: ImageIcon, label: "Share Posts" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50 flex flex-col relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-200 rounded-full blur-3xl opacity-40" />
      <div className="absolute top-40 -right-20 w-72 h-72 bg-yellow-200 rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-pink-200 rounded-full blur-3xl opacity-40" />

      {/* Header */}
      <header className="flex items-center justify-between px-6 sm:px-10 py-5 relative z-10">
        <div className="flex items-center gap-2">
          <Users className="text-blue-500" size={28} />
          <span className="text-xl font-bold text-gray-800">Friendly</span>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/signup")}
          className="px-6 py-2.5 rounded-full bg-blue-500 text-white font-semibold shadow-[0_6px_0_0_#3b6fd6] hover:bg-blue-600 transition-colors"
        >
          Get Started
        </motion.button>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-10 relative z-10">
        {/* Image card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-white/60 backdrop-blur-xl rounded-[2.5rem] p-4 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.15)] border border-white/80 mb-10"
        >
          <img
            src={friendlyImg}
            alt="Friendly - connect with people"
            className="w-72 sm:w-[26rem] rounded-[2rem]"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-5xl font-extrabold text-gray-800 mb-4 leading-tight"
        >
          Connect. Chat. <span className="text-blue-500">Grow Together.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-500 max-w-lg mb-10 text-base sm:text-lg"
        >
          Friendly helps you build meaningful connections, share posts, and
          chat with people who matter — all in one simple, joyful place.
        </motion.p>

        {/* Feature pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-10"
        >
          {features.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 bg-white px-5 py-3 rounded-2xl shadow-[0_4px_0_0_#e5e7eb] border border-gray-100"
            >
              <Icon className="text-blue-500" size={20} />
              <span className="text-gray-700 font-medium text-sm">{label}</span>
            </div>
          ))}
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/signup")}
          className="px-10 py-3.5 rounded-full bg-blue-500 text-white font-semibold text-lg shadow-[0_6px_0_0_#3b6fd6] hover:bg-blue-600 transition-colors"
        >
          Get Started
        </motion.button>
      </main>
    </div>
  );
}