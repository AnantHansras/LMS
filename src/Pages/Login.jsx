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
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); 
  };

  return (
    <div className="bg-gradient-to-br from-[#0a0f1f] via-[#17233d] to-[#0a0f1f] min-h-screen flex justify-center items-center px-4">
      <div className="max-w-sm w-full p-8 rounded-2xl shadow-xl border border-[rgba(255,255,255,0.15)] backdrop-blur-xl bg-[rgba(255,255,255,0.08)] text-white">
        <h2 className="text-3xl font-bold text-center tracking-wide text-blue-300">
          Welcome Back
        </h2>
        <p className="text-gray-400 text-center mt-1">Login to continue</p>

        <form className="space-y-4 mt-4" onSubmit={handleLogin}>
          {/* Email Field */}
          <div>
            <label className="block text-xs font-medium text-gray-300">
              Email
            </label>
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
            <label className="text-xs font-medium text-gray-300 flex">
              Password
              <div className="ml-auto text-xs">
                <a
                  href="/forgot-password"
                  className="text-blue-400 hover:underline"
                >
                  Forgot Password?
                </a>
              </div>
            </label>
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

          {/* Login Button */}
          <button
            type="submit"
            className="w-full p-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 hover:shadow-sm hover:shadow-blue-500/50 transition duration-300 text-sm flex items-center justify-center"
            disabled={isLoading} // Disable button while loading
          >
            {isLoading ? <span className="flex flex-row justify-center items-center"><Loader2 className="animate-spin"/><span>Loading...</span></span> : "Login"}
          </button>
        </form>

        {/* Don't have an account? */}
        <div className="text-center text-sm text-gray-400 mt-4">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-400 hover:underline">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
}
