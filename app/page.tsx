"use client";

import Hero from "@/components/Hero";
import Home from "@/components/Home";
import { useEffect, useState } from "react";

export default function LandingPage() {
  
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  if (isLoggedIn === null) return <div>Loading...</div>;

  return isLoggedIn ? <Home /> : <Hero />;
}
