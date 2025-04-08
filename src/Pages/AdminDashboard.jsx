import { useState } from "react";
import AdminSidebar from "../Components/Adminsidebar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-[#0c0A09]">
      {/* Sidebar */}
      <AdminSidebar 
        isOpen={isSidebarOpen} 
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
      />

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto transition-all duration-300">
        {/* Admin Header */}
        <header className="bg-[#1c1a18] text-white px-6 py-4 shadow-md">
          <h2 className="text-2xl font-semibold">Admin Panel</h2>
        </header>

        {/* Routed Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
