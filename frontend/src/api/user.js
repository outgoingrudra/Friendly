import api from "../utils/axios";

export const getProfile = () => {
  return api.get("/user/profile");
};

export async function updateProfile(data) {
  try {
    const res = await api.put("/user/update", data);
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}

export async function uploadProfileImage(data) {
  try {
    const res = await api.put("/user/upload-image", data);
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}



export const getUserById = async (id) => {
  try {
    const res = await api.get(`/user/${id}`);
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};