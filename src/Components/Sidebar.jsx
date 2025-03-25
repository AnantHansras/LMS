import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Home as HomeIcon,
  LibraryBooks as LibraryBooksIcon,
  AdminPanelSettings as AdminIcon,
  ExitToApp as ExitIcon,
} from "@mui/icons-material";
import { Tooltip } from "@mui/material";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const menuItems = [
    { name: "Dashboard", path: "/allbooks", icon: <HomeIcon /> },
    { name: "Issued Books", path: "/issuedbooks", icon: <LibraryBooksIcon /> },
    { name: "Admin Books", path: "/admin/allbooks", icon: <AdminIcon /> },
  ];

  return (
    <div
      className={`h-screen bg-gray-900 text-white transition-all duration-300 flex flex-col shadow-lg 
        ${isOpen ? "w-64" : "w-16"}
      `}
    >
      {/* Sidebar Header */}
      <div className="p-4 flex justify-between items-center border-b border-gray-700">
        {isOpen && <h2 className="text-lg font-semibold">Library</h2>}
        <button onClick={toggleSidebar} className="text-white">
          {isOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="mt-4 flex flex-col flex-grow">
        {menuItems.map(({ name, path, icon }) => (
          <NavItem
            key={name}
            icon={icon}
            text={name}
            path={path}
            isOpen={isOpen}
            isActive={location.pathname === path}
          />
        ))}
      </nav>

      {/* Logout Button */}
      <div className="mt-auto p-4 border-t border-gray-700">
        <NavItem icon={<ExitIcon />} text="Logout" isOpen={isOpen} path="/" />
      </div>
    </div>
  );
}

// Navigation Item Component
const NavItem = ({ icon, text, path, isOpen, isActive }) => (
  <Tooltip title={!isOpen ? text : ""} placement="right">
    <Link
      to={path}
      className={`relative flex items-center p-3 rounded-md transition-all duration-200 group
        ${isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"}
      `}
    >
      {icon}
      {isOpen && <span className="ml-4 text-sm">{text}</span>}
    </Link>
  </Tooltip>
);

