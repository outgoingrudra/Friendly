import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Send, ArrowLeft } from "lucide-react";
import { createSocketConnection } from "../../utils/socket";
import { useAuth } from "../../context/AuthContext";
import { getUserById } from "../../api/user";
import {
  getMessagesApi,
  sendMessageApi,
  markAsSeenApi,
} from "../../api/message"; // 👈 add this
import { getChat, invalidateChatsCache } from "../../api/chat";

// helper — "2:35 PM" or "Yesterday 2:35 PM" etc.
function formatTime(dateStr) {
  const date = new Date(dateStr);
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  const timeStr = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  if (isToday) return timeStr;
  return (
    date.toLocaleDateString([], { day: "numeric", month: "short" }) +
    " · " +
    timeStr
  );
}

export default function Chat() {
  const { targetUser } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [otherUser, setOtherUser] = useState(null);
  const [chatId, setChatId] = useState(null);
  const [sending, setSending] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchChat = async () => {
      const res = await getChat(targetUser);
      if (res.success) setChatId(res.chat._id);
    };
    fetchChat();
  }, [targetUser]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await getUserById(targetUser);
      setOtherUser(res.user);
    };
    fetchUser();
  }, [targetUser]);

  // mark seen when chat first loads
  useEffect(() => {
    if (!chatId) return;
    markAsSeenApi(chatId).then(() => invalidateChatsCache());
  }, [chatId]);

  useEffect(() => {
    if (!user || !chatId) return;
    const socket = createSocketConnection();

    socket.emit("joinChat", { chatId });
    socket.on("messageReceived", (message) => {
      setMessages((prev) => {
        if (prev.some((m) => m._id === message._id)) return prev;
        return [...prev, message];
      });
      // mark seen whenever a new message arrives (it's from the other person)
      markAsSeenApi(chatId).then(() => invalidateChatsCache());
    });

    return () => socket.disconnect();
  }, [user, chatId]);

  useEffect(() => {
    if (!chatId) return;
    const fetchMessages = async () => {
      const res = await getMessagesApi(chatId);
      if (res.success) setMessages(res.messages);
    };
    fetchMessages();
  }, [chatId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    const text = newMessage.trim();
    if (!text || sending) return;

    setSending(true);
    setNewMessage("");

    try {
      const res = await sendMessageApi({ chatId, text });
      if (res?.success && res.data) {
        setMessages((prev) => {
          if (prev.some((m) => m._id === res.data._id)) return prev;
          return [...prev, res.data];
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="h-[calc(100vh-80px)] flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-white to-pink-50">
      <div className="w-full max-w-md h-[75vh] bg-white/70 backdrop-blur-xl rounded-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] border border-white/60 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-3 bg-white/90 shrink-0">
          <button
            onClick={() => navigate(-1)}
            className="p-1.5 rounded-full hover:bg-gray-100 transition cursor-pointer"
          >
            <ArrowLeft size={18} className="text-gray-500" />
          </button>
          <img
            src={otherUser?.image}
            alt=""
            onClick={() => navigate(`/profile/${otherUser?._id}`)}
            className="w-9 h-9 rounded-full object-cover border-2 border-transparent hover:border-blue-400 hover:scale-110 transition-all duration-200 cursor-pointer"
          />
          <div>
            <h2
              onClick={() => navigate(`/profile/${otherUser?._id}`)}
              className="text-sm font-semibold text-gray-800 cursor-pointer hover:text-blue-500 hover:underline underline-offset-2 transition-colors"
            >
              {otherUser?.name}
            </h2>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gradient-to-b from-blue-50/40 to-transparent">
          {messages.length === 0 && (
            <p className="text-center text-xs text-gray-400 mt-10">
              No messages yet. Say hi 👋
            </p>
          )}

          {messages.map((msg, key) => {
            const isOwn =
              msg.sender?._id === user?._id || msg.sender === user?._id;
            const avatar = isOwn
              ? user?.image
              : msg.sender?.image || otherUser?.image;

            return (
              <div
                key={msg._id || key}
                className={`flex items-end gap-2 max-w-[85%] ${
                  isOwn ? "ml-auto flex-row-reverse" : "mr-auto"
                }`}
              >
                <img
                  src={avatar}
                  alt=""
                  className="w-6 h-6 rounded-full object-cover border border-gray-200 shrink-0 mb-0.5"
                />
                {/* bubble + timestamp stacked */}
                <div
                  className={`flex flex-col gap-0.5 ${isOwn ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`px-3.5 py-2 rounded-2xl shadow-sm text-sm leading-snug break-words ${
                      isOwn
                        ? "bg-blue-500 text-white rounded-br-sm"
                        : "bg-white text-gray-700 rounded-bl-sm border border-gray-100"
                    }`}
                  >
                    {msg.text}
                  </div>
                  {/* timestamp */}
                  {msg.createdAt && (
                    <span className="text-[10px] text-gray-400 px-1">
                      {formatTime(msg.createdAt)}
                    </span>
                  )}
                </div>
              </div>
            );
          })}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-gray-100 p-3 bg-white/90 shrink-0">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newMessage}
              disabled={sending}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
              placeholder={sending ? "Sending..." : "Type a message..."}
              className="flex-1 px-4 py-2.5 text-sm border border-gray-200 rounded-full outline-none focus:ring-2 focus:ring-blue-300 bg-white disabled:bg-gray-50 disabled:text-gray-400"
            />
            <button
              onClick={sendMessage}
              disabled={sending || !newMessage.trim()}
              className="p-3 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition cursor-pointer shadow-md shrink-0 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
