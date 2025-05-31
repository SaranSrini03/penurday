"use client";

import { useState, useEffect, useRef } from "react";
import React from "react";
import { ArrowLeft, Search, Plus, Heart, MessageSquare, Repeat, Send, MoreVertical, Home, User, Bell, Bookmark, Settings, LogOut } from "lucide-react";
import StarfieldBackground from "@/components/StarfieldBackground";
import NebulaEffects from "@/components/NebulaEffects";
import { motion, AnimatePresence } from "framer-motion";
import UserDetails from "@/components/UserDetails";
import TopNav from "@/components/TopNav";
import Sidebar from "@/components/SideBar";


interface Post {
  id: number;
  username: string;
  name: string;
  content: string;
  timestamp: string;
  likes: number;
  replies: number;
  reposts: number;
  avatar: string;
}

// Define User interface
interface AppUser {
  _id: string;
  name: string;
  username: string;
  email: string;
}

export default function HomePage() {
  const [darkMode, setDarkMode] = useState(false);
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [newPost, setNewPost] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeTab, setActiveTab] = useState("forYou");
  const [showSidebar, setShowSidebar] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<AppUser | null>(null);

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  // Load mock posts once
  useEffect(() => {
    const mockPosts = [
      {
        id: 1,
        username: "space_explorer",
        name: "Csc Voyager",
        content:
          "Just witnessed the most incredible nebula formation through my telescope last night. The universe never ceases to amaze!",
        timestamp: "2h ago",
        likes: 22,
        replies: 8,
        reposts: 3,
        avatar: "🌌",
      },

    ];
    setPosts(mockPosts);
  }, []);

  // Detect system theme preference
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setDarkMode(true);
    }
  }, []);

  // Update html class for dark mode
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // Handle post submission
  const handleSubmitPost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    setIsPosting(true);

    // Simulate API call
    setTimeout(() => {
      const newPostObj = {
        id: posts.length + 1,
        username: user?.username || "current_user",
        name: user?.name || "Cosmic Explorer",
        content: newPost,
        timestamp: "Just now",
        likes: 0,
        replies: 0,
        reposts: 0,
        avatar: "🚀",
      };

      setPosts([newPostObj, ...posts]);
      setNewPost("");
      setIsPosting(false);
      setShowCreateModal(false);
    }, 1000);
  };

  // Handle like action
  const handleLike = (id: number) => {
    setPosts(
      posts.map((post) => (post.id === id ? { ...post, likes: post.likes + 1 } : post))
    );
  };

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setShowCreateModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const initial = <UserDetails detail="username" format="initial" />


  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="inline-flex space-x-1">
          <span className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:0s]" />
          <span className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:0.2s]" />
          <span className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:0.4s]" />
        </span>
      </div>
    );
  }


  if (!user) return <div className="min-h-screen flex items-center justify-center text-red-600">Not logged in</div>;

  return (
    <div
      className={`relative min-h-screen flex flex-col overflow-hidden m-colors duration-500 ${darkMode
        ? "bg-gradient-to-br from-[#000000] to-[#0a0a2a] text-gray-200"
        : "bg-gradient-to-br from-[#faf8f5] to-[#f0ecfe] text-[#1e1e1e]"
        }`}
    >
      {/* Background effects */}
      <StarfieldBackground />
      <NebulaEffects />

      {/* Floating Planets Decoration */}
      <div className="absolute top-1/4 left-1/5 w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 opacity-30 blur-xl"></div>
      <div className="absolute bottom-1/3 right-1/4 w-24 h-24 rounded-full bg-gradient-to-br from-orange-400 to-red-500 opacity-20 blur-xl"></div>
      <div className="absolute top-1/3 right-1/5 w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-teal-500 opacity-30 blur-xl"></div>

      {/* Top Navigation */}
      <TopNav
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        setShowCreateModal={setShowCreateModal}
        setShowSidebar={setShowSidebar}
        initial={initial}
      />


      {/* Main Content */}
      <main className="flex-1 relative z-20 max-w-2xl mx-auto w-full py-6 px-4">
        {/* Feed Tabs */}
        <div className={`flex mb-6 rounded-xl p-1 ${darkMode ? "bg-[#1a1538]" : "bg-[#f0ecfe]"
          }`}>
          <button
            className={`flex-1 py-2.5 rounded-xl text-center transition-colors duration-300 ${activeTab === "forYou"
              ? darkMode
                ? "bg-[#3a2a7c] text-white"
                : "bg-white text-[#5c3aff] shadow-sm"
              : ""
              }`}
            onClick={() => setActiveTab("forYou")}
          >
            For You
          </button>
          <button
            className={`flex-1 py-2.5 rounded-xl text-center transition-colors duration-300 ${activeTab === "following"
              ? darkMode
                ? "bg-[#3a2a7c] text-white"
                : "bg-white text-[#5c3aff] shadow-sm"
              : ""
              }`}
            onClick={() => setActiveTab("following")}
          >
            Following
          </button>
        </div>

        {/* Create Post Card */}
        <div className={`mb-6 rounded-2xl p-5 shadow-lg transition-colors duration-300 ${darkMode ? "bg-[#0d0a1f]/80 border-[#3a2a7c]" : "bg-white/95 border-[#eae6fc]"
          }`}>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#5c3aff] to-[#2b97b8] flex items-center justify-center text-white text-lg font-bold">
              {initial}
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className={`flex-1 text-left p-3 rounded-xl transition-colors duration-300 ${darkMode
                ? "bg-[#1a1538] hover:bg-[#2a1e5c] text-gray-400"
                : "bg-[#f0ecfe] hover:bg-[#e5dfff] text-gray-500"
                }`}
            >
              Start a cosmic thread...
            </button>
          </div>
        </div>

        {/* Posts Feed */}
        <div className="space-y-5">
          {posts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`rounded-2xl p-5 shadow-lg transition-colors duration-300 ${darkMode ? "bg-[#0d0a1f]/80 border-[#3a2a7c]" : "bg-white/95 border-[#eae6fc]"
                }`}
            >
              <div className="flex gap-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl">
                  {post.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold">{post.name}</h3>
                    <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"
                      }`}>@{post.username}</span>
                    <span className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-400"
                      }`}>· {post.timestamp}</span>
                  </div>
                  <p className="mb-4">{post.content}</p>

                  <div className="flex justify-between max-w-md">
                    <button
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center gap-1.5 p-1.5 rounded-full transition-colors duration-300 ${darkMode ? "hover:bg-[#2a1e5c]" : "hover:bg-[#f0ecfe]"
                        }`}
                    >
                      <Heart size={18} className={post.likes > 0 ? "text-red-500 fill-red-500" : ""} />
                      <span>{post.likes}</span>
                    </button>

                    <button className={`flex items-center gap-1.5 p-1.5 rounded-full transition-colors duration-300 ${darkMode ? "hover:bg-[#2a1e5c]" : "hover:bg-[#f0ecfe]"
                      }`}>
                      <MessageSquare size={18} />
                      <span>{post.replies}</span>
                    </button>

                    <button className={`flex items-center gap-1.5 p-1.5 rounded-full transition-colors duration-300 ${darkMode ? "hover:bg-[#2a1e5c]" : "hover:bg-[#f0ecfe]"
                      }`}>
                      <Repeat size={18} />
                      <span>{post.reposts}</span>
                    </button>

                    <button className={`flex items-center gap-1.5 p-1.5 rounded-full transition-colors duration-300 ${darkMode ? "hover:bg-[#2a1e5c]" : "hover:bg-[#f0ecfe]"
                      }`}>
                      <Send size={18} />
                    </button>
                  </div>
                </div>
                <button className={`p-1.5 rounded-full self-start transition-colors duration-300 ${darkMode ? "hover:bg-[#2a1e5c]" : "hover:bg-[#f0ecfe]"
                  }`}>
                  <MoreVertical size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Bottom Navigation (Mobile) */}
      <nav className={`fixed bottom-0 left-0 right-0 z-30 py-3 px-6 backdrop-blur-lg border-t transition-colors duration-300 md:hidden ${darkMode ? "bg-[#0d0a1f]/80 border-[#3a2a7c]" : "bg-white/95 border-[#eae6fc]"
        }`}>
        <div className="flex justify-around">
          <button className={`p-2 rounded-full ${activeTab === "forYou" && (darkMode ? "text-yellow-300" : "text-[#5c3aff]")}`}>
            <Home size={24} />
          </button>
          <button className="p-2 rounded-full">
            <Search size={24} />
          </button>
          <button
            onClick={() => setShowCreateModal(true)}
            className={`p-3 rounded-full ${darkMode
              ? "bg-[#3a2a7c] text-yellow-300"
              : "bg-[#f0ecfe] text-[#5c3aff]"
              }`}
          >
            <Plus size={24} />
          </button>
          <button className="p-2 rounded-full">
            <Bell size={24} />
          </button>
          <button
            onClick={() => setShowSidebar(true)}
            className="p-2 rounded-full"
          >
            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#5c3aff] to-[#2b97b8] flex items-center justify-center text-white text-sm font-bold">
              {initial}
            </div>
          </button>
        </div>
      </nav>

      {/* Create Post Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              ref={modalRef}
              className={`w-full max-w-md rounded-2xl p-6 shadow-2xl transition-colors duration-300 ${darkMode ? "bg-[#0d0a1f] border border-[#3a2a7c]" : "bg-white border border-[#eae6fc]"
                }`}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Create Thread</h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className={`p-1 rounded-full ${darkMode ? "hover:bg-[#2a1e5c]" : "hover:bg-[#f0ecfe]"
                    }`}
                >
                  <ArrowLeft size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmitPost}>
                <div className="flex gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#5c3aff] to-[#2b97b8] flex items-center justify-center text-white text-sm font-bold">
                    {initial}
                  </div>
                  <div className="flex-1">
                    <textarea
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      placeholder="Share your cosmic thoughts..."
                      className={`w-full min-h-[120px] p-3 rounded-xl focus:outline-none focus:ring-2 transition-colors duration-300 ${darkMode
                        ? "bg-[#1a1538] border border-[#3a2a7c] text-white focus:ring-[#8c70cc]"
                        : "bg-[#f0ecfe] border border-[#eae6fc] text-gray-900 focus:ring-[#5c3aff]"
                        }`}
                      maxLength={280}
                    />
                    <p className={`mt-2 text-right text-sm ${darkMode ? "text-gray-400" : "text-gray-500"
                      }`}>
                      {newPost.length}/280
                    </p>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isPosting || !newPost.trim()}
                    className={`px-4 py-2.5 rounded-xl font-bold transition-colors duration-300 flex items-center gap-2 ${darkMode
                      ? "bg-gradient-to-r from-[#8c70cc] to-[#2b97b8] hover:from-[#9b7ddb] hover:to-[#3aa4ce] text-white disabled:opacity-70"
                      : "bg-gradient-to-r from-[#5c3aff] to-[#2b97b8] hover:from-[#6d4aff] hover:to-[#3aa4ce] text-white disabled:opacity-70"
                      }`}
                  >
                    {isPosting ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Posting...
                      </>
                    ) : (
                      "Post Thread"
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Sidebar Menu */}
      <Sidebar
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
        darkMode={darkMode}
        initial={initial}
        handleLogout={handleLogout}
      />

    </div>
  );
}