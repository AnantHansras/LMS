import Sidebar from "../Components/Sidebar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1">
        <Outlet /> {/* Renders the child route components */}
      </div>
    </div>
  );
}
