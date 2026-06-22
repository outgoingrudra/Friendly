import { motion } from "framer-motion";
import { Eye, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { sendConnection } from "../../api/connection.js";
import toast from "react-hot-toast";

import { useState } from "react";
import { Loader2, Check } from "lucide-react";

export default function FeedCard({ user }) {
  const navigate = useNavigate();

  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleConnect = async () => {
    if (sending || sent) return;

    setSending(true);

    const loading = toast.loading("Sending request...");

    try {
      const res = await sendConnection(user._id);

      if (res.success) {
        setSent(true);

        toast.success(res.message || "Request sent!", {
          id: loading,
        });
      } else {
        toast.error(res.message || "Something went wrong", {
          id: loading,
        });
      }
    } catch (err) {
      toast.error(err?.message || "Request failed", {
        id: loading,
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="
  w-full 
  sm:w-[48%] 
  lg:w-[31%] 
  bg-white/60 
  backdrop-blur-xl 
  border border-white/70 
  rounded-3xl 
  p-5 
  shadow-[0_15px_40px_-15px_rgba(0,0,0,0.15)]
  flex flex-col gap-4

  transition-all duration-300
  hover:-translate-y-2
  hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.2)]
  hover:border-blue-200
"
    >
      {/* Top section */}
      <div className="flex items-center gap-3">
        <img
          src={user.image}
          alt={user.name}
          className="w-12 h-12 rounded-full object-cover border-2 border-blue-300"
        />

        <div className="flex-1 overflow-hidden">
          <h3 className="font-semibold text-gray-800 truncate">{user.name}</h3>
          <p className="text-sm text-gray-500 truncate">{user.bio}</p>
        </div>
      </div>

      {/* Bottom actions */}
      <div className="flex items-center justify-end gap-3">
        {/* View Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(`/profile/${user._id}`)}
          className="p-2 rounded-2xl bg-blue-500 text-white shadow-md hover:bg-blue-600 transition cursor-pointer"
        >
          <Eye size={18} />
        </motion.button>

        {/* Send Connection */}
        <motion.button
          whileHover={!sending && !sent ? { scale: 1.1 } : {}}
          whileTap={!sending && !sent ? { scale: 0.95 } : {}}
          onClick={handleConnect}
          disabled={sending || sent}
          className={`
    p-2 rounded-2xl shadow-md transition-all cursor-pointer
    ${
      sent
        ? "bg-green-500 text-white shadow-green-200"
        : sending
          ? "bg-pink-400 text-white animate-pulse"
          : "bg-pink-500 text-white hover:bg-pink-600"
    }
  `}
        >
          {sending ? (
            <Loader2 className="animate-spin" size={18} />
          ) : sent ? (
            <Check size={18} />
          ) : (
            <UserPlus size={18} />
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}
