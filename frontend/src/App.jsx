import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Landing from "./pages/Landing";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import Feed from "./pages/feed/Feed";

import { useAuth } from "./context/AuthContext";
import Loader from "./components/shimmerUI/Loader";
import Header from "./components/Header";
import Chats from "./pages/feed/Chats";
import Posts from "./pages/feed/Posts";
import Profile from "./pages/user/Profile";
import Friends from "./pages/user/Friends";
import OtherUser from "./pages/user/OtherUser";

export default function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
       <Loader/>
    );
  }

  return (
    <BrowserRouter>
     <Toaster position="top-right" />
      {user && <Header/>}
      <Routes>

        {/* Public routes */}
        {!user && (
          <>
            <Route path="/" element={<Landing />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </>
        )}

        {/* Protected routes */}
        {user && (
          <>
           
            <Route path="/feed" element={<Feed />} />
            <Route path="/chats" element={<Chats />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/friends" element={< Friends/>} />
            <Route path="/profile/:id" element={<OtherUser   />} />
          </>
        )}

        {/* Redirect fallback */}
        <Route
          path="*"
          element={<Navigate to={user ? "/feed" : "/"} />}
        />

      </Routes>
    </BrowserRouter>
  );
}


     