// lib/useAuth.ts
import { useEffect, useState } from "react";

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token"); // or "isLoggedIn"
    setIsLoggedIn(!!token);
  }, []);

  return isLoggedIn;
}
