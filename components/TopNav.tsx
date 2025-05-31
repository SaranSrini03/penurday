"use client";

import { Plus } from "lucide-react";
import React from "react";
import UserDetails from "@/components/UserDetails";

interface TopNavProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  setShowCreateModal: (value: boolean) => void;
  setShowSidebar: (value: boolean) => void;
}

export default function TopNav({
  darkMode,
  setDarkMode,
  setShowCreateModal,
  setShowSidebar,
}: TopNavProps) {
  const initial = <UserDetails detail="username" format="initial" />
  
  return (
    <header
      className={`sticky top-0 z-30 py-3 px-4 backdrop-blur-lg border-b transition-colors duration-300 ${
        darkMode
          ? "bg-[#0d0a1f]/80 border-[#3a2a7c]"
          : "bg-white/95 border-[#eae6fc]"
      }`}
    >

      <div className="max-w-4xl mx-auto flex justify-between items-center">
        {/* Logo / Title */}
        <div className="flex items-center gap-2">
          <h1
            className={`text-xl font-bold ${
              darkMode ? "text-[#c0b3e5]" : "text-[#5c3aff]"
            }`}
          >
            Penurday
          </h1>
        </div>

        {/* Right-side buttons */}
        <div className="flex items-center gap-4">
          {/* Create Thread */}
          <button
            onClick={() => setShowCreateModal(true)}
            className={`p-2 rounded-full transition-colors duration-300 ${
              darkMode
                ? "bg-[#3a2a7c] hover:bg-[#4a3a9c] text-yellow-300"
                : "bg-[#f0ecfe] hover:bg-[#e5dfff] text-[#5c3aff]"
            }`}
            aria-label="Create new thread"
          >
            <Plus size={20} />
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle dark mode"
            className={`p-2 rounded-full transition-colors duration-300 ${
              darkMode
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

          {/* Sidebar Toggle */}
          <button
            onClick={() => setShowSidebar(true)}
            className={`p-1.5 rounded-full transition-colors duration-300 ${
              darkMode
                ? "bg-[#3a2a7c] hover:bg-[#4a3a9c]"
                : "bg-[#f0ecfe] hover:bg-[#e5dfff]"
            }`}
            aria-label="Open menu"
          >
            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#5c3aff] to-[#2b97b8] flex items-center justify-center text-white text-sm font-bold">
              {initial}
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
