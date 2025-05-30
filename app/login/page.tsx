"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import StarfieldBackground from "@/components/StarfieldBackground";
import NebulaEffects from "@/components/NebulaEffects";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid.";
    if (!formData.password) newErrors.password = "Password is required.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Logged in successfully!");
    }, 1500);
  };

  const handleChange = (e) => {
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
          <h2 className="text-xl font-semibold text-center mb-2">
            Log In
          </h2>
          <p className="text-sm text-zinc-400 text-center mb-6">
            Welcome back! Please login to your account.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full bg-zinc-800 text-white border rounded-md px-3 py-2 text-sm placeholder-zinc-400 ${
                errors.email ? "border-red-500" : "border-zinc-700"
              }`}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}

            {/* Password */}
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full bg-zinc-800 text-white border rounded-md px-3 py-2 text-sm placeholder-zinc-400 ${
                  errors.password ? "border-red-500" : "border-zinc-700"
                }`}
              />
              <button
                type="button"
                className="absolute right-2 top-2.5 text-zinc-400"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password}</p>
            )}

            {/* Remember Me */}
            <div className="flex items-center gap-2 text-sm text-zinc-300">
              <input
                id="remember"
                name="remember"
                type="checkbox"
                checked={formData.remember}
                onChange={handleChange}
                className="h-4 w-4 rounded bg-zinc-800 border-zinc-700"
              />
              <label htmlFor="remember">Remember me</label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-[#8c70cc] to-[#2b97b8] cursor-pointer hover:bg-blue-700 text-white text-sm font-medium py-2 rounded-full transition"
            >
              {isSubmitting ? "Logging in..." : "Log In"}
            </button>

            {/* Redirect */}
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
