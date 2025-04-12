import { useState } from "react";
import Sidebar from "../Components/Sidebar";
import { Outlet } from "react-router-dom";
import {useSelector } from "react-redux";

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

// import { useState } from "react";
// import Sidebar from "../Components/Sidebar";
// import { Outlet } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { toggleTheme } from "../slices/ThemeSlice"; // adjust path if needed
// import { Sun, Moon } from "lucide-react";

// export default function DashboardLayout() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);
//   const dispatch = useDispatch();

//   const handleToggleTheme = () => {
//     dispatch(toggleTheme());
//   };

//   const bgColor = isDarkMode ? "bg-white" : "bg-[#0C0A09]";
//   const textColor = isDarkMode ? "text-gray-900" : "text-white";

//   return (
//     <div className={`flex h-screen transition-colors duration-300 ${bgColor} ${textColor}`}>
//       {/* Sidebar */}
//       <Sidebar
//         isOpen={isSidebarOpen}
//         toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
//       />

//       {/* Main Content */}
//       <div className="flex-1 overflow-y-auto relative">
//         {/* Theme Toggle Button */}
//         <div className="absolute top-1 right-2 z-50">
//           <button
//             onClick={handleToggleTheme}
//             className="p-2 rounded-full bg-[hsla(21,90%,48%,0.2)] hover:bg-[hsla(21,90%,48%,0.3)] transition duration-200"
//             title="Toggle Theme"
//           >
//             {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
//           </button>
//         </div>

//         {/* Page Outlet */}
//         <Outlet />
//       </div>
//     </div>
//   );
// }
