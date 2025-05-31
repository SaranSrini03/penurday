"use client";

import React, { useEffect, useState } from "react";

interface User {
  username: string;
  name: string;
  email: string;
}

interface UserDetailsProps {
  detail: "username" | "name" | "email";  // what to show
  format?: "initial" | "full"; // how to show (optional, defaults to "full")
}

export default function UserDetails({ detail, format = "full" }: UserDetailsProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    fetch("/api/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user || null);
        setLoading(false);
      })
      .catch(() => {
        setUser(null);
        setLoading(false);
      });
  }, []);

  if (loading) {
  return (
    <span className="inline-flex space-x-1 animate-pulse">
      <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:0s]" />
      <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:0.2s]" />
      <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:0.4s]" />
    </span>
  );
}

  if (!user) return <span>Not logged in</span>;

  let value = user[detail] || "N/A";

  if (format === "initial" && typeof value === "string" && value.length > 0) {
    value = value.charAt(0).toUpperCase();
  }

  return <span>{value}</span>;
}
