import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { useAuth } from "./context/AuthContext";
import Loader from "./components/shimmerUI/Loader";
import Header from "./components/Header";

// Static imports — these load immediately (small + always needed)
import Landing from "./pages/Landing";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

// Lazy imports — only load when user navigates to that route
const Feed = lazy(() => import("./pages/feed/Feed"));
const Chats = lazy(() => import("./pages/feed/Chats"));
const Posts = lazy(() => import("./pages/feed/Posts"));
const Profile = lazy(() => import("./pages/user/Profile"));
const Friends = lazy(() => import("./pages/user/Friends"));
const OtherUser = lazy(() => import("./pages/user/OtherUser"));
const Chat = lazy(() => import("./pages/user/Chat"));

export default function App() {
  const { user, loading } = useAuth();

  if (loading) return <Loader />;

  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      {user && <Header />}
      <Suspense fallback={<Loader />}>
        <Routes>
          {!user && (
            <>
              <Route path="/" element={<Landing />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
            </>
          )}

          {user && (
            <>
              <Route path="/feed" element={<Feed />} />
              <Route path="/chats" element={<Chats />} />
              <Route path="/posts" element={<Posts />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/friends" element={<Friends />} />
              <Route path="/profile/:id" element={<OtherUser />} />
              <Route path="/chat/:targetUser" element={<Chat />} />
            </>
          )}

          <Route path="*" element={<Navigate to={user ? "/feed" : "/"} />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}