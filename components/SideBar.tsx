"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Bookmark, LogOut, Settings, User } from "lucide-react";
import React from "react";
import UserDetails from "@/components/UserDetails"; // Adjust the import path as needed
import Link from "next/link";
import { useAuth } from "@/lib/useAuth";
import { useUser } from "@/context/UserContext";




interface SidebarProps {
    showSidebar: boolean;
    setShowSidebar: (value: boolean) => void;
    darkMode: boolean;
    initial: string;
    handleLogout: () => void;
}

export default function Sidebar({
    showSidebar,
    setShowSidebar,
    darkMode,
    initial,
    handleLogout,
}: SidebarProps) {
    const { user, loading } = useUser();
    if (loading) return <p>Loading...</p>;

    if (!user) return <p>Not logged in</p>;
    console.log("user :",user.username)

    return (
        <AnimatePresence>
            {showSidebar && (
                <div className="fixed inset-0 z-50">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setShowSidebar(false)}
                    ></div>

                    {/* Sidebar */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className={`absolute top-0 right-0 w-4/5 max-w-sm h-full p-6 shadow-2xl transition-colors duration-300 ${darkMode ? "bg-[#0d0a1f]" : "bg-white"
                            }`}
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center mb-8">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#5c3aff] to-[#2b97b8] flex items-center justify-center text-white text-xl font-bold">
                                    {initial}
                                </div>
                                <div>
                                    <h3 className="font-bold">
                                        <UserDetails detail="name" />
                                    </h3>
                                    <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                        @<UserDetails detail="username" />
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
                            {[
                                { label: "Profile", icon: <User size={20} />, href: user?.username ? `/@${user.username}` : "#" },

                                { label: "Saved Threads", icon: <Bookmark size={20} />, href: "#" },
                                { label: "Settings", icon: <Settings size={20} />, href: "#" },
                            ].map((item, idx) => (
                                <Link
                                    key={idx}
                                    href={item.href}
                                    className={`flex items-center gap-3 p-3 rounded-xl transition-colors duration-300 ${darkMode ? "hover:bg-[#2a1e5c]" : "hover:bg-[#f0ecfe]"
                                        }`}
                                >
                                    {item.icon}
                                    <span>{item.label}</span>
                                </Link>
                            ))}
                        </nav>


                        {/* Suggested Accounts */}
                        <div
                            className={`p-4 rounded-xl mb-8 ${darkMode ? "bg-[#1a1538]" : "bg-[#f0ecfe]"
                                }`}
                        >
                            <h4 className="font-bold mb-3">Suggested Accounts</h4>
                            <div className="space-y-4">
                                {["space_enthusiast", "astro_photographer", "cosmic_wanderer"].map(
                                    (user, index) => (
                                        <div key={index} className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#5c3aff] to-[#2b97b8] flex items-center justify-center text-white text-xs">
                                                    {user.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-medium">{user}</p>
                                                </div>
                                            </div>
                                            <button
                                                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-300 ${darkMode
                                                    ? "bg-[#3a2a7c] hover:bg-[#4a3a9c]"
                                                    : "bg-[#5c3aff] text-white"
                                                    }`}
                                            >
                                                Follow
                                            </button>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>

                        {/* Logout */}
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
    );
}
