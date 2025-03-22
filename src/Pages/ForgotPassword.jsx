import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Mail,Loader2 } from "lucide-react";
import { tokenPassword } from "../Services/passwordAPI";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const handleReset = (e) => {

    e.preventDefault();
    setIsLoading(true)
    dispatch(tokenPassword(email, setEmailSent));
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="bg-gradient-to-br from-[#0a0f1f] via-[#17233d] to-[#0a0f1f] min-h-screen flex justify-center items-center px-4">
      <div className="max-w-sm w-full p-8 rounded-2xl shadow-xl border border-[rgba(255,255,255,0.15)] backdrop-blur-xl bg-[rgba(255,255,255,0.08)] text-white">
        <h2 className="text-3xl font-bold text-center tracking-wide text-blue-300">
          Forgot Password?
        </h2>
        <p className="text-gray-400 text-center mt-1">
          {emailSent
            ? "A reset link has been sent to your email."
            : "Enter your email to reset your password"}
        </p>

        <form className="space-y-4 mt-4" onSubmit={handleReset}>
          {/* Email Field */}
          {!emailSent && (
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
          )}

          {/* Reset Button */}
          <button
            type="submit"
            className="w-full p-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 hover:shadow-sm hover:shadow-blue-500/50 transition duration-300 text-sm"
          >
          {isLoading ? <span className="flex flex-row justify-center items-center"><Loader2 className="animate-spin mr-1"/><span>Loading...</span></span> : `${emailSent ? "Resend Email" : "Reset Password"}`}
            
          </button>
        </form>

        {/* Back to Login */}
        <div className="text-center text-sm text-gray-400 mt-4">
          Remember your password?{" "}
          <a href="/" className="text-blue-400 hover:underline">
            Login
          </a>
        </div>
      </div>
    </div>
  );
}

