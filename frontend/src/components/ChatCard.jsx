import React from "react";
import { motion } from "framer-motion";

function formatTime(dateStr) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  if (isToday) return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (date.toDateString() === yesterday.toDateString()) return "Yesterday";
  return date.toLocaleDateString([], { day: "2-digit", month: "short" });
}

export default function ChatCard({ chat, currentUserId, onClick }) {
  const { user, lastMessage, updatedAt } = chat;

  const isOwnLastMessage =
    lastMessage?.sender === currentUserId ||
    lastMessage?.sender?._id === currentUserId;

  const isUnseen =
    lastMessage &&
    !isOwnLastMessage &&
    !lastMessage.seenBy?.includes(currentUserId);

  const previewText = lastMessage
    ? `${isOwnLastMessage ? "You: " : ""}${lastMessage.text}`
    : "Say hi 👋 to start the conversation";

  return (
    <motion.button
      whileHover={{ scale: 1.01, backgroundColor: "rgba(255,255,255,0.9)" }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl cursor-pointer text-left transition-all border ${
        isUnseen
          ? "bg-blue-50/60 border-blue-100/80"
          : "bg-white/50 border-white/60"
      }`}
    >
      {/* Avatar */}
      <div className="relative shrink-0">
        <img
          src={user?.image}
          alt={user?.name}
          className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
        />
        {/* Online dot placeholder — wire up later */}
        {/* <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full" /> */}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h3 className={`text-sm truncate ${isUnseen ? "font-bold text-gray-900" : "font-semibold text-gray-700"}`}>
            {user?.name}
          </h3>
          <span className={`text-[11px] shrink-0 ${isUnseen ? "text-blue-500 font-semibold" : "text-gray-400"}`}>
            {formatTime(lastMessage?.createdAt || updatedAt)}
          </span>
        </div>

        <p className={`text-xs truncate mt-0.5 ${isUnseen ? "text-gray-700 font-medium" : "text-gray-400"}`}>
          {previewText}
        </p>
      </div>

      {/* Unseen badge */}
      {isUnseen && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0 shadow-[0_0_6px_rgba(59,130,246,0.6)]"
        />
      )}
    </motion.button>
  );
}