import React, { useState } from "react";
import { Lock } from "lucide-react";

export default function UpdatePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUpdate = (e) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("Please fill out all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match");
      return;
    }

    console.log("Password Updated Successfully");
  };

  return (
    <div className="bg-gradient-to-br from-[#0a0f1f] via-[#17233d] to-[#0a0f1f] min-h-screen flex justify-center items-center px-4">
      <div className="max-w-sm w-full p-8 rounded-2xl shadow-xl border border-[rgba(255,255,255,0.15)] backdrop-blur-xl bg-[rgba(255,255,255,0.08)] text-white">
        <h2 className="text-3xl font-bold text-center tracking-wide text-blue-300">Update Password</h2>
        <p className="text-gray-400 text-center mt-1">Change your current password</p>

        <form className="space-y-4 mt-4" onSubmit={handleUpdate}>
          {/* Current Password Field */}
          <div>
            <label className="block text-xs font-medium text-gray-300">Current Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                placeholder="Enter current password"
                className="w-full pl-9 p-2 border border-gray-500 rounded-lg bg-transparent text-white focus:ring-2 focus:ring-blue-400 outline-none text-sm"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
          </div>

          {/* New Password Field */}
          <div>
            <label className="block text-xs font-medium text-gray-300">New Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                placeholder="Enter new password"
                className="w-full pl-9 p-2 border border-gray-500 rounded-lg bg-transparent text-white focus:ring-2 focus:ring-blue-400 outline-none text-sm"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block text-xs font-medium text-gray-300">Confirm New Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                placeholder="Confirm new password"
                className="w-full pl-9 p-2 border border-gray-500 rounded-lg bg-transparent text-white focus:ring-2 focus:ring-blue-400 outline-none text-sm"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Update Button */}
          <button
            type="submit"
            className="w-full p-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 hover:shadow-sm hover:shadow-blue-500/50 transition duration-300 text-sm"
          >
            Update Password
          </button>
        </form>

        {/* Back to Profile */}
        <div className="text-center text-sm text-gray-400 mt-4">
          <a href="/profile" className="text-blue-400 hover:underline">
            Back to Profile
          </a>
        </div>
      </div>
    </div>
  );
}
