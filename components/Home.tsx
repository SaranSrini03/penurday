// app/page.js
"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowLeft, Search, Plus, Heart, MessageSquare, Repeat, Send, MoreVertical, Home, User, Bell, Bookmark, Settings, LogOut } from "lucide-react";
import StarfieldBackground from "@/components/StarfieldBackground";
import NebulaEffects from "@/components/NebulaEffects";
import { motion, AnimatePresence } from "framer-motion";

export default function HomePage() {
  const [darkMode, setDarkMode] = useState(false);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeTab, setActiveTab] = useState("forYou");
  const [showSidebar, setShowSidebar] = useState(false);
  const modalRef = useRef(null);


const handleLogout = () => {
  localStorage.removeItem("token");
  window.location.reload(); // reloads the current page
};




  // Mock data for posts
  useEffect(() => {
    const mockPosts = [
      {
        id: 1,
        username: "space_explorer",
        name: "Csc Voyager",
        content: "Just witnessed the most incredible nebula formation through my telescope last night. The universe never ceases to amaze!",
        timestamp: "2h ago",
        likes: 22,
        replies: 8,
        reposts: 3,
        avatar: "🌌",
      },
      {
        id: 2,
        username: "astro_tech",
        name: "Astro Tech",
        content: "New telescope technology allows us to see deeper into space than ever before. Can't wait to share our findings at the conference next month!",
        timestamp: "5h ago",
        likes: 128,
        replies: 24,
        reposts: 17,
        avatar: "🔭",
      },
      {
        id: 3,
        username: "galaxy_guru",
        name: "Galaxy Guru",
        content: "Did you know that there are more stars in the universe than grains of sand on all Earth's beaches? Mind-blowing cosmic facts!",
        timestamp: "8h ago",
        likes: 312,
        replies: 45,
        reposts: 29,
        avatar: "🌠",
      },
      {
        id: 4,
        username: "quantum_observer",
        name: "Quantum Observer",
        content: "Theoretical physics meets practical astronomy in our latest research. Paper coming soon!",
        timestamp: "12h ago",
        likes: 87,
        replies: 12,
        reposts: 5,
        avatar: "⚛️",
      },
      {
        id: 5,
        username: "starlight_writer",
        name: "Starlight Writer",
        content: "Writing my next novel under the stars tonight. There's something magical about the cosmos that sparks creativity.",
        timestamp: "1d ago",
        likes: 204,
        replies: 31,
        reposts: 18,
        avatar: "📖",
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
  const handleSubmitPost = (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    setIsPosting(true);

    // Simulate API call
    setTimeout(() => {
      const newPostObj = {
        id: posts.length + 1,
        username: "current_user",
        name: "Cosmic Explorer",
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
  const handleLike = (id) => {
    setPosts(posts.map(post =>
      post.id === id ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setShowCreateModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={`relative min-h-screen flex flex-col overflow-hidden transition-colors duration-500 ${darkMode
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
      <header className={`sticky top-0 z-30 py-3 px-4 backdrop-blur-lg border-b transition-colors duration-300 ${darkMode ? "bg-[#0d0a1f]/80 border-[#3a2a7c]" : "bg-white/95 border-[#eae6fc]"
        }`}>
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h1 className={`text-xl font-bold ${darkMode ? "text-[#c0b3e5]" : "text-[#5c3aff]"
              }`}>Penurday</h1>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowCreateModal(true)}
              className={`p-2 rounded-full transition-colors duration-300 ${darkMode
                  ? "bg-[#3a2a7c] hover:bg-[#4a3a9c] text-yellow-300"
                  : "bg-[#f0ecfe] hover:bg-[#e5dfff] text-[#5c3aff]"
                }`}
              aria-label="Create new thread"
            >
              <Plus size={20} />
            </button>

            <button
              onClick={() => setDarkMode(!darkMode)}
              aria-label="Toggle dark mode"
              className={`p-2 rounded-full transition-colors duration-300 ${darkMode
                  ? "bg-[#3a2a7c] hover:bg-[#4a3a9c] text-yellow-300"
                  : "bg-[#f0ecfe] hover:bg-[#e5dfff] text-[#5c3aff]"
                }`}
            >
              {darkMode ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                  className="animate-pulse"
                >
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                  className="animate-pulse"
                >
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2" />
                  <path d="M12 20v2" />
                  <path d="m4.93 4.93 1.41 1.41" />
                  <path d="m17.66 17.66 1.41 1.41" />
                  <path d="M2 12h2" />
                  <path d="M20 12h2" />
                  <path d="m6.34 17.66-1.41 1.41" />
                  <path d="m19.07 4.93-1.41 1.41" />
                </svg>
              )}
            </button>

            <button
              onClick={() => setShowSidebar(true)}
              className={`p-1.5 rounded-full transition-colors duration-300 ${darkMode
                  ? "bg-[#3a2a7c] hover:bg-[#4a3a9c]"
                  : "bg-[#f0ecfe] hover:bg-[#e5dfff]"
                }`}
              aria-label="Open menu"
            >
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#5c3aff] to-[#2b97b8] flex items-center justify-center text-white text-sm font-bold">
                C
              </div>
            </button>
          </div>
        </div>
      </header>

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
              C
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
            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#5c3aff] to-[#2b97b8]"></div>
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
                    C
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
      <AnimatePresence>
        {showSidebar && (
          <div className="fixed inset-0 z-50">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setShowSidebar(false)}
            ></div>

            {/* Sidebar Content */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={`absolute top-0 right-0 w-4/5 max-w-sm h-full p-6 shadow-2xl transition-colors duration-300 ${darkMode ? "bg-[#0d0a1f]" : "bg-white"
                }`}
            >
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#5c3aff] to-[#2b97b8] flex items-center justify-center text-white text-xl font-bold">
                    C
                  </div>
                  <div>
                    <h3 className="font-bold">Cosmic Explorer</h3>
                    <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                      @current_user
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowSidebar(false)}
                  className={`p-1 rounded-full ${darkMode ? "hover:bg-[#2a1e5c]" : "hover:bg-[#f0ecfe]"
                    }`}
                >
                  <ArrowLeft size={24} />
                </button>
              </div>

              <nav className="space-y-2 mb-8">
                <a href="#" className={`flex items-center gap-3 p-3 rounded-xl transition-colors duration-300 ${darkMode ? "hover:bg-[#2a1e5c]" : "hover:bg-[#f0ecfe]"
                  }`}>
                  <User size={20} />
                  <span>Profile</span>
                </a>
                <a href="#" className={`flex items-center gap-3 p-3 rounded-xl transition-colors duration-300 ${darkMode ? "hover:bg-[#2a1e5c]" : "hover:bg-[#f0ecfe]"
                  }`}>
                  <Bookmark size={20} />
                  <span>Saved Threads</span>
                </a>
                <a href="#" className={`flex items-center gap-3 p-3 rounded-xl transition-colors duration-300 ${darkMode ? "hover:bg-[#2a1e5c]" : "hover:bg-[#f0ecfe]"
                  }`}>
                  <Settings size={20} />
                  <span>Settings</span>
                </a>
              </nav>

              <div className={`p-4 rounded-xl mb-8 ${darkMode ? "bg-[#1a1538]" : "bg-[#f0ecfe]"
                }`}>
                <h4 className="font-bold mb-3">Suggested Accounts</h4>
                <div className="space-y-4">
                  {['space_enthusiast', 'astro_photographer', 'cosmic_wanderer'].map((user, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#5c3aff] to-[#2b97b8] flex items-center justify-center text-white text-xs">
                          {user.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium">{user}</p>
                        </div>
                      </div>
                      <button className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-300 ${darkMode
                          ? "bg-[#3a2a7c] hover:bg-[#4a3a9c]"
                          : "bg-[#5c3aff] text-white"
                        }`}>
                        Follow
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={handleLogout}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors duration-300 ${darkMode ? "hover:bg-[#2a1e5c]" : "hover:bg-[#f0ecfe]"
                  }`}
              >
                <LogOut size={20} />
                <span>Log Out</span>
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}