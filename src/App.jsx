import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import AdminDashboard from "./Pages/AdminDashboard";
import ForgotPassword from "./Pages/ForgotPassword";
import UpdatePassword from "./Pages/UpdatePassword";
import OTP from "./Pages/OTP";
import AllBooks from "./Pages/AllBooks";
import Adminallbook from "./Pages/Adminallbook";
import IssuedBooks from "./Pages/IssuedBooks";
import DashboardLayout from "./Pages/DashboardLayout";
import AddBooks from "./Pages/AddBooks";
import AllTransactions from "./Pages/AllTransactions";
import Pending from "./Pages/Pending";
import MyPending from "./Pages/Userpending";
import Home from "./Pages/Home";
import UserFines from "./Pages/UserFines";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <div>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#000000",
            color: "#ffffff",
            border: "1px solid #333333",
          },
          success: {
            iconTheme: {
              primary: "#22c55e",
              secondary: "#000000",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#000000",
            },
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/otp" element={<OTP />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/update-password/:id" element={<UpdatePassword />} />

        <Route path="/" element={<DashboardLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/allbooks" element={<AllBooks />} />
          <Route path="/issuedbooks" element={<IssuedBooks />} />
          <Route path="/userfines" element={<UserFines />} />
          <Route path="/mypending" element={<MyPending />} />
        </Route>
        <Route path="/AdminDashboard" element={<AdminDashboard />}>
          <Route path='admin' element={<Adminallbook />} />
          <Route path="addbooks" element={<AddBooks />} />
          <Route path="transactions" element={<AllTransactions />} />
          <Route path="pending-req" element={<Pending />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
