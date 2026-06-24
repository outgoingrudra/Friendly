import { useState } from "react";
import { motion } from "framer-motion";
import { UserMinus, User, MessageCircle } from "lucide-react";
import toast from "react-hot-toast";
import { removeConnection } from "../../api/connection";
import { useNavigate } from "react-router-dom";

export default function FriendCard({ friend, connectionId, onUnfriend }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleUnfriend = async () => {
    setLoading(true);
    const toastId = toast.loading("Removing...");
    try {
      const res = await removeConnection(connectionId);
      if (res?.success) {
        toast.success("Connection removed", { id: toastId });
        onUnfriend(connectionId);
      } else {
        toast.error(res?.message || "Failed", { id: toastId });
      }
    } catch (err) {
      toast.error(err?.message || "Something went wrong", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="w-full sm:w-[48%] lg:w-[31%] bg-white/60 backdrop-blur-xl border border-white/70 rounded-3xl p-5 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.15)] flex flex-col gap-4"
    >
      {/* User Info */}
      <div className="flex items-center gap-3">
        <img
          src={friend.image}
          alt={friend.name}
          className="w-12 h-12 rounded-full object-cover border-2 border-blue-300"
        />
        <div className="flex-1 overflow-hidden">
          <h3 className="font-semibold text-gray-800 truncate">
            {friend.name}
          </h3>
          <p className="text-sm text-gray-500 truncate">{friend.bio}</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-between items-center gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(`/profile/${friend._id}`)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-blue-50 text-blue-500 text-xs font-medium hover:bg-blue-100 cursor-pointer transition"
        >
          <User size={14} />
          Profile
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(`/chat/${friend._id}`)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-emerald-50 text-emerald-500 text-xs font-medium hover:bg-emerald-100 cursor-pointer transition shadow-sm"
        >
          <MessageCircle size={14} />
          Chat
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={loading}
          onClick={handleUnfriend}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-red-50 text-red-500 text-xs font-medium hover:bg-red-100 disabled:opacity-50 cursor-pointer transition"
        >
          <UserMinus size={14} />
          Unfriend
        </motion.button>
      </div>
    </motion.div>
  );
}
