"use client";
import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import { useState, useEffect} from "react";
import StarfieldBackground from "@/components/StarfieldBackground";
import NebulaEffects from "@/components/NebulaEffects";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setDarkMode(true);
      }
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="flex flex-col">
      {/* Hero Section - Full Viewport with Space Effect */}
      <div
        className={`relative h-screen flex items-center justify-center overflow-hidden ${
          darkMode
            ? "bg-gradient-to-br from-[#000000] to-[#0a0a2a] text-gray-200"
            : "bg-gradient-to-br from-[#faf8f5] to-[#f0ecfe] text-[#1e1e1e]"
        }`}
      >
        <StarfieldBackground  />
        <NebulaEffects />

        {/* Dark mode toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`absolute top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 rounded-full p-2 sm:p-3 transition-all ${
            darkMode
              ? "bg-[#3a2a7c] hover:bg-[#4a3a9c] text-yellow-300"
              : "bg-[#f0ecfe] hover:bg-[#e5dfff] text-[#5c3aff]"
          } shadow-lg z-10`}
          aria-label="Toggle dark mode"
        >
          {darkMode ? <Moon size={16} className="sm:w-5" /> : <Sun size={16} className="sm:w-5" />}
        </button>

        {/* Hero content */}
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 py-8 sm:py-12 md:py-16 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 sm:gap-12 lg:gap-16">
            <div className="text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                Welcome to{" "}
                <span className="bg-gradient-to-r from-[#8c70cc] to-[#2b97b8] bg-clip-text text-transparent">
                  Penurday.
                </span>
              </h1>

              <p
                className={`text-sm sm:text-base md:text-lg mt-4 sm:mt-6 max-w-xl mx-auto lg:mx-0 ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Doesn&apos;t matter if it&apos;s Thursday or Monday — every day is Penurday. Share raw, real thoughts. A notepad, but social. For the days that feel too real to filter.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8 justify-center lg:justify-start">
                <Link href="/signup" className="w-full sm:w-auto">
                  <button
                    className={`w-full rounded-full cursor-pointer text-sm sm:text-base md:text-lg font-medium px-6 py-2 sm:px-8 sm:py-3 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 ${
                      darkMode
                        ? "bg-gradient-to-r from-[#8c70cc] to-[#2b97b8] hover:from-[#7a60b8] hover:to-[#2587a8] text-white"
                        : "bg-[#5c3aff] hover:bg-[#4b2fd9] text-white"
                    }`}
                  >
                    Get Started
                  </button>
                </Link>
                <Link href="/login" className="w-full sm:w-auto">
                  <button
                    className={`w-full rounded-full cursor-pointer border-2 text-sm sm:text-base md:text-lg font-medium px-6 py-2 sm:px-8 sm:py-3 transition-colors ${
                      darkMode
                        ? "border-[#8c70cc] text-[#c0b3e5] hover:bg-[#1f1a3d]"
                        : "border-[#5c3aff] text-[#5c3aff] hover:bg-[#f4f0ff]"
                    }`}
                  >
                    Log In
                  </button>
                </Link>
              </div>

              <div className="mt-8 sm:mt-10 flex flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-white animate-pulse"></div>
                  <span className="text-xs sm:text-sm">Post your thoughts</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-white animate-pulse"></div>
                  <span className="text-xs sm:text-sm">See what others are scribbling</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-white animate-pulse"></div>
                  <span className="text-xs sm:text-sm">No filters, no pressure</span>
                </div>
              </div>
            </div>

            {/* Screenshot container - hidden on mobile, shown on desktop */}
            <div className="hidden lg:flex justify-center">
              <div className="relative w-full max-w-md sm:max-w-lg aspect-square">
                {/* Original screenshot placeholder */}
                <div
                  className={`absolute inset-0 rounded-3xl ${
                    darkMode ? "bg-[#3a2a7c]/30" : "bg-[#5c3aff]/10"
                  } rotate-6`}
                ></div>
                <div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${
                    darkMode
                      ? "from-[#3a2a7c]/20 to-[#2b97b8]/30"
                      : "from-[#5c3aff]/5 to-[#8a6cff]/20"
                  } -rotate-3`}
                ></div>
                <div
                  className={`relative rounded-3xl overflow-hidden border-4 shadow-xl ${
                    darkMode ? "border-[#1f1a3d]" : "border-white"
                  }`}
                >
                  <div
                    className={`${
                      darkMode
                        ? "bg-[#1a1538] border-[#3a2a7c]"
                        : "bg-gray-100 border-gray-300"
                    } border-2 border-dashed rounded-xl w-full h-full aspect-square flex items-center justify-center`}
                  >
                    <div className={`text-center p-4 ${darkMode ? "text-[#c0b3e5]" : "text-gray-500"}`}>
                      <div className="mb-2 text-sm">Penurday Screenshot</div>
                      <div className="flex gap-1 justify-center">
                        {[...Array(4)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full ${
                              darkMode ? "bg-[#8c70cc]" : "bg-[#5c3aff]"
                            }`}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
