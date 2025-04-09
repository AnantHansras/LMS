import { useState } from "react";
import Sidebar from "../Components/Sidebar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-[#0c0A09]">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      {/* Main Content */}
      <div
        className={`flex-1 overflow-y-auto transition-all duration-300 $`}
      >
         <Outlet />
      </div>
    </div>
  );
}

