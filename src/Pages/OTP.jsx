import { useState, useEffect } from "react";
import OTPInput from "react-otp-input";
import { signUp } from "../Services/userAPI";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Loader2 } from "lucide-react";

export default function OTP() {
  const [otp, setOtp] = useState("");
  const location = useLocation();
  const signupData = location.state?.signupData;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (!signupData) {
      navigate("/signup");
    }
  }, [signupData, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = signupData;
    setIsLoading(true)
    dispatch(signUp(name, email, password, otp, navigate));
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); 
  };

  return (
    <div className="bg-gradient-to-br from-[#0a0f1f] via-[#17233d] to-[#0a0f1f] min-h-screen flex justify-center items-center px-4">
      <div className="max-w-sm w-full p-8 rounded-2xl shadow-xl border border-[rgba(255,255,255,0.15)] backdrop-blur-xl bg-[rgba(255,255,255,0.08)] text-white">
        <h2 className="text-3xl font-bold text-center tracking-wide text-blue-300">Enter OTP</h2>
        <p className="text-gray-400 text-center mt-1">Please enter the 6-digit code sent to your device</p>
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="flex justify-center">
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              shouldAutoFocus
              inputStyle={{
                width: "2.5rem",
                height: "2.5rem",
                margin: "0 0.5rem",
                fontSize: "1rem",
                borderRadius: "0.5rem",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                color: "#fff",
                textAlign: "center",
              }}
              renderInput={(props) => <input {...props} />}
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 hover:shadow-sm hover:shadow-blue-500/50 transition duration-300 text-sm"
          >
            {isLoading ? <span className="flex flex-row justify-center items-center"><Loader2 className="animate-spin"/><span>Loading...</span></span> : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  );
}
