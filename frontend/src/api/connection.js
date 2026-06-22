import api from "../utils/axios";

// 📌 Send connection request
export const sendConnection = async (userId) => {
  try {
    const res = await api.post(`/connection/send/${userId}`);
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// 📥 Get incoming connection requests
let requestsCache = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 5* 60 * 1000; // 5 minutes
export const getRequests = async (force = false) => {
  const now = Date.now();

  // Return cached data if still valid
  if (!force && requestsCache && now - cacheTimestamp < CACHE_DURATION) {
    return requestsCache;
  }
  try {
    const res = await api.get("/connection/requests");
    requestsCache = res.data;
    cacheTimestamp = now;
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};


export const removeRequestFromCache = (id) => {
  if (requestsCache?.connectionRequests) {
    requestsCache.connectionRequests = requestsCache.connectionRequests.filter(
      (r) => r._id !== id
    );
  }
};

export const acceptRequest = async (id) => {
  try {
    const res = await api.put(`/connection/accept/${id}`);
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Reject connection request
export const rejectRequest = async (id) => {
  try {
    const res = await api.delete(`/connection/reject/${id}`);
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};


export const removeConnection = async (connectionId) => {
  try {
    const res = await api.delete(`/connection/remove/${connectionId}`);
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};


export const removeConnectionFromCache = (id) => {
  if (friendsCache?.connections) {
    friendsCache.connections = friendsCache.connections.filter(
      (c) => c._id !== id
    );
  }
};


let friendsCache = null;
let friendsCacheTimestamp = 0;
const FRIENDS_CACHE_DURATION = 2 * 60 * 1000;

export const getConnections = async (force = false) => {
  const now = Date.now();

  if (!force && friendsCache && now - friendsCacheTimestamp < FRIENDS_CACHE_DURATION) {
    return friendsCache;
  }

  try {
    const res = await api.get(`/connection`);
    friendsCache = res.data;
    friendsCacheTimestamp = now;
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
