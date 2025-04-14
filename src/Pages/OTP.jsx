import { useState, useEffect } from "react";
import OTPInput from "react-otp-input";
import { signUp } from "../Services/userAPI";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";

const themeStyles = {
  sunset: {
    background: "hsl(20,14.3%,4.1%)",
    cardBg: "hsl(20, 14.3%, 4.1%)",
    border: "hsl(12, 6.5%, 15.1%)",
    textPrimary: "hsl(60, 9.1%, 97.8%)",
    textMuted: "hsl(24, 5.4%, 63.9%)",
    accent: "hsl(20.5, 90.2%, 48.2%)",
    accentHover: "hsl(20.5, 90.2%, 43%)",
    inputFocusRing: "hsl(20.5, 90.2%, 48.2%)",
    buttonText: "hsl(60, 9.1%, 97.8%)",
  },
  forest: {
  background: "hsl(150, 25%, 5%)",           // deeper forest green-black
  cardBg: "hsl(150, 20%, 10%)",              // soft forest green-dark
  border: "hsl(150, 10%, 20%)",              // subtle greenish-gray
  textPrimary: "hsl(0, 0%, 95%)",            // bright white
  textMuted: "hsl(150, 10%, 60%)",           // muted sage tone
  accent: "hsl(140, 70%, 45%)",              // vibrant leaf green
  accentHover: "hsl(140, 70%, 38%)",         // darker leaf green on hover
  inputFocusRing: "hsl(140, 80%, 25%)",      // strong jungle green
  buttonText: "hsl(140, 100%, 10%)",         // very dark green
},
  midnight: {
    background: "hsl(224,71.4%,4.1%)",
    cardBg: "hsl(224,71.4%,4.1%)",
    border: "hsl(215,27.9%,16.9%)",
    textPrimary: "hsl(210,20%,98%)",
    textMuted: "hsl(217.9,10.6%,64.9%)",
    accent: "hsl(263.4,70%,50.4%)",
    accentHover: "hsl(263.4,70%,45%)",
    inputFocusRing: "hsl(263.4,70%,50.4%)",
    buttonText: "hsl(210,20%,98%)",
  },
  rose: {
  background: "hsl(340, 20%, 6%)",             // deep rose-black with subtle warmth
  cardBg: "hsl(345, 15%, 12%)",                // dark rose-tinted card
  border: "hsl(345, 10%, 22%)",                // warm rose-gray for softer edges
  textPrimary: "hsl(0, 0%, 96%)",              // soft white for high readability
  textMuted: "hsl(345, 10%, 65%)",             // muted dusty rose
  accent: "hsl(346, 75%, 50%)",                // rich vibrant rose
  accentHover: "hsl(346, 75%, 42%)",           // darker rose on hover
  inputFocusRing: "hsl(346, 85%, 40%)",        // slightly deeper pink-red for focus
  buttonText: "hsl(350, 100%, 98%)",           // pale rose-white for contrast
},
};

export default function OTP() {
  const [otp, setOtp] = useState("");
  const location = useLocation();
  const signupData = location.state?.signupData;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const currentTheme = useSelector((state) => state.theme.theme);
  const theme = themeStyles[currentTheme.toLowerCase()] || themeStyles["midnight"];

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
    <div className="min-h-screen flex justify-center items-center px-4" style={{ backgroundColor: theme.background }}>
      <div
        className="max-w-sm w-full p-8 rounded-2xl shadow-xl border"
        style={{
          backgroundColor: theme.cardBg,
          borderColor: theme.border,
          color: theme.textPrimary,
        }}
      >
        <h2 className="text-3xl font-bold text-center tracking-wide" style={{ color: theme.textPrimary }}>Verify OTP</h2>
        <p className="text-center mt-1" style={{ color: theme.textMuted }}>Enter the 6-digit code sent to your email</p>

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
                border: `1px solid ${theme.border}`,
                backgroundColor: "transparent",
                color: theme.textPrimary,
                textAlign: "center",
              }}
              renderInput={(props) => <input {...props} />}
            />
          </div>

          <button
            type="submit"
            className="w-full p-2 rounded-lg font-semibold hover:shadow-sm transition duration-300 text-sm flex items-center justify-center"
            style={{
              backgroundColor: theme.accent,
              color: theme.buttonText,
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = theme.accentHover)}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = theme.accent)}
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