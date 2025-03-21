import React, { useState } from "react";
import { Mail, Lock, Loader2 } from "lucide-react";
import { login } from "../Services/userAPI";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setisloading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setisloading(true);
    dispatch(login(email, password, navigate));
    setisloading(false);
  };

  return (
    <div className="bg-[hsla(240,10%,4%,1)] min-h-screen flex justify-center items-center px-4">
      <div className="max-w-sm w-full p-8 rounded-2xl shadow-xl border border-[hsla(12,7%,15%,1)] backdrop-blur-xl bg-[#0c0A09] text-[#FAFAF9]">
        <h2 className="text-3xl font-bold text-center tracking-wide text-[#FAFAF9]">Welcome Back</h2>
        <p className="text-[#A8A29E] text-center mt-1">Login to continue</p>

        <form className="space-y-4 mt-4" onSubmit={handleLogin}>
          {/* Email Field */}
          <div>
            <label className="block text-xs font-medium text-[#FAFAF9]">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#A8A29E]" />
              <input
                type="email"
                placeholder="name@example.com"
                className="w-full pl-9 p-2 border border-[hsla(12,7%,15%,1)] rounded-lg bg-transparent text-[#A8A29E] focus:ring-2 focus:ring-[hsla(21,90%,48%,1)] outline-none text-sm"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="text-xs font-medium text-[#FAFAF9] flex">
              Password
              <div className="ml-auto text-xs">
                <a
                  href="/forgot-password"
                  className="text-[hsla(21,90%,48%,1)] hover:underline"
                >
                  Forgot Password?
                </a>
              </div>
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#A8A29E]" />
              <input
                type="password"
                placeholder="••••••••"
                className="w-full pl-9 pr-9 p-2 border border-[hsla(12,7%,15%,1)] rounded-lg bg-transparent text-[#A8A29E] focus:ring-2 focus:ring-[hsla(21,90%,48%,1)] outline-none text-sm"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full p-2 rounded-lg bg-[hsla(21,90%,48%,1)] text-[#FAFAF9] font-semibold hover:bg-[hsla(21,90%,48%,0.9)] hover:shadow-sm hover:shadow-blue-500/50 transition duration-300 text-sm flex items-center justify-center"
            disabled={isLoading} // Disable button while loading
          >
            {isLoading ? <Loader2 /> : "Login"}
          </button>
        </form>

        {/* Don't have an account? */}
        <div className="text-center text-sm text-[#A8A29E] mt-4">
          Don't have an account?{" "}
          <a href="/signup" className="text-[hsla(21,90%,48%,1)] hover:underline">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
}
