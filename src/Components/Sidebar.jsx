// import { useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { Home as HomeIcon, 
//   Close as CloseIcon,
//   Menu as MenuIcon,
//   ExitToApp as ExitIcon,
//   LibraryBooks as LibraryBooksIcon, 
//   Settings as SettingsIcon, 
//   Book as BookIcon, 
//   AssignmentTurnedIn as RequestIcon } from "@mui/icons-material";
//   import AddCircleIcon from "@mui/icons-material/AddCircle";
// import { Tooltip } from "@mui/material";

// export default function Sidebar() {
//   const [isOpen, setIsOpen] = useState(true);
//   const location = useLocation();

//   const toggleSidebar = () => setIsOpen(!isOpen);

//   const menuItems = [
//     { name: "Home", path: "/home", icon: <HomeIcon /> },
//     { name: "All Books", path: "/allbooks", icon: <LibraryBooksIcon /> },
//     { name: "Issued Books", path: "/issuedbooks", icon: <BookIcon /> },
//     { name: "Add Books", path: "/addbooks", icon: <AddCircleIcon /> }, // New tab for adding books
//     { name: "Settings", path: "/settings", icon: <SettingsIcon /> },
//     { name: "Pending Requests", path: "/pending-req", icon: <RequestIcon /> },
//     { name: "Transactions", path: "/transactions", icon: <RequestIcon /> },
// ];



//   return (
//     <div className="flex h-full">

//     <div
//       className={`h-screen bg-gray-900 text-white transition-all duration-300 flex flex-col shadow-lg 
//         ${isOpen ? "w-64" : "w-16"}
//         `}
//         >
//       {/* Sidebar Header */}
//       <div className="p-4 flex justify-between items-center border-b border-gray-700">
//         {isOpen && <h2 className="text-lg font-semibold">Library</h2>}
//         <button onClick={toggleSidebar} className="text-white">
//           {isOpen ? <CloseIcon /> : <MenuIcon />}
//         </button>
//       </div>

//       {/* Navigation Links */}
//       <nav className="mt-4 flex flex-col flex-grow">
//         {menuItems.map(({ name, path, icon }) => (
//           <NavItem
//           key={name}
//           icon={icon}
//           text={name}
//           path={path}
//           isOpen={isOpen}
//           isActive={location.pathname === path}
//           />
//         ))}
//       </nav>

//       {/* Logout Button */}
//       <div className="mt-auto p-4 border-t border-gray-700">
//         <NavItem icon={<ExitIcon />} text="Logout" isOpen={isOpen} path="/" />
//       </div>
//     </div>
//     </div>
//   );
// }

// // Navigation Item Component
// const NavItem = ({ icon, text, path, isOpen, isActive }) => (
//   <Tooltip title={!isOpen ? text : ""} placement="right">
//     <Link
//       to={path}
//       className={`relative flex items-center p-3 rounded-md transition-all duration-200 group
//         ${isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"}
//         `}
//         >
//       {icon}
//       {isOpen && <span className="ml-4 text-sm">{text}</span>}
//     </Link>
//   </Tooltip>
// );





// // import { Home as HomeIcon, 
// //   Close as CloseIcon,
// //   Menu as MenuIcon,
// //   ExitToApp as ExitIcon,
// //   LibraryBooks as LibraryBooksIcon, 
// //   Settings as SettingsIcon, 
// //   Book as BookIcon, 
// //   AssignmentTurnedIn as RequestIcon } from "@mui/icons-material";
// // import AddCircleIcon from "@mui/icons-material/AddCircle";
// // import { Tooltip } from "@mui/material";

// // export default function Sidebar() {
// //   const [isOpen, setIsOpen] = useState(true);
// //   const location = useLocation();

// //   const toggleSidebar = () => setIsOpen(!isOpen);

// //   const menuItems = [
// //     { name: "Home", path: "/home", icon: <HomeIcon /> },
// //     { name: "All Books", path: "/allbooks", icon: <LibraryBooksIcon /> },
// //     { name: "Issued Books", path: "/issuedbooks", icon: <BookIcon /> },
// //     { name: "Add Books", path: "/addbooks", icon: <AddCircleIcon /> }, // New tab for adding books
// //     { name: "Settings", path: "/settings", icon: <SettingsIcon /> },
// //     { name: "Pending Requests", path: "/pending-req", icon: <RequestIcon /> },
// //     { name: "Transactions", path: "/transactions", icon: <RequestIcon /> },
// //   ];

// //   return (
// //     <div className="flex ">
// //       <div
// //         className={`min-h-screen bg-gray-900 text-white transition-all duration-300 flex flex-col shadow-lg overflow-y-auto 
// //           ${isOpen ? "w-64" : "w-16"}
// //         `}
// //       >
// //         {/* Sidebar Header */}
// //         <div className="p-4 flex justify-between items-center border-b border-gray-700">
// //           {isOpen && <h2 className="text-lg font-semibold">Library</h2>}
// //           <button onClick={toggleSidebar} className="text-white">
// //             {isOpen ? <CloseIcon /> : <MenuIcon />}
// //           </button>
// //         </div>

// //         {/* Navigation Links */}
// //         <nav className="mt-4 flex flex-col flex-grow">
// //           {menuItems.map(({ name, path, icon }) => (
// //             <NavItem
// //               key={name}
// //               icon={icon}
// //               text={name}
// //               path={path}
// //               isOpen={isOpen}
// //               isActive={location.pathname === path}
// //             />
// //           ))}
// //         </nav>

// //         {/* Logout Button */}
// //         <div className="mt-auto p-4 border-t border-gray-700">
// //           <NavItem icon={<ExitIcon />} text="Logout" isOpen={isOpen} path="/" />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // // Navigation Item Component
// // const NavItem = ({ icon, text, path, isOpen, isActive }) => (
// //   <Tooltip title={!isOpen ? text : ""} placement="right">
// //     <Link
// //       to={path}
// //       className={`relative flex items-center p-3 rounded-md transition-all duration-200 group
// //         ${isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"}
// //       `}
// //     >
// //       {icon}
// //       {isOpen && <span className="ml-4 text-sm">{text}</span>}
// //     </Link>
// //   </Tooltip>
// // );

// import { useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { Home as HomeIcon, Menu as MenuIcon, Close as CloseIcon, ExitToApp as ExitIcon, LibraryBooks as LibraryBooksIcon, Settings as SettingsIcon, Book as BookIcon, AssignmentTurnedIn as RequestIcon } from "@mui/icons-material";
// import AddCircleIcon from "@mui/icons-material/AddCircle";
// import { Tooltip } from "@mui/material";

// export default function Sidebar({ isOpen, toggleSidebar }) {
//   const location = useLocation();

//   const menuItems = [
//     { name: "All Books", path: "/allbooks", icon: <LibraryBooksIcon /> },
//     { name: "Issued Books", path: "/issuedbooks", icon: <BookIcon /> },
//     { name: "Add Books", path: "/addbooks", icon: <AddCircleIcon /> },
//     { name: "Settings", path: "/settings", icon: <SettingsIcon /> },
//     { name: "Pending Requests", path: "/pending-req", icon: <RequestIcon /> },
//     { name: "Transactions", path: "/transactions", icon: <RequestIcon /> },
//   ];

//   return (
//     <div className={`h-screen bg-gray-900 text-white transition-all duration-300 flex flex-col shadow-lg ${isOpen ? "w-64" : "w-16"}`}>
      
//       {/* Header */}
//       <div className="p-4 flex justify-between items-center border-b border-gray-700">
//         {isOpen && <h2 className="text-lg font-semibold">Library</h2>}
//         <button onClick={toggleSidebar} className="text-white">
//           {isOpen ? <CloseIcon /> : <MenuIcon />}
//         </button>
//       </div>

//       {/* Navigation Links */}
//       <nav className="mt-4 flex flex-col flex-grow">
//         {menuItems.map(({ name, path, icon }) => (
//           <NavItem key={name} icon={icon} text={name} path={path} isOpen={isOpen} isActive={location.pathname === path} />
//         ))}
//       </nav>

//       {/* Logout */}
//       <div className="mt-auto p-4 border-t border-gray-700">
//         <NavItem icon={<ExitIcon />} text="Logout" isOpen={isOpen} path="/" />
//       </div>
//     </div>
//   );
// }

// // Reusable Nav Item Component
// const NavItem = ({ icon, text, path, isOpen, isActive }) => (
//   <Tooltip title={!isOpen ? text : ""} placement="right">
//     <Link
//       to={path}
//       className={`flex items-center p-3 rounded-md transition-all duration-200 group ${isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"}`}
//     >
//       {icon}
//       {isOpen && <span className="ml-4 text-sm">{text}</span>}
//     </Link>
//   </Tooltip>
// );


import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home as HomeIcon, Menu as MenuIcon, Close as CloseIcon, ExitToApp as ExitIcon, LibraryBooks as LibraryBooksIcon, Settings as SettingsIcon, Book as BookIcon, AssignmentTurnedIn as RequestIcon } from "@mui/icons-material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Tooltip } from "@mui/material";

export default function Sidebar({ isOpen, toggleSidebar }) {
  const location = useLocation();

  const menuItems = [
    { name: "All Books", path: "/allbooks", icon: <LibraryBooksIcon /> },
    { name: "Issued Books", path: "/issuedbooks", icon: <BookIcon /> },
    { name: "Add Books", path: "/addbooks", icon: <AddCircleIcon /> },
    { name: "Settings", path: "/settings", icon: <SettingsIcon /> },
    { name: "Pending Requests", path: "/pending-req", icon: <RequestIcon /> },
    { name: "Transactions", path: "/transactions", icon: <RequestIcon /> },
  ];

  return (
    <div className={`h-screen bg-[hsla(240,10%,4%,1)] text-[#FAFAF9] transition-all duration-300 flex flex-col shadow-lg ${isOpen ? "w-64" : "w-16"} border-r border-[hsla(12,7%,15%,1)]`}>
      {/* Header */}
      <div className="p-4 flex justify-between items-center border-b border-[hsla(12,7%,15%,1)]">
        {isOpen && <h2 className="text-lg font-semibold">Library</h2>}
        <button onClick={toggleSidebar} className="text-[#A8A29E] hover:text-[hsla(21,90%,48%,1)] transition">
          {isOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="mt-4 flex flex-col flex-grow">
        {menuItems.map(({ name, path, icon }) => (
          <NavItem key={name} icon={icon} text={name} path={path} isOpen={isOpen} isActive={location.pathname === path} />
        ))}
      </nav>

      {/* Logout */}
      <div className="mt-auto p-4 border-t border-[hsla(12,7%,15%,1)]">
        <NavItem icon={<ExitIcon />} text="Logout" isOpen={isOpen} path="/" />
      </div>
    </div>
  );
}

// Reusable Nav Item Component
const NavItem = ({ icon, text, path, isOpen, isActive }) => (
  <Tooltip title={!isOpen ? text : ""} placement="right">
    <Link
      to={path}
      className={`flex items-center p-3 rounded-md transition-all duration-200 group ${isActive ? "bg-[hsla(21,90%,48%,1)] text-white" : "text-[#A8A29E] hover:bg-[hsla(12,7%,15%,1)] hover:text-white"}`}
    >
      {icon}
      {isOpen && <span className="ml-4 text-sm">{text}</span>}
    </Link>
  </Tooltip>
);
