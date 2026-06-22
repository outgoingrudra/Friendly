import { createContext, useContext, useEffect, useState } from "react";
import api from "../utils/axios";
import { getProfile } from "../api/user";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 Fetch logged-in user from backend (cookie-based auth)
  const fetchUser = async () => {
    try {
      const res = await getProfile();
      setUser(res.data.user);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // 🔁 Run once on app load
  useEffect(() => {
    fetchUser();
  }, []);

  // Optional: login helper (after API call)
  const login = async () => {
    await fetchUser(); // sync with backend
  };

  // Logout user
  const logout = async () => {
    try {
      await api.post("/auth/logout");
      setUser(null);
    } catch (err) {
      console.log("Logout failed:", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        loading,
        fetchUser, // 🔥 IMPORTANT (fixes your bug)
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => useContext(AuthContext);