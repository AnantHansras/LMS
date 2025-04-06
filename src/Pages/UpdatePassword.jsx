import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Lock, Loader2 } from "lucide-react";
import { resetPassword } from "../Services/passwordAPI";

export default function UpdatePassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdate = (e) => {
    e.preventDefault();
    const token = location.pathname.split("/").at(-1);
    setIsLoading(true);
    dispatch(resetPassword(newPassword, confirmPassword, token, navigate));
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="bg-[hsla(240,10%,4%,1)] min-h-screen flex justify-center items-center px-4">
      <div className="max-w-sm w-full p-8 rounded-2xl shadow-xl border border-[hsla(12,7%,15%,1)] backdrop-blur-xl bg-[#0c0A09] text-[#FAFAF9]">
        <h2 className="text-3xl font-bold text-center tracking-wide text-[#FAFAF9]">
          Update Password
        </h2>
        <p className="text-[#A8A29E] text-center mt-1">
          Change your current password
        </p>

        <form className="space-y-4 mt-4" onSubmit={handleUpdate}>
          {/* New Password Field */}
          <div>
            <label className="block text-xs font-medium text-[#FAFAF9]">
              New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#A8A29E]" />
              <input
                type="password"
                placeholder="Enter new password"
                className="w-full pl-9 p-2 border border-[hsla(12,7%,15%,1)] rounded-lg bg-transparent text-[#FAFAF9] focus:ring-2 focus:ring-[hsla(21,90%,48%,1)] outline-none text-sm"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block text-xs font-medium text-[#FAFAF9]">
              Confirm New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#A8A29E]" />
              <input
                type="password"
                placeholder="Confirm new password"
                className="w-full pl-9 p-2 border border-[hsla(12,7%,15%,1)] rounded-lg bg-transparent text-[#FAFAF9] focus:ring-2 focus:ring-[hsla(21,90%,48%,1)] outline-none text-sm"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Update Button */}
          <button
            type="submit"
            className="w-full p-2 active:scale-90 rounded-lg bg-[hsla(21,90%,48%,1)] text-[#FAFAF9] font-semibold hover:bg-[hsla(21,90%,48%,0.7)] hover:shadow-sm hover:shadow-orange-500/50 transition duration-300 text-sm flex items-center justify-center"
          >
            {isLoading ? (
              <span className="flex flex-row justify-center items-center">
                <Loader2 className="animate-spin mr-1" />
                <span>Loading...</span>
              </span>
            ) : (
              "Update Password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
