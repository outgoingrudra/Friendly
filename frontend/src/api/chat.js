import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export async function getChat(targetUserId) {
  try {
    const res = await axios.get(`${API_URL}/chat/${targetUserId}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.log(err);
    return { success: false, message: "Something went wrong" };
  }
}


let chatsCache = null;
let chatsCacheTimestamp = 0;
const CHATS_CACHE_DURATION = 5* 60 * 1000;

export async function getAllChatsApi(force = false) {
  const now = Date.now();

  if (!force && chatsCache && now - chatsCacheTimestamp < CHATS_CACHE_DURATION) {
    return chatsCache;
  }

  try {
    const res = await axios.get(`${API_URL}/chat/all`, {
      withCredentials: true,
    });
    chatsCache = res.data;
    chatsCacheTimestamp = now;
    return res.data;
  } catch (err) {
    console.log(err);
    return { success: false, message: "Something went wrong" };
  }
}

export const invalidateChatsCache = () => {
  chatsCache = null;
  chatsCacheTimestamp = 0;
};