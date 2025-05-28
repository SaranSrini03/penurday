"use client";
import Image from "next/image";
import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setDarkMode(true);
      }
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="flex flex-col">
      {/* Hero Section - Full Viewport */}
      <div className={`relative h-screen flex items-center justify-center overflow-hidden ${
        darkMode 
          ? "bg-gradient-to-br from-[#0f0c29] to-[#302b63] text-gray-200" 
          : "bg-gradient-to-br from-[#faf8f5] to-[#f0ecfe] text-[#1e1e1e]"
      }`}>
        {/* Dark mode toggle */}
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className={`absolute top-6 right-6 sm:top-8 sm:right-8 rounded-full p-3 transition-all ${
            darkMode 
              ? "bg-[#3a2a7c] hover:bg-[#4a3a9c] text-yellow-300" 
              : "bg-[#f0ecfe] hover:bg-[#e5dfff] text-[#5c3aff]"
          } shadow-lg z-10`}
          aria-label="Toggle dark mode"
        >
          {darkMode ? <Moon size={20} /> : <Sun size={20} />}
        </button>
        
        {/* Floating background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <div 
              key={i}
              className={`absolute rounded-full ${
                darkMode ? "bg-[#3a2a7c]/20" : "bg-[#5c3aff]/10"
              }`}
              style={{
                width: `${Math.random() * 200 + 50}px`,
                height: `${Math.random() * 200 + 50}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 20 + 10}s infinite ease-in-out`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>
        
        {/* Hero content */}
        <div className="container mx-auto px-6 sm:px-12 lg:px-24 py-16 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-16">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight">
                Welcome to <span className="bg-gradient-to-r from-[#8c70cc] to-[#2b97b8] bg-clip-text text-transparent">
                  Penurday.
                </span>
              </h1>

              <p className={`text-base sm:text-lg mt-6 max-w-xl mx-auto lg:mx-0 ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}>
                Doesn't matter if it's Thursday or Monday — every day is Penurday.
                Share raw, real thoughts. A notepad, but social. For the days that feel too real to filter.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center lg:justify-start">
                <Link href="/signup">
                  <button className={`rounded-full  cursor-pointer text-base sm:text-lg font-medium px-8 py-3 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 ${
                    darkMode 
                      ? "bg-gradient-to-r from-[#8c70cc] to-[#2b97b8] hover:from-[#7a60b8] hover:to-[#2587a8] text-white" 
                      : "bg-[#5c3aff] hover:bg-[#4b2fd9] text-white"
                  }`}>
                    Get Started
                  </button>
                </Link>
                <Link href="/login">
                  <button className={`rounded-full cursor-pointer border-2 text-base sm:text-lg font-medium px-8 py-3 transition-colors ${
                    darkMode 
                      ? "border-[#8c70cc] text-[#c0b3e5] hover:bg-[#1f1a3d]" 
                      : "border-[#5c3aff] text-[#5c3aff] hover:bg-[#f4f0ff]"
                  }`}>
                    Log In
                  </button>
                </Link>
              </div>

              <div className="mt-10 flex flex-wrap gap-4 justify-center lg:justify-start">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-pink-400 animate-pulse"></div>
                  <span className="text-sm">Post your thoughts</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse"></div>
                  <span className="text-sm">See what others are scribbling</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
                  <span className="text-sm">No filters, no pressure</span>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="relative w-full max-w-lg aspect-square">
                <div className={`absolute inset-0 rounded-3xl ${
                  darkMode ? "bg-[#3a2a7c]/30" : "bg-[#5c3aff]/10"
                } rotate-6`}></div>
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${
                  darkMode 
                    ? "from-[#3a2a7c]/20 to-[#2b97b8]/30" 
                    : "from-[#5c3aff]/5 to-[#8a6cff]/20"
                } -rotate-3`}></div>
                <div className={`relative rounded-3xl overflow-hidden border-4 shadow-xl ${
                  darkMode ? "border-[#1f1a3d]" : "border-white"
                }`}>
                  <div className={`${
                    darkMode 
                      ? "bg-[#1a1538] border-[#3a2a7c]" 
                      : "bg-gray-100 border-gray-300"
                  } border-2 border-dashed rounded-xl w-full h-full aspect-square flex items-center justify-center`}>
                    <div className={`text-center p-4 ${
                      darkMode ? "text-[#c0b3e5]" : "text-gray-500"
                    }`}>
                      <div className="mb-2 text-sm">Penurday Screenshot</div>
                      <div className="flex gap-1 justify-center">
                        {[...Array(4)].map((_, i) => (
                          <div key={i} className={`w-2 h-2 rounded-full ${
                            darkMode ? "bg-[#8c70cc]" : "bg-[#5c3aff]"
                          }`}></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className={`w-8 h-12 rounded-full border-2 flex justify-center ${
            darkMode ? "border-[#c0b3e5]" : "border-[#5c3aff]"
          }`}>
            <div className={`w-2 h-2 rounded-full mt-2 ${
              darkMode ? "bg-[#c0b3e5]" : "bg-[#5c3aff]"
            }`}></div>
          </div>
        </div>
      </div>

      {/* Scrollable content below hero */}
      <div className={`transition-colors duration-300 ${darkMode ? "dark bg-[#0d0a1f] text-gray-200" : "bg-white text-[#1e1e1e]"}`}>
        {/* Features Section */}
        <div className={`py-16 px-6 sm:px-12 lg:px-24 ${
          darkMode ? "bg-[#0d0a1f]" : "bg-white"
        }`}>
          <div className="max-w-6xl mx-auto">
            <h2 className={`text-3xl md:text-4xl font-bold text-center mb-16 ${
              darkMode ? "text-[#c0b3e5]" : "text-[#1e1e1e]"
            }`}>
              What Makes Penurday Different?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                {
                  title: "Authentic Notes",
                  desc: "Pen down your unfiltered thoughts and share what truly matters to you.",
                  icon: darkMode ? "📝" : "✍️"
                },
                {
                  title: "People-First Feed",
                  desc: "No likes, no clout — just a calm space to read and reflect.",
                  icon: darkMode ? "👥" : "👁️"
                },
                {
                  title: "Daily Flow",
                  desc: "Make jotting down thoughts a habit. One small note, every day.",
                  icon: darkMode ? "🔄" : "📅"
                },
              ].map((feature, index) => (
                <div 
                  key={index} 
                  className={`p-8 rounded-3xl text-center border transition-all duration-300 hover:scale-[1.03] ${
                    darkMode 
                      ? "bg-[#1a1538] border-[#3a2a7c] hover:border-[#8c70cc] hover:shadow-[0_0_30px_rgba(140,112,204,0.2)]" 
                      : "bg-[#faf8f5] border-[#f0ecfe] hover:border-[#5c3aff] hover:shadow-[0_0_30px_rgba(92,58,255,0.1)]"
                  }`}
                >
                  <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center text-3xl ${
                    darkMode ? "bg-[#3a2a7c]/40" : "bg-[#f0ecfe]"
                  }`}>
                    {feature.icon}
                  </div>
                  <h3 className={`text-xl font-semibold mb-3 ${
                    darkMode ? "text-[#c0b3e5]" : "text-[#1e1e1e]"
                  }`}>
                    {feature.title}
                  </h3>
                  <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonial Section */}
        <div className={`py-16 px-6 sm:px-12 lg:px-24 ${
          darkMode ? "bg-gradient-to-r from-[#0f0c29]/50 to-[#302b63]/50" : "bg-gradient-to-r from-[#faf8f5] to-[#f0ecfe]"
        }`}>
          <div className="max-w-4xl mx-auto text-center">
            <div className={`text-5xl mb-8 ${darkMode ? "text-[#c0b3e5]" : "text-[#5c3aff]"}`}>❝</div>
            <p className={`text-xl md:text-2xl italic max-w-3xl mx-auto leading-relaxed ${
              darkMode ? "text-gray-200" : "text-gray-600"
            }`}>
              Penurday helped me embrace my authentic voice. It's the only place online where I feel comfortable sharing my raw, unfiltered thoughts without worrying about likes or appearances.
            </p>
            <div className={`mt-8 text-lg ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              — Alex T., Writer & Daily User
            </div>
            
            <div className="mt-16 flex flex-wrap justify-center gap-6">
              {[...Array(3)].map((_, i) => (
                <div 
                  key={i}
                  className={`w-16 h-16 rounded-full overflow-hidden ${
                    darkMode ? "border-2 border-[#3a2a7c]" : "border-2 border-[#f0ecfe]"
                  }`}
                >
                  <div className={`w-full h-full ${
                    darkMode ? "bg-[#3a2a7c]" : "bg-[#f0ecfe]"
                  }`}></div>
                </div>
              ))}
              <div className="flex items-center">
                <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                  Join 5k+ authentic users
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className={`py-16 px-6 sm:px-12 lg:px-24 ${
          darkMode ? "bg-[#0d0a1f]" : "bg-white"
        }`}>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${
              darkMode ? "text-[#c0b3e5]" : "text-[#1e1e1e]"
            }`}>
              Ready to share your thoughts?
            </h2>
            <p className={`text-lg max-w-2xl mx-auto mb-10 ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}>
              Join our community of authentic thinkers and start your daily journaling habit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <button className={`rounded-full text-base sm:text-lg font-medium px-8 py-3 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 ${
                  darkMode 
                    ? "bg-gradient-to-r from-[#8c70cc] to-[#2b97b8] hover:from-[#7a60b8] hover:to-[#2587a8] text-white" 
                    : "bg-[#5c3aff] hover:bg-[#4b2fd9] text-white"
                }`}>
                  Create Account
                </button>
              </Link>
              <Link href="/about">
                <button className={`rounded-full border-2 text-base sm:text-lg font-medium px-8 py-3 transition-colors ${
                  darkMode 
                    ? "border-[#8c70cc] text-[#c0b3e5] hover:bg-[#1f1a3d]" 
                    : "border-[#5c3aff] text-[#5c3aff] hover:bg-[#f4f0ff]"
                }`}>
                  Learn More
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className={`py-12 px-6 sm:px-12 lg:px-24 border-t ${
          darkMode ? "border-[#3a2a7c]" : "border-[#eae6fc]"
        }`}>
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-lg ${
                  darkMode ? "bg-gradient-to-r from-[#8c70cc] to-[#2b97b8]" : "bg-[#5c3aff]"
                }`}></div>
                <span className={`font-bold text-xl ${
                  darkMode ? "text-[#c0b3e5]" : "text-[#1e1e1e]"
                }`}>
                  Penurday
                </span>
              </div>
              <p className={`text-sm max-w-xs ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}>
                A social notepad for authentic thoughts. No filters, no pressure.
              </p>
            </div>
            
            <div>
              <h3 className={`font-semibold mb-4 ${
                darkMode ? "text-[#c0b3e5]" : "text-[#1e1e1e]"
              }`}>Product</h3>
              <ul className="space-y-2">
                {['Features', 'Use Cases', 'Pricing', 'Roadmap'].map((item, i) => (
                  <li key={i}>
                    <Link href="#" className={`text-sm transition-colors ${
                      darkMode ? "text-gray-400 hover:text-[#c0b3e5]" : "text-gray-500 hover:text-[#5c3aff]"
                    }`}>
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className={`font-semibold mb-4 ${
                darkMode ? "text-[#c0b3e5]" : "text-[#1e1e1e]"
              }`}>Resources</h3>
              <ul className="space-y-2">
                {['Blog', 'Community', 'Help Center', 'Tutorials'].map((item, i) => (
                  <li key={i}>
                    <Link href="#" className={`text-sm transition-colors ${
                      darkMode ? "text-gray-400 hover:text-[#c0b3e5]" : "text-gray-500 hover:text-[#5c3aff]"
                    }`}>
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className={`font-semibold mb-4 ${
                darkMode ? "text-[#c0b3e5]" : "text-[#1e1e1e]"
              }`}>Legal</h3>
              <ul className="space-y-2">
                {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item, i) => (
                  <li key={i}>
                    <Link href="#" className={`text-sm transition-colors ${
                      darkMode ? "text-gray-400 hover:text-[#c0b3e5]" : "text-gray-500 hover:text-[#5c3aff]"
                    }`}>
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className={`mt-12 pt-8 border-t text-center text-sm ${
            darkMode ? "border-[#3a2a7c] text-gray-500" : "border-[#eae6fc] text-gray-400"
          }`}>
            © {new Date().getFullYear()} Penurday. All rights reserved.
          </div>
        </footer>
      </div>
      
      {/* Global styles for animations */}
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) translateX(10px) rotate(5deg);
          }
          100% {
            transform: translateY(0) translateX(0) rotate(0deg);
          }
        }
      `}</style>
    </div>
  );
}