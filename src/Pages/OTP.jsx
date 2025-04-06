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
    setIsLoading(true);

    dispatch(signUp(name, email, password, otp, navigate));
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="bg-[hsla(240,10%,4%,1)] min-h-screen flex justify-center items-center px-4">
      <div className="max-w-sm w-full p-8 rounded-2xl shadow-xl border border-[hsla(12,7%,15%,1)] backdrop-blur-xl bg-[#0c0A09] text-[#FAFAF9]">
        <h2 className="text-3xl font-bold text-center tracking-wide text-[#FAFAF9]">Verify OTP</h2>
        <p className="text-[#A8A29E] text-center mt-1">Enter the 6-digit code sent to your email</p>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div className="flex justify-center">
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              shouldAutoFocus
              inputStyle={{
                width: "2.5rem",
                height: "2.5rem",
                margin: "0 0.4rem",
                fontSize: "1rem",
                borderRadius: "0.5rem",
                border: "1px solid hsla(12,7%,15%,1)",
                backgroundColor: "transparent",
                color: "#FAFAF9",
                textAlign: "center",
              }}
              renderInput={(props) => <input {...props} />}
            />
          </div>

          <button
            type="submit"
            className="w-full p-2 rounded-lg bg-[hsla(21,90%,48%,1)] text-[#FAFAF9] active:scale-90 font-semibold hover:bg-[hsla(21,90%,48%,0.7)] hover:shadow-sm hover:shadow-blue-500/50 transition duration-300 text-sm flex items-center justify-center"
          >
            {isLoading ? (
              <span className="flex flex-row justify-center items-center">
                <Loader2 className="animate-spin mr-1" />
                <span>Verifying...</span>
              </span>
            ) : (
              "Verify OTP"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
