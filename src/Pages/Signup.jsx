import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User ,Loader2} from "lucide-react";
import { sendOtp, signUp } from "../Services/userAPI";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await dispatch(sendOtp(email, navigate, { name, email, password }));
    setIsLoading(false);
  };

  return (
    <div className="bg-[hsla(240,10%,4%,1)] min-h-screen flex justify-center items-center px-4">
      <div className="max-w-sm w-full p-8 rounded-2xl shadow-xl border border-[hsla(12,7%,15%,1)] backdrop-blur-xl bg-[#0c0A09] text-[#FAFAF9]">
        <h2 className="text-3xl font-bold text-center tracking-wide text-[#FAFAF9]">
          Create an Account
        </h2>
        <p className="text-[#A8A29E] text-center mt-1">
          Sign up to get started
        </p>

        <form className="space-y-4 mt-4" onSubmit={handleSignup}>
          {/* Name Field */}
          <div>
            <label className="block text-xs font-medium ">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="John Doe"
                className="w-full pl-9 p-2 border border-[hsla(12,7%,15%,1)] rounded-lg bg-transparent text-[#A8A29E] focus:ring-2 focus:ring-[hsla(21,90%,48%,1)] outline-none text-sm"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-xs font-medium ">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
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
            <label className="block text-xs font-medium ">Password</label>
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
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A8A29E]"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            disabled={isLoading}
            className=" active:scale-90 w-full p-2 rounded-lg bg-[hsla(21,90%,48%,1)] text-[#FAFAF9] font-semibold hover:bg-[hsla(21,90%,48%,0.7)] hover:shadow-sm  transition duration-300 text-sm"
          >
            {isLoading ? <span className="flex flex-row justify-center items-center"><Loader2 className="animate-spin mr-1"/><span>Loading...</span></span> : "Sign Up"}
          </button>
        </form>

        {/* Already have an account? */}
        <div className="text-center text-sm text-gray-400 mt-4">
          Already have an account?{" "}
          <a href="/" className="text-[hsla(21,90%,48%,1)] hover:underline">
            Login
          </a>
        </div>
      </div>
    </div>
  );
}
