import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { useState } from "react";
import { acceptRequest, rejectRequest ,removeRequestFromCache } from "../../api/connection";
import toast from "react-hot-toast";

export default function RequestCard({ request,onRemove }) {
  const [loading, setLoading] = useState(false);

  const user = request.fromUserId;

 const handleAction = async (type) => {
  setLoading(true);

  const toastId = toast.loading(
    type === "accept" ? "Accepting..." : "Rejecting..."
  );

  try {
    let res;

    if (type === "accept") {
      res = await acceptRequest(request._id);

      if (!res?.success) {
        throw new Error(res?.message || "Accept failed");
      }

      toast.success(res?.message || "Connection accepted 💙", {
        id: toastId,
      });
      onRemove(request._id);
      removeRequestFromCache(request._id);

    } else {
      res = await rejectRequest(request._id);

      if (!res?.success) {
        throw new Error(res?.message || "Reject failed");
      }

      toast.success(res?.message || "Request rejected", {
        id: toastId,
      });
      onRemove(request._id); 
      removeRequestFromCache(request._id);
    }

 
  } catch (err) {
    toast.error(err?.message || "Something went wrong", {
      id: toastId,
    });
  } finally {
    setLoading(false);
  }
};

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="
        w-full sm:w-[48%] lg:w-[31%]
        bg-white/60 backdrop-blur-xl
        border border-white/70
        rounded-3xl p-5
        shadow-[0_15px_40px_-15px_rgba(0,0,0,0.15)]
        flex flex-col gap-4
        transition
      "
    >
      {/* User Info */}
      <div className="flex items-center gap-3">
        <img
          src={user.image}
          alt={user.name}
          className="w-12 h-12 rounded-full object-cover border-2 border-pink-300"
        />

        <div className="flex-1 overflow-hidden">
          <h3 className="font-semibold text-gray-800 truncate">
            {user.name}
          </h3>
          <p className="text-sm text-gray-500 truncate">{user.bio}</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3">
        {/* Reject */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          disabled={loading}
          onClick={() => handleAction("reject")}
          className="
            p-2 rounded-2xl
            bg-red-500 text-white
            shadow-md hover:bg-red-600
            cursor-pointer
            disabled:opacity-50
          "
        >
          <X size={18} />
        </motion.button>

        {/* Accept */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          disabled={loading}
          onClick={() => handleAction("accept")}
          className="
            p-2 rounded-2xl
            bg-green-500 text-white
            shadow-md hover:bg-green-600
            cursor-pointer
            disabled:opacity-50
          "
        >
          <Check size={18} />
        </motion.button>
      </div>

      {/* Loading indicator */}
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs text-gray-500 text-center"
        >
          Processing request...
        </motion.div>
      )}
    </motion.div>
  );
}