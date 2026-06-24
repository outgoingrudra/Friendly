// api/message.js

import api from "../utils/axios.js";

export const sendMessageApi = async ({ chatId, text }) => {
  const res = await api.post("/message/send", {
    chatId,
    text,
  });

  return res.data;
};


export const getMessagesApi = async (chatId) => {
  const res = await api.get(`/message/${chatId}`);
  return res.data;
};

export const markAsSeenApi = async (chatId) => {
  const res = await api.put(`/message/seen/${chatId}`);
  return res.data;
};
