import api from "../utils/axios";

export const getFeed = async (skipCount = 0, limitCount = 10) => {
  try {
    const res = await api.get("/user/feed", {
      params: {
        skipCount,
        limitCount,
      },
    });

    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};