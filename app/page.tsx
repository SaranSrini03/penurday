"use client";
import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const canvasRef = useRef(null);

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

    // Initialize starfield
    if (darkMode && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Create stars
      const stars = [];
      const starCount = 200;

      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5,
          speed: Math.random() * 0.5,
          opacity: Math.random() * 0.8 + 0.2
        });
      }

      // Create galaxies
      const galaxies = [];
      const galaxyCount = 3;

      for (let i = 0; i < galaxyCount; i++) {
        galaxies.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 100 + 50,
          color: `hsl(${Math.random() * 60 + 240}, 70%, 30%)`,
          opacity: Math.random() * 0.2 + 0.1
        });
      }

      // Animation function
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw galaxies
        galaxies.forEach(galaxy => {
          ctx.beginPath();
          const gradient = ctx.createRadialGradient(
            galaxy.x, galaxy.y, 0,
            galaxy.x, galaxy.y, galaxy.radius
          );
          gradient.addColorStop(0, `hsla(240, 70%, 50%, ${galaxy.opacity})`);
          gradient.addColorStop(1, `hsla(240, 70%, 30%, 0)`);
          ctx.fillStyle = gradient;
          ctx.arc(galaxy.x, galaxy.y, galaxy.radius, 0, Math.PI * 2);
          ctx.fill();
        });

        // Draw stars
        stars.forEach(star => {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
          ctx.fill();

          // Move stars
          star.x -= star.speed;
          if (star.x < 0) {
            star.x = canvas.width;
            star.y = Math.random() * canvas.height;
          }
        });

        requestAnimationFrame(animate);
      };

      animate();

      // Handle resize
      const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [darkMode]);

  return (
    <div className="flex flex-col">
      {/* Hero Section - Full Viewport with Space Effect */}
      <div className={`relative h-screen flex items-center justify-center overflow-hidden ${darkMode
          ? "bg-gradient-to-br from-[#000000] to-[#0a0a2a] text-gray-200"
          : "bg-gradient-to-br from-[#faf8f5] to-[#f0ecfe] text-[#1e1e1e]"
        }`}>
        {/* Starfield Canvas */}
        {darkMode && (
          <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0 pointer-events-none will-change-transform"
          />
        )}

        {/* Nebula Effects */}
        {darkMode && (
          <>
            <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-gradient-to-r from-[#3a2a7c] to-[#2b97b8] opacity-20 blur-[100px] max-sm:hidden"></div>
            <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-[#8c70cc] to-[#2b97b8] opacity-15 blur-[100px] max-sm:hidden"></div>
          </>
        )}

        {/* Dark mode toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`absolute top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 rounded-full p-2 sm:p-3 transition-all ${darkMode
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
            <div className="text-center lg:text-left order-2 lg:order-1">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                Welcome to <span className="bg-gradient-to-r from-[#8c70cc] to-[#2b97b8] bg-clip-text text-transparent">
                  Penurday.
                </span>
              </h1>

              <p className={`text-sm sm:text-base md:text-lg mt-4 sm:mt-6 max-w-xl mx-auto lg:mx-0 ${darkMode ? "text-gray-300" : "text-gray-600"
                }`}>
                Doesn't matter if it's Thursday or Monday — every day is Penurday.
                Share raw, real thoughts. A notepad, but social. For the days that feel too real to filter.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8 justify-center lg:justify-start">
                <Link href="/signup" className="w-full sm:w-auto">
                  <button className={`w-full rounded-full cursor-pointer text-sm sm:text-base md:text-lg font-medium px-6 py-2 sm:px-8 sm:py-3 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 ${darkMode
                      ? "bg-gradient-to-r from-[#8c70cc] to-[#2b97b8] hover:from-[#7a60b8] hover:to-[#2587a8] text-white"
                      : "bg-[#5c3aff] hover:bg-[#4b2fd9] text-white"
                    }`}>
                    Get Started
                  </button>
                </Link>
                <Link href="/login" className="w-full sm:w-auto">
                  <button className={`w-full rounded-full cursor-pointer border-2 text-sm sm:text-base md:text-lg font-medium px-6 py-2 sm:px-8 sm:py-3 transition-colors ${darkMode
                      ? "border-[#8c70cc] text-[#c0b3e5] hover:bg-[#1f1a3d]"
                      : "border-[#5c3aff] text-[#5c3aff] hover:bg-[#f4f0ff]"
                    }`}>
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

            <div className="flex justify-center order-1 lg:order-2">
              <div className="relative w-full max-w-md sm:max-w-lg aspect-square">
                {/* Original screenshot placeholder */}
                <div className={`absolute inset-0 rounded-3xl ${darkMode ? "bg-[#3a2a7c]/30" : "bg-[#5c3aff]/10"
                  } rotate-6`}></div>
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${darkMode
                    ? "from-[#3a2a7c]/20 to-[#2b97b8]/30"
                    : "from-[#5c3aff]/5 to-[#8a6cff]/20"
                  } -rotate-3`}></div>
                <div className={`relative rounded-3xl overflow-hidden border-4 shadow-xl ${darkMode ? "border-[#1f1a3d]" : "border-white"
                  }`}>
                  <div className={`${darkMode
                      ? "bg-[#1a1538] border-[#3a2a7c]"
                      : "bg-gray-100 border-gray-300"
                    } border-2 border-dashed rounded-xl w-full h-full aspect-square flex items-center justify-center`}>
                    <div className={`text-center p-4 ${darkMode ? "text-[#c0b3e5]" : "text-gray-500"
                      }`}>
                      <div className="mb-2 text-xs sm:text-sm">Penurday Screenshot</div>
                      <div className="flex gap-1 justify-center">
                        {[...Array(4)].map((_, i) => (
                          <div key={i} className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${darkMode ? "bg-[#8c70cc]" : "bg-[#5c3aff]"
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
        {/* <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
          <div className={`w-6 h-10 sm:w-8 sm:h-12 rounded-full border-2 flex justify-center ${darkMode ? "border-[#c0b3e5]" : "border-[#5c3aff]"
            }`}>
            <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full mt-2 ${darkMode ? "bg-[#c0b3e5]" : "bg-[#5c3aff]"
              }`}></div>
          </div>
        </div> */}
      </div>

      {/* Scrollable content below hero */}
      <div className={`transition-colors duration-300 ${darkMode ? "dark bg-[#0d0a1f] text-gray-200" : "bg-white text-[#1e1e1e]"}`}>
        {/* Features Section with Space Theme */}
        <div className={`py-12 sm:py-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 ${darkMode ? "bg-[#0d0a1f]" : "bg-white"
          }`}>
          <div className="max-w-6xl mx-auto">
            <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 md:mb-16 ${darkMode ? "text-[#c0b3e5]" : "text-[#1e1e1e]"
              }`}>
              Explore the Penurday Universe
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  title: "Celestial Notes",
                  desc: "Pen down your unfiltered thoughts like stars in the night sky.",
                  icon: "🌌"
                },
                {
                  title: "Galactic Feed",
                  desc: "Navigate through thoughts like constellations in space.",
                  icon: "🪐"
                },
                {
                  title: "Orbit Journal",
                  desc: "Maintain your daily orbit of thoughts and reflections.",
                  icon: "🚀"
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className={`p-6 sm:p-8 rounded-2xl sm:rounded-3xl text-center border transition-all duration-300 hover:scale-[1.03] ${darkMode
                      ? "bg-[#1a1538] border-[#3a2a7c] hover:border-[#8c70cc] hover:shadow-[0_0_20px_rgba(140,112,204,0.2)]"
                      : "bg-[#faf8f5] border-[#f0ecfe] hover:border-[#5c3aff] hover:shadow-[0_0_20px_rgba(92,58,255,0.1)]"
                    }`}
                >
                  <div className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-full flex items-center justify-center text-3xl sm:text-4xl ${darkMode ? "bg-[#3a2a7c]/40" : "bg-[#f0ecfe]"
                    }`}>
                    {feature.icon}
                  </div>
                  <h3 className={`text-lg sm:text-xl font-semibold mb-2 sm:mb-3 ${darkMode ? "text-[#c0b3e5]" : "text-[#1e1e1e]"
                    }`}>
                    {feature.title}
                  </h3>
                  <p className={`text-sm sm:text-base ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonial Section */}
        <div className={`py-12 sm:py-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 ${darkMode ? "bg-gradient-to-r from-[#0f0c29]/50 to-[#302b63]/50" : "bg-gradient-to-r from-[#faf8f5] to-[#f0ecfe]"
          }`}>
          <div className="max-w-4xl mx-auto text-center relative">
            {/* Space elements */}
            {darkMode && (
              <>
                <div className="absolute top-6 left-6 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#8c70cc] opacity-30 blur-md max-sm:hidden"></div>
                <div className="absolute bottom-6 right-6 w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-[#2b97b8] opacity-30 blur-md max-sm:hidden"></div>
              </>
            )}

            <div className={`text-4xl sm:text-5xl mb-6 sm:mb-8 ${darkMode ? "text-[#c0b3e5]" : "text-[#5c3aff]"}`}>❝</div>
            <p className={`text-base sm:text-lg md:text-xl italic max-w-3xl mx-auto leading-relaxed ${darkMode ? "text-gray-200" : "text-gray-600"
              }`}>
              Penurday helped me embrace my authentic voice. It's the only place online where I feel comfortable sharing my raw, unfiltered thoughts without worrying about likes or appearances.
            </p>
            <div className={`mt-6 text-sm sm:text-base ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              — Alex T., Writer & Daily User
            </div>

            <div className="mt-12 sm:mt-16 flex flex-wrap justify-center gap-4 sm:gap-6">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden ${darkMode ? "border-2 border-[#3a2a7c]" : "border-2 border-[#f0ecfe]"
                    }`}
                >
                  <div className={`w-full h-full ${darkMode ? "bg-gradient-to-b from-[#3a2a7c] to-[#2b97b8]" : "bg-gradient-to-b from-[#5c3aff] to-[#8a6cff]"
                    }`}></div>
                </div>
              ))}
              <div className="flex items-center">
                <span className={`text-xs sm:text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                  Join 5k+ cosmic users
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className={`py-12 sm:py-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 ${darkMode ? "bg-[#0d0a1f]" : "bg-white"
          }`}>
          <div className="max-w-4xl mx-auto text-center relative">
            {darkMode && (
              <div className="absolute -top-6 sm:-top-10 right-0 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-r from-[#8c70cc] to-[#2b97b8] opacity-10 blur-xl"></div>
            )}

            <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 ${darkMode ? "text-[#c0b3e5]" : "text-[#1e1e1e]"
              }`}>
              Ready to Launch Your Thoughts?
            </h2>
            <p className={`text-base sm:text-lg max-w-2xl mx-auto mb-6 sm:mb-10 ${darkMode ? "text-gray-300" : "text-gray-600"
              }`}>
              Join our cosmic community and start your interstellar journaling journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center relative z-10">
              <Link href="/signup" className="w-full sm:w-auto">
                <button className={`w-full rounded-full text-sm sm:text-base md:text-lg font-medium px-6 py-2 sm:px-8 sm:py-3 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 ${darkMode
                    ? "bg-gradient-to-r from-[#8c70cc] to-[#2b97b8] hover:from-[#7a60b8] hover:to-[#2587a8] text-white"
                    : "bg-[#5c3aff] hover:bg-[#4b2fd9] text-white"
                  }`}>
                  Create Account
                </button>
              </Link>
              <Link href="/about" className="w-full sm:w-auto">
                <button className={`w-full rounded-full border-2 text-sm sm:text-base md:text-lg font-medium px-6 py-2 sm:px-8 sm:py-3 transition-colors ${darkMode
                    ? "border-[#8c70cc] text-[#c0b3e5] hover:bg-[#1f1a3d]"
                    : "border-[#5c3aff] text-[#5c3aff] hover:bg-[#f4f0ff]"
                  }`}>
                  Explore Features
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className={`py-8 sm:py-12 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 border-t ${darkMode ? "border-[#3a2a7c]" : "border-[#eae6fc]"
          }`}>
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 md:gap-12">
            <div className="sm:col-span-2 md:col-span-1">
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg ${darkMode ? "bg-gradient-to-r from-[#8c70cc] to-[#2b97b8]" : "bg-[#5c3aff]"
                  }`}></div>
                <span className={`font-bold text-lg sm:text-xl ${darkMode ? "text-[#c0b3e5]" : "text-[#1e1e1e]"
                  }`}>
                  Penurday
                </span>
              </div>
              <p className={`text-xs sm:text-sm max-w-xs ${darkMode ? "text-gray-400" : "text-gray-500"
                }`}>
                A cosmic journal for authentic thoughts. Share your universe.
              </p>
            </div>

            <div>
              <h3 className={`font-semibold mb-3 sm:mb-4 ${darkMode ? "text-[#c0b3e5]" : "text-[#1e1e1e]"
                }`}>Orbit</h3>
              <ul className="space-y-1 sm:space-y-2">
                {['Features', 'Constellations', 'Galaxies', 'Explorations'].map((item, i) => (
                  <li key={i}>
                    <Link href="#" className={`text-xs sm:text-sm transition-colors ${darkMode ? "text-gray-400 hover:text-[#c0b3e5]" : "text-gray-500 hover:text-[#5c3aff]"
                      }`}>
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className={`font-semibold mb-3 sm:mb-4 ${darkMode ? "text-[#c0b3e5]" : "text-[#1e1e1e]"
                }`}>Resources</h3>
              <ul className="space-y-1 sm:space-y-2">
                {['Stellar Blog', 'Cosmic Community', 'Mission Control', 'Astro Guides'].map((item, i) => (
                  <li key={i}>
                    <Link href="#" className={`text-xs sm:text-sm transition-colors ${darkMode ? "text-gray-400 hover:text-[#c0b3e5]" : "text-gray-500 hover:text-[#5c3aff]"
                      }`}>
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className={`font-semibold mb-3 sm:mb-4 ${darkMode ? "text-[#c0b3e5]" : "text-[#1e1e1e]"
                }`}>Space Laws</h3>
              <ul className="space-y-1 sm:space-y-2">
                {['Privacy Policy', 'Terms of Service', 'Cosmic Agreement'].map((item, i) => (
                  <li key={i}>
                    <Link href="#" className={`text-xs sm:text-sm transition-colors ${darkMode ? "text-gray-400 hover:text-[#c0b3e5]" : "text-gray-500 hover:text-[#5c3aff]"
                      }`}>
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className={`mt-8 sm:mt-12 pt-6 sm:pt-8 border-t text-center text-xs sm:text-sm ${darkMode ? "border-[#3a2a7c] text-gray-500" : "border-[#eae6fc] text-gray-400"
            }`}>
            © {new Date().getFullYear()} Penurday Space Systems. All rights reserved across the cosmos.
          </div>
        </footer>
      </div>
    </div>
  );
}