"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import StarfieldBackground from "@/components/StarfieldBackground";
import NebulaEffects from "@/components/NebulaEffects";

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    dob: "", // added dob
    terms: false,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.username.trim()) newErrors.username = "Username is required.";
    if (!formData.name.trim()) newErrors.name = "Full name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid.";
    if (!formData.dob) newErrors.dob = "Date of birth is required.";
    if (formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters.";
    if (formData.confirmPassword !== formData.password)
      newErrors.confirmPassword = "Passwords do not match.";
    if (!formData.terms) newErrors.terms = "You must agree to terms.";

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setFormData({
          username: "",
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          dob: "",
          terms: false,
        });
        router.push("/login");  // <-- redirect here
      } else {
        alert("Signup failed.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred.");
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
};


  return (
    <div className="relative min-h-screen bg-black text-white">
      <StarfieldBackground />
      <NebulaEffects />
      <div className="absolute inset-0 flex items-center justify-center px-4 z-10">
        <div className="w-full max-w-sm bg-zinc-900 rounded-xl shadow-lg p-6 border border-zinc-800 backdrop-blur-md">
          <h2 className="text-xl font-semibold text-center mb-2">Create Account</h2>
          <p className="text-sm text-zinc-400 text-center mb-6">Join our community of thinkers</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className={`w-full bg-zinc-800 text-white border rounded-md px-3 py-2 text-sm placeholder-zinc-400 ${errors.username ? "border-red-500" : "border-zinc-700"
                }`}
            />
            {errors.username && <p className="text-sm text-red-500">{errors.username}</p>}

            <input
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full bg-zinc-800 text-white border rounded-md px-3 py-2 text-sm placeholder-zinc-400 ${errors.name ? "border-red-500" : "border-zinc-700"
                }`}
            />
            {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}

            <input
              name="dob"
              type="date"
              value={formData.dob}
              onChange={handleChange}
              className={`w-full bg-zinc-800 text-white border rounded-md px-3 py-2 text-sm placeholder-zinc-400 ${errors.dob ? "border-red-500" : "border-zinc-700"
                }`}
            />
            {errors.dob && <p className="text-sm text-red-500">{errors.dob}</p>}

            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full bg-zinc-800 text-white border rounded-md px-3 py-2 text-sm placeholder-zinc-400 ${errors.email ? "border-red-500" : "border-zinc-700"
                }`}
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}

            {/* Password */}
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
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}

            {/* Confirm Password */}
            <div className="relative">
              <input
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full bg-zinc-800 text-white border rounded-md px-3 py-2 text-sm placeholder-zinc-400 ${errors.confirmPassword ? "border-red-500" : "border-zinc-700"
                  }`}
              />
              <button
                type="button"
                className="absolute right-2 top-2.5 text-zinc-400"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-sm text-red-500">{errors.confirmPassword}</p>
            )}

            {/* Terms */}
            <div className="flex items-center gap-2 text-sm text-zinc-300">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                checked={formData.terms}
                onChange={handleChange}
                className="h-4 w-4 rounded bg-zinc-800 border border-zinc-700"
              />
              <label htmlFor="terms">
                I agree to the{" "}
                <a href="/terms" className="text-blue-400 hover:underline">
                  terms
                </a>{" "}
                &{" "}
                <a href="/privacy" className="text-blue-400 hover:underline">
                  privacy
                </a>
              </label>
            </div>
            {errors.terms && <p className="text-sm text-red-500">{errors.terms}</p>}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-[#8c70cc] to-[#2b97b8] cursor-pointer hover:bg-blue-700 text-white text-sm font-medium py-2 rounded-full transition disabled:opacity-50"
            >
              {isSubmitting ? "Creating Account..." : "Sign Up"}
            </button>

            {/* Redirect */}
            <p className="text-sm text-zinc-400 text-center mt-4">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-400 hover:underline">
                Log in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
