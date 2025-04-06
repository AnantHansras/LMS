import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Mail, Loader2 } from "lucide-react";
import { tokenPassword } from "../Services/passwordAPI";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await dispatch(tokenPassword(email, setEmailSent));
    
    setIsLoading(false);
    
  };

  return (
    <div className="bg-[hsla(240,10%,4%,1)] min-h-screen flex justify-center items-center px-4">
      <div className="max-w-sm w-full p-8 rounded-2xl shadow-xl border border-[hsla(12,7%,15%,1)] backdrop-blur-xl bg-[#0c0A09] text-[#FAFAF9]">
        <h2 className="text-3xl font-bold text-center tracking-wide text-[#FAFAF9]">
          Forgot Password?
        </h2>
        <p className="text-[#A8A29E] text-center mt-1">
          {emailSent
            ? "A reset link has been sent to your email."
            : "Enter your email to reset your password"}
        </p>

        <form className="space-y-4 mt-4" onSubmit={handleReset}>
          {!emailSent && (
            <div>
              <label className="block text-xs font-medium text-[#FAFAF9]">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#A8A29E]" />
                <input
                  type="email"
                  placeholder="name@example.com"
                  className="w-full pl-9 p-2 border border-[hsla(12,7%,15%,1)] rounded-lg bg-transparent text-[#FAFAF9] focus:ring-2 focus:ring-[hsla(21,90%,48%,1)] outline-none text-sm"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full p-2 active:scale-90 rounded-lg bg-[hsla(21,90%,48%,1)] text-[#FAFAF9] font-semibold hover:bg-[hsla(21,90%,48%,0.7)] hover:shadow-sm hover:shadow-blue-500/50 transition duration-300 text-sm flex items-center justify-center"
          >
            {isLoading ? (
              <span className="flex flex-row justify-center items-center">
                <Loader2 className="animate-spin mr-1" />
                <span>Loading...</span>
              </span>
            ) : (
              `${emailSent ? "Resend Email" : "Reset Password"}`
            )}
          </button>
        </form>

        <div className="text-center text-sm text-[#A8A29E] mt-4">
          Remember your password?{" "}
          <a href="/" className="text-[hsla(21,90%,48%,1)] hover:underline">
            Login
          </a>
        </div>
      </div>
    </div>
  );
}
