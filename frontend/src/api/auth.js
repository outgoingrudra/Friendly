import api from "../utils/axios";

// 🔐 Signup API
export const signup = async (data) => {
  try {
    const res = await api.post("/auth/signup", data);
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// 🔐 Login API
export const login = async (data) => {
  try {
    const res = await api.post("/auth/login", data);
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};


export const logout =async()=>{
  
}