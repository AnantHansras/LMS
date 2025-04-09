import { useState } from "react";
import { User, Calendar, Venus, Palette, KeyRound, LogOut } from "lucide-react";

export default function Setting() {
  const [name, setName] = useState("John Doe");
  const [dob, setDob] = useState("1998-01-01");
  const [gender, setGender] = useState("male");
  const [theme, setTheme] = useState("system");

  const handleLogout = () => {
    alert("Logged out");
  };

  const handleChangePassword = () => {
    alert("Redirecting to change password");
  };

  return (
    <div className="bg-[hsla(240,10%,4%,1)] min-h-screen flex justify-center items-center px-4 py-10 text-[#E4E4E7]">
      <div className="w-full max-w-2xl space-y-6">
        <h1 className="text-4xl font-bold text-center tracking-wide">⚙️ Settings</h1>

        {/* Rename Section */}
        <div className="bg-[#0c0A09] border border-[hsla(12,7%,15%,1)] rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-2xl font-semibold">
            <User className="w-6 h-6" /> Rename
          </div>
          <div className="space-y-1">
            <label htmlFor="name" className="block text-sm font-medium">Your Name</label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-transparent border border-[hsla(12,7%,15%,1)] text-[#E4E4E7] text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-[hsla(21,90%,48%,1)]"
            />
          </div>
        </div>

        {/* DOB Section */}
        <div className="bg-[#0c0A09] border border-[hsla(12,7%,15%,1)] rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-2xl font-semibold">
            <Calendar className="w-6 h-6" /> Date of Birth
          </div>
          <div className="space-y-1">
            <label htmlFor="dob" className="block text-sm font-medium">Select DOB</label>
            <input
              id="dob"
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full px-3 py-2 bg-transparent border border-[hsla(12,7%,15%,1)] text-[#E4E4E7] text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-[hsla(21,90%,48%,1)]"
            />
          </div>
        </div>

        {/* Gender Section */}
        <div className="bg-[#0c0A09] border border-[hsla(12,7%,15%,1)] rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-2xl font-semibold">
            <Venus className="w-6 h-6" /> Gender
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium">Select Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full px-3 py-2 bg-transparent border border-[hsla(12,7%,15%,1)] text-[#E4E4E7] text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-[hsla(21,90%,48%,1)]"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        {/* Theme Section */}
        <div className="bg-[#0c0A09] border border-[hsla(12,7%,15%,1)] rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-2xl font-semibold">
            <Palette className="w-6 h-6" /> Color Theme
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium">Select Theme</label>
            <div className="flex items-center gap-4">
              {["light", "dark", "system"].map((option) => (
                <div
                  key={option}
                  onClick={() => setTheme(option)}
                  className={`w-10 h-10 rounded-full cursor-pointer border-4 transition-all duration-200 ${
                    theme === option ? "border-[hsla(21,90%,48%,1)] scale-110" : "border-[hsla(12,7%,15%,1)]"
                  } ${
                    option === "light"
                      ? "bg-white"
                      : option === "dark"
                      ? "bg-black"
                      : "bg-gradient-to-r from-zinc-400 to-zinc-800"
                  }`}
                  title={option.charAt(0).toUpperCase() + option.slice(1)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Change Password Section */}
        <div className="bg-[#0c0A09] border border-[hsla(12,7%,15%,1)] rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-2xl font-semibold">
            <KeyRound className="w-6 h-6" /> Change Password
          </div>
          <button
            onClick={handleChangePassword}
            className="w-full px-4 py-2 text-sm border border-[hsla(21,90%,48%,1)] text-[#E4E4E7] rounded-md hover:bg-[hsla(21,90%,48%,0.1)] transition"
          >
            Change Password
          </button>
        </div>

        {/* Logout Section */}
        <div className="bg-[#0c0A09] border border-[hsla(12,7%,15%,1)] rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-2xl font-semibold">
            <LogOut className="w-6 h-6" /> Logout
          </div>
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 text-sm bg-red-600 hover:bg-red-700 text-white rounded-md transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
