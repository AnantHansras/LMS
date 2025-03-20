import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSignup = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Please fill in all fields");
      return;
    }

    if (!agreedToTerms) {
      alert("You must agree to the terms and conditions");
      return;
    }

    console.log("Signup Data:", { name, email, password, agreedToTerms });
  };

  return (
    <div className="bg-gradient-to-br from-[#0a0f1f] via-[#17233d] to-[#0a0f1f] min-h-screen flex justify-center items-center px-4">
      <div className="max-w-sm w-full p-8 rounded-2xl shadow-xl border border-[rgba(255,255,255,0.15)] backdrop-blur-xl bg-[rgba(255,255,255,0.08)] text-white">
        <h2 className="text-3xl font-bold text-center tracking-wide text-blue-300">Create an Account</h2>
        <p className="text-gray-400 text-center mt-1">Sign up to get started</p>

        <form className="space-y-4 mt-4" onSubmit={handleSignup}>
          {/* Name Field */}
          <div>
            <label className="block text-xs font-medium text-gray-300">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="John Doe"
                className="w-full pl-9 p-2 border border-gray-500 rounded-lg bg-transparent text-white focus:ring-2 focus:ring-blue-400 outline-none text-sm"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-xs font-medium text-gray-300">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                placeholder="name@example.com"
                className="w-full pl-9 p-2 border border-gray-500 rounded-lg bg-transparent text-white focus:ring-2 focus:ring-blue-400 outline-none text-sm"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-xs font-medium text-gray-300">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                placeholder="••••••••"
                className="w-full pl-9 pr-9 p-2 border border-gray-500 rounded-lg bg-transparent text-white focus:ring-2 focus:ring-blue-400 outline-none text-sm"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full p-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 hover:shadow-sm hover:shadow-blue-500/50 transition duration-300 text-sm"
          >
            Sign Up
          </button>
        </form>

        {/* Already have an account? */}
        <div className="text-center text-sm text-gray-400 mt-4">
          Already have an account?{" "}
          <a href="/" className="text-blue-400 hover:underline">
            Login
          </a>
        </div>
      </div>
    </div>
  );
}


