"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import StarfieldBackground from "@/components/StarfieldBackground";
import NebulaEffects from "@/components/NebulaEffects";

export default function Login() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
    remember: false,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.usernameOrEmail.trim())
      newErrors.usernameOrEmail = "Email or username is required.";
    if (!formData.password) newErrors.password = "Password is required.";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          usernameOrEmail: formData.usernameOrEmail,
          password: formData.password,
        }),
      });

      const result = await response.json();

      if (result.success) {
        // Save token or a simple logged-in flag
        localStorage.setItem("token", result.token || "loggedin"); // assuming your API sends a token
        router.push("/");
      }

      else {
        alert(result.message || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred while logging in.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white">
      <StarfieldBackground />
      <NebulaEffects />
      <div className="absolute inset-0 flex items-center justify-center px-4 z-10">
        <div className="w-full max-w-sm bg-zinc-900 rounded-xl shadow-lg p-6 border border-zinc-800 backdrop-blur-md">
          <h2 className="text-xl font-semibold text-center mb-2">Log In</h2>
          <p className="text-sm text-zinc-400 text-center mb-6">
            Welcome back! Please login to your account.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="usernameOrEmail"
              type="text"
              placeholder="Email or Username"
              value={formData.usernameOrEmail}
              onChange={handleChange}
              className={`w-full bg-zinc-800 text-white border rounded-md px-3 py-2 text-sm placeholder-zinc-400 ${errors.usernameOrEmail ? "border-red-500" : "border-zinc-700"
                }`}
            />
            {errors.usernameOrEmail && (
              <p className="text-sm text-red-500">{errors.usernameOrEmail}</p>
            )}

            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full bg-zinc-800 text-white border rounded-md px-3 py-2 text-sm placeholder-zinc-400 ${errors.password ? "border-red-500" : "border-zinc-700"
                  }`}
              />
              <button
                type="button"
                className="absolute right-2 top-2.5 text-zinc-400"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="cursor-pointer" size={16} />
                ) : (
                  <Eye className="cursor-pointer" size={16} />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password}</p>
            )}

            <div className="flex items-center gap-2 text-sm text-zinc-300">
              <input
                id="remember"
                name="remember"
                type="checkbox"
                checked={formData.remember}
                onChange={handleChange}
                className="h-4 w-4 rounded bg-zinc-800 border border-zinc-700"
              />
              <label htmlFor="remember">Remember me</label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-[#8c70cc] to-[#2b97b8] cursor-pointer hover:bg-blue-700 text-white text-sm font-medium py-2 rounded-full transition disabled:opacity-50"
            >
              {isSubmitting ? "Logging in..." : "Log In"}
            </button>

            <p className="text-sm text-zinc-400 text-center mt-4">
              Don't have an account?{" "}
              <Link href="/signup" className="text-blue-400 hover:underline">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
