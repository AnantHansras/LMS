// import Sidebar from "../Components/Sidebar";
// import { Outlet } from "react-router-dom";

// export default function DashboardLayout() {
//   return (
//     <div className="flex fixed">
//       {/* Sidebar */}
//       <Sidebar />
//       {/* Main Content */}
//       <div className="flex-1 overflow-y-auto relative">
//         <Outlet /> {/* Renders the child route components */}
//       </div>
//     </div>
//   );
// }

// import { useState } from "react";
// import Sidebar from "../Components/Sidebar";
// import { Outlet } from "react-router-dom";

// export default function DashboardLayout() {
//   const [isCollapsed, setIsCollapsed] = useState(false); // Sidebar state

//   return (
//     <div className="flex h-screen">
//       {/* Sidebar */}
//       <div
//         className={`h-screen bg-gray-900 transition-all duration-300 ${
//           isCollapsed ? "w-16" : "w-64"
//         } fixed left-0 top-0`}
//       >
//         <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
//       </div>

//       {/* Main Content */}
//       <div
//         className={`flex-1 h-screen overflow-y-auto p-6 bg-gray-950 transition-all duration-300 ${
//           isCollapsed ? "ml-16" : "ml-64"
//         }`}
//       >
//         <Outlet />
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import Sidebar from "../Components/Sidebar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen">
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

