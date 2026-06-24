import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getAllChatsApi } from "../../api/chat";
import ChatCard from "../../components/ChatCard";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Search, X } from "lucide-react";

export default function Chats() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await getAllChatsApi();
        if (res.success) setChats(res.chats);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchChats();
  }, []);

  const filtered = chats.filter((chat) =>
    chat.user?.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-white to-pink-50">
      {/* Bg blobs */}
      <div className="fixed w-72 h-72 bg-blue-200 rounded-full blur-3xl opacity-20 top-0 left-0 pointer-events-none" />
      <div className="fixed w-72 h-72 bg-pink-200 rounded-full blur-3xl opacity-20 bottom-0 right-0 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative w-full max-w-md h-[88vh] bg-white/70 backdrop-blur-2xl rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] border border-white/70 flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="px-5 pt-5 pb-4 bg-white/80 border-b border-white/60 shrink-0">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-400 to-pink-400 flex items-center justify-center shadow">
                <MessageCircle size={16} className="text-white" />
              </div>
              <h2 className="text-lg font-bold text-gray-800 tracking-tight">Messages</h2>
            </div>
            {chats.length > 0 && (
              <span className="text-xs bg-blue-50 text-blue-500 font-semibold px-2.5 py-1 rounded-full">
                {chats.length} chats
              </span>
            )}
          </div>

          {/* Search */}
          <div className="relative group">
            <Search size={15} className="absolute left-3 top-2.5 text-gray-400 group-focus-within:text-blue-400 transition-colors" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search conversations..."
              className="w-full pl-9 pr-8 py-2 rounded-2xl bg-gray-50/80 border border-gray-100 focus:border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-50 text-sm text-gray-700 placeholder:text-gray-400 transition"
            />
            <AnimatePresence>
              {search && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <X size={14} />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
          {/* Loading */}
          {loading && (
            <div className="flex flex-col items-center justify-center h-full gap-3">
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-2xl bg-white/60"
                >
                  <div className="w-11 h-11 rounded-full bg-gray-100 animate-pulse shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 bg-gray-100 rounded-full animate-pulse w-1/3" />
                    <div className="h-2.5 bg-gray-100 rounded-full animate-pulse w-2/3" />
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Empty state */}
          {!loading && chats.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center h-full gap-3 text-center px-6"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-100 to-pink-100 flex items-center justify-center">
                <MessageCircle size={28} className="text-blue-400" />
              </div>
              <p className="font-semibold text-gray-700">No conversations yet</p>
              <p className="text-xs text-gray-400 leading-relaxed">
                Connect with someone to start chatting 👋
              </p>
            </motion.div>
          )}

          {/* No search results */}
          {!loading && chats.length > 0 && filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center h-full gap-2"
            >
              <Search size={28} className="text-gray-300" />
              <p className="text-sm text-gray-400">No results for "{search}"</p>
            </motion.div>
          )}

          {/* Chat list */}
          <AnimatePresence>
            {!loading &&
              filtered.map((chat, i) => (
                <motion.div
                  key={chat._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <ChatCard
                    chat={chat}
                    currentUserId={user?._id}
                    onClick={() => navigate(`/chat/${chat.user._id}`)}
                  />
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}