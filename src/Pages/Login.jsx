import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import {login} from '../Services/userAPI'
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
const themeStyles = {
  sunset: {
    "background": "hsl(20,14.3%,4.1%)",
    "cardBg": "hsl(20, 14.3%, 4.1%)",
    "border": "hsl(12, 6.5%, 15.1%)",
    "textPrimary": "hsl(60, 9.1%, 97.8%)",
    "textMuted": "hsl(24, 5.4%, 63.9%)",
    "accent": "hsl(20.5, 90.2%, 48.2%)",
    "accentHover": "hsl(20.5, 90.2%, 43%)",
    "inputFocusRing": "hsl(20.5, 90.2%, 48.2%)",
    "buttonText": "hsl(60, 9.1%, 97.8%)"
  }
,
  forest: {
    "background": "hsl(20,14.3%,4.1%)",
    "cardBg": "hsl(24,9.8%,10%)",
    "border": "hsl(240,3.7%,15.9%)",
    "textPrimary": "hsl(0,0%,95%)",
    "textMuted": "hsl(240,5%,64.9%)",
    "accent": "hsl(142.1,70.6%,45.3%)",
    "accentHover": "hsl(142.1,70.6%,40%)",
    "inputFocusRing": "hsl(142.4,71.8%,29.2%)",
    "buttonText": "hsl(144.9,80.4%,10%)"
  },
  midnight:{
    "background": "hsl(224,71.4%,4.1%)",
    "cardBg": "hsl(224,71.4%,4.1%)",
    "border": "hsl(215,27.9%,16.9%)",
    "textPrimary": "hsl(210,20%,98%)",
    "textMuted": "hsl(217.9,10.6%,64.9%)",
    "accent": "hsl(263.4,70%,50.4%)",
    "accentHover": "hsl(263.4,70%,45%)",
    "inputFocusRing": "hsl(263.4,70%,50.4%)",
    "buttonText": "hsl(210,20%,98%)"
  }
  ,
  rose: {
    "background": "hsl(20,14.3%,4.1%)",
    "cardBg": "hsl(24,9.8%,10%)",
    "border": "hsl(240,3.7%,15.9%)",
    "textPrimary": "hsl(0,0%,95%)",
    "textMuted": "hsl(240,5%,64.9%)",
    "accent": "hsl(346.8,77.2%,49.8%)",
    "accentHover": "hsl(346.8,77.2%,45%)",
    "inputFocusRing": "hsl(346.8,77.2%,49.8%)",
    "buttonText": "hsl(355.7,100%,97.3%)"
  }
};

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const currentTheme = useSelector((state) => state.theme.theme);
  const theme = themeStyles[currentTheme.toLowerCase()] || themeStyles["midnight"];
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  console.log('Resolved theme object:', themeStyles[currentTheme.toLowerCase()]);
  console.log(currentTheme)
    const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await dispatch(login(email, password, navigate));
    setIsLoading(false);
  };

    return (
      <div className="min-h-screen flex justify-center items-center px-4" style={{ backgroundColor: theme.background }}>
      <div
        className="max-w-sm w-full p-8 rounded-2xl shadow-xl backdrop-blur-xl border"
        style={{
          backgroundColor: theme.cardBg,
          borderColor: theme.border,
          color: theme.textPrimary
        }}
      >
        <h2 className="text-3xl font-bold text-center tracking-wide">Welcome Back</h2>
        <p className="text-center mt-1" style={{ color: theme.textMuted }}>
          Login to continue
        </p>
  
        <form className="space-y-4 mt-4" onSubmit={handleLogin}>
          {/* Email Field */}
          <div>
            <label className="block text-xs font-medium">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" style={{ color: theme.textMuted }} />
              <input
                type="email"
                placeholder="name@example.com"
                className="w-full pl-9 p-2 rounded-lg bg-transparent text-sm outline-none border focus:ring-2"
                style={{
                  borderColor: theme.border,
                  color: theme.textMuted,
                  caretColor: theme.accent,
                  '--tw-ring-color': theme.inputFocusRing
                }}
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
  
          {/* Password Field */}
          <div>
            <label className="text-xs font-medium flex">
              Password
              <div className="ml-auto text-xs">
                <a href="/forgot-password" style={{ color: theme.accent }} className="hover:underline">
                  Forgot Password?
                </a>
              </div>
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" style={{ color: theme.textMuted }} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full pl-9 pr-9 p-2 rounded-lg bg-transparent text-sm outline-none border focus:ring-2"
                style={{
                  borderColor: theme.border,
                  color: theme.textMuted,
                  caretColor: theme.accent,
                  '--tw-ring-color': theme.inputFocusRing
                }}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2"
                style={{ color: theme.textMuted }}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
  
          {/* Login Button */}
          <button
            type="submit"
            className="active:scale-90 w-full p-2 rounded-lg font-semibold hover:shadow-sm transition duration-300 text-sm flex items-center justify-center"
            style={{
              backgroundColor: theme.accent,
              color: theme.buttonText
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = theme.accentHover)}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = theme.accent)}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex flex-row justify-center items-center">
                <Loader2 className="animate-spin mr-1" />
                <span>Loading...</span>
              </span>
            ) : (
              "Login"
            )}
          </button>
        </form>
  
        {/* Don't have an account? */}
        <div className="text-center text-sm mt-4" style={{ color: theme.textMuted }}>
          Don't have an account?{" "}
          <a href="/signup" style={{ color: theme.accent }} className="hover:underline">
            Sign up
          </a>
        </div>
      </div>
    </div>
      
  );
};

export default Login;



//sunset
// import React, { useState } from "react";
// import { Mail, Lock, Loader2, Eye, EyeOff } from "lucide-react";
// import { login } from "../Services/userAPI";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// export default function Login() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isLoading, setisloading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setisloading(true);
//     await dispatch(login(email, password, navigate));
//     setisloading(false);
//   };

//   return (
//     <div className="bg-[hsl(20,14.3%,4.1%)] min-h-screen flex justify-center items-center px-4">
//       <div className="max-w-sm w-full p-8 rounded-2xl shadow-xl border border-[hsl(12,6.5%,15.1%)] backdrop-blur-xl bg-[hsl(20,14.3%,4.1%)] text-[hsl(60,9.1%,97.8%)]">
//         <h2 className="text-3xl font-bold text-center tracking-wide">Welcome Back</h2>
//         <p className="text-[hsl(24,5.4%,63.9%)] text-center mt-1">Login to continue</p>

//         <form className="space-y-4 mt-4" onSubmit={handleLogin}>
//           {/* Email Field */}
//           <div>
//             <label className="block text-xs font-medium">Email</label>
//             <div className="relative">
//               <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(24,5.4%,63.9%)]" />
//               <input
//                 type="email"
//                 placeholder="name@example.com"
//                 className="w-full pl-9 p-2 border border-[hsl(12,6.5%,15.1%)] rounded-lg bg-transparent text-[hsl(24,5.4%,63.9%)] focus:ring-2 focus:ring-[hsl(20.5,90.2%,48.2%)] outline-none text-sm"
//                 required
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>
//           </div>

//           {/* Password Field */}
//           <div>
//             <label className="text-xs font-medium flex">
//               Password
//               <div className="ml-auto text-xs">
//                 <a
//                   href="/forgot-password"
//                   className="text-[hsl(20.5,90.2%,48.2%)] hover:underline"
//                 >
//                   Forgot Password?
//                 </a>
//               </div>
//             </label>
//             <div className="relative">
//               <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(24,5.4%,63.9%)]" />
//               <input
//                 type={showPassword ? "text" : "password"}
//                 placeholder="••••••••"
//                 className="w-full pl-9 pr-9 p-2 border border-[hsl(12,6.5%,15.1%)] rounded-lg bg-transparent text-[hsl(24,5.4%,63.9%)] focus:ring-2 focus:ring-[hsl(20.5,90.2%,48.2%)] outline-none text-sm"
//                 required
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               <button
//                 type="button"
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-[hsl(24,5.4%,63.9%)]"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//               </button>
//             </div>
//           </div>

//           {/* Login Button */}
//           <button
//             type="submit"
//             className="active:scale-90 w-full p-2 rounded-lg bg-[hsl(20.5,90.2%,48.2%)] text-[hsl(60,9.1%,97.8%)] font-semibold hover:bg-[hsl(20.5,90.2%,43%)] hover:shadow-sm hover:shadow-orange-500/50 transition duration-300 text-sm flex items-center justify-center"
//             disabled={isLoading}
//           >
//             {isLoading ? (
//               <span className="flex flex-row justify-center items-center">
//                 <Loader2 className="animate-spin mr-1" />
//                 <span>Loading...</span>
//               </span>
//             ) : (
//               "Login"
//             )}
//           </button>
//         </form>

//         {/* Don't have an account? */}
//         <div className="text-center text-sm text-[hsl(24,5.4%,63.9%)] mt-4">
//           Don't have an account?{" "}
//           <a href="/signup" className="text-[hsl(20.5,90.2%,48.2%)] hover:underline">
//             Sign up
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// }


// forest
// import React, { useState } from "react";
// import { Mail, Lock, Loader2, Eye, EyeOff } from "lucide-react";
// import { login } from "../Services/userAPI";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// export default function Login() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isLoading, setisloading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setisloading(true);
//     await dispatch(login(email, password, navigate));
//     setisloading(false);
//   };

//   return (
//     <div className="bg-[hsl(20,14.3%,4.1%)] min-h-screen flex justify-center items-center px-4">
//       <div className="max-w-sm w-full p-8 rounded-2xl shadow-xl border border-[hsl(240,3.7%,15.9%)] backdrop-blur-xl bg-[hsl(24,9.8%,10%)] text-[hsl(0,0%,95%)]">
//         <h2 className="text-3xl font-bold text-center tracking-wide">Welcome Back</h2>
//         <p className="text-[hsl(240,5%,64.9%)] text-center mt-1">Login to continue</p>

//         <form className="space-y-4 mt-4" onSubmit={handleLogin}>
//           {/* Email Field */}
//           <div>
//             <label className="block text-xs font-medium">Email</label>
//             <div className="relative">
//               <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(240,5%,64.9%)]" />
//               <input
//                 type="email"
//                 placeholder="name@example.com"
//                 className="w-full pl-9 p-2 border border-[hsl(240,3.7%,15.9%)] rounded-lg bg-transparent text-[hsl(240,5%,64.9%)] focus:ring-2 focus:ring-[hsl(142.4,71.8%,29.2%)] outline-none text-sm"
//                 required
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>
//           </div>

//           {/* Password Field */}
//           <div>
//             <label className="text-xs font-medium flex">
//               Password
//               <div className="ml-auto text-xs">
//                 <a
//                   href="/forgot-password"
//                   className="text-[hsl(142.1,70.6%,45.3%)] hover:underline"
//                 >
//                   Forgot Password?
//                 </a>
//               </div>
//             </label>
//             <div className="relative">
//               <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(240,5%,64.9%)]" />
//               <input
//                 type={showPassword ? "text" : "password"}
//                 placeholder="••••••••"
//                 className="w-full pl-9 pr-9 p-2 border border-[hsl(240,3.7%,15.9%)] rounded-lg bg-transparent text-[hsl(240,5%,64.9%)] focus:ring-2 focus:ring-[hsl(142.4,71.8%,29.2%)] outline-none text-sm"
//                 required
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               <button
//                 type="button"
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-[hsl(240,5%,64.9%)]"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//               </button>
//             </div>
//           </div>

//           {/* Login Button */}
//           <button
//             type="submit"
//             className="active:scale-90 w-full p-2 rounded-lg bg-[hsl(142.1,70.6%,45.3%)] text-[hsl(144.9,80.4%,10%)] font-semibold hover:bg-[hsl(142.1,70.6%,40%)] hover:shadow-sm hover:shadow-green-500/50 transition duration-300 text-sm flex items-center justify-center"
//             disabled={isLoading}
//           >
//             {isLoading ? (
//               <span className="flex flex-row justify-center items-center">
//                 <Loader2 className="animate-spin mr-1" />
//                 <span>Loading...</span>
//               </span>
//             ) : (
//               "Login"
//             )}
//           </button>
//         </form>

//         {/* Don't have an account? */}
//         <div className="text-center text-sm text-[hsl(240,5%,64.9%)] mt-4">
//           Don't have an account?{" "}
//           <a href="/signup" className="text-[hsl(142.1,70.6%,45.3%)] hover:underline">
//             Sign up
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// }

//midnight
// import React, { useState } from "react";
// import { Mail, Lock, Loader2, Eye, EyeOff } from "lucide-react";
// import { login } from "../Services/userAPI";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// export default function Login() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isLoading, setisloading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setisloading(true);
//     await dispatch(login(email, password, navigate));
//     setisloading(false);
//   };

//   return (
//     <div className="bg-[hsl(224,71.4%,4.1%)] min-h-screen flex justify-center items-center px-4">
//       <div className="max-w-sm w-full p-8 rounded-2xl shadow-xl border border-[hsl(215,27.9%,16.9%)] backdrop-blur-xl bg-[hsl(224,71.4%,4.1%)] text-[hsl(210,20%,98%)]">
//         <h2 className="text-3xl font-bold text-center tracking-wide">Welcome Back</h2>
//         <p className="text-[hsl(217.9,10.6%,64.9%)] text-center mt-1">Login to continue</p>

//         <form className="space-y-4 mt-4" onSubmit={handleLogin}>
//           {/* Email Field */}
//           <div>
//             <label className="block text-xs font-medium">Email</label>
//             <div className="relative">
//               <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(217.9,10.6%,64.9%)]" />
//               <input
//                 type="email"
//                 placeholder="name@example.com"
//                 className="w-full pl-9 p-2 border border-[hsl(215,27.9%,16.9%)] rounded-lg bg-transparent text-[hsl(217.9,10.6%,64.9%)] focus:ring-2 focus:ring-[hsl(263.4,70%,50.4%)] outline-none text-sm"
//                 required
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>
//           </div>

//           {/* Password Field */}
//           <div>
//             <label className="text-xs font-medium flex">
//               Password
//               <div className="ml-auto text-xs">
//                 <a
//                   href="/forgot-password"
//                   className="text-[hsl(263.4,70%,50.4%)] hover:underline"
//                 >
//                   Forgot Password?
//                 </a>
//               </div>
//             </label>
//             <div className="relative">
//               <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(217.9,10.6%,64.9%)]" />
//               <input
//                 type={showPassword ? "text" : "password"}
//                 placeholder="••••••••"
//                 className="w-full pl-9 pr-9 p-2 border border-[hsl(215,27.9%,16.9%)] rounded-lg bg-transparent text-[hsl(217.9,10.6%,64.9%)] focus:ring-2 focus:ring-[hsl(263.4,70%,50.4%)] outline-none text-sm"
//                 required
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               <button
//                 type="button"
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-[hsl(217.9,10.6%,64.9%)]"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//               </button>
//             </div>
//           </div>

//           {/* Login Button */}
//           <button
//             type="submit"
//             className="active:scale-90 w-full p-2 rounded-lg bg-[hsl(263.4,70%,50.4%)] text-[hsl(210,20%,98%)] font-semibold hover:bg-[hsl(263.4,70%,45%)] hover:shadow-sm hover:shadow-violet-500/50 transition duration-300 text-sm flex items-center justify-center"
//             disabled={isLoading}
//           >
//             {isLoading ? (
//               <span className="flex flex-row justify-center items-center">
//                 <Loader2 className="animate-spin mr-1" />
//                 <span>Loading...</span>
//               </span>
//             ) : (
//               "Login"
//             )}
//           </button>
//         </form>

//         {/* Don't have an account? */}
//         <div className="text-center text-sm text-[hsl(217.9,10.6%,64.9%)] mt-4">
//           Don't have an account?{" "}
//           <a href="/signup" className="text-[hsl(263.4,70%,50.4%)] hover:underline">
//             Sign up
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// }


//rose
// import React, { useState } from "react";
// import { Mail, Lock, Loader2, Eye, EyeOff } from "lucide-react";
// import { login } from "../Services/userAPI";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// export default function Login() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isLoading, setisloading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setisloading(true);
//     await dispatch(login(email, password, navigate));
//     setisloading(false);
//   };

//   return (
//     <div className="bg-[hsl(20,14.3%,4.1%)] min-h-screen flex justify-center items-center px-4">
//       <div className="max-w-sm w-full p-8 rounded-2xl shadow-xl border border-[hsl(240,3.7%,15.9%)] backdrop-blur-xl bg-[hsl(24,9.8%,10%)] text-[hsl(0,0%,95%)]">
//         <h2 className="text-3xl font-bold text-center tracking-wide">Welcome Back</h2>
//         <p className="text-[hsl(240,5%,64.9%)] text-center mt-1">Login to continue</p>

//         <form className="space-y-4 mt-4" onSubmit={handleLogin}>
//           {/* Email Field */}
//           <div>
//             <label className="block text-xs font-medium">Email</label>
//             <div className="relative">
//               <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(240,5%,64.9%)]" />
//               <input
//                 type="email"
//                 placeholder="name@example.com"
//                 className="w-full pl-9 p-2 border border-[hsl(240,3.7%,15.9%)] rounded-lg bg-transparent text-[hsl(240,5%,64.9%)] focus:ring-2 focus:ring-[hsl(346.8,77.2%,49.8%)] outline-none text-sm"
//                 required
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>
//           </div>

//           {/* Password Field */}
//           <div>
//             <label className="text-xs font-medium flex">
//               Password
//               <div className="ml-auto text-xs">
//                 <a
//                   href="/forgot-password"
//                   className="text-[hsl(346.8,77.2%,49.8%)] hover:underline"
//                 >
//                   Forgot Password?
//                 </a>
//               </div>
//             </label>
//             <div className="relative">
//               <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(240,5%,64.9%)]" />
//               <input
//                 type={showPassword ? "text" : "password"}
//                 placeholder="••••••••"
//                 className="w-full pl-9 pr-9 p-2 border border-[hsl(240,3.7%,15.9%)] rounded-lg bg-transparent text-[hsl(240,5%,64.9%)] focus:ring-2 focus:ring-[hsl(346.8,77.2%,49.8%)] outline-none text-sm"
//                 required
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               <button
//                 type="button"
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-[hsl(240,5%,64.9%)]"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//               </button>
//             </div>
//           </div>

//           {/* Login Button */}
//           <button
//             type="submit"
//             className="active:scale-90 w-full p-2 rounded-lg bg-[hsl(346.8,77.2%,49.8%)] text-[hsl(355.7,100%,97.3%)] font-semibold hover:bg-[hsl(346.8,77.2%,45%)] hover:shadow-sm hover:shadow-rose-500/50 transition duration-300 text-sm flex items-center justify-center"
//             disabled={isLoading}
//           >
//             {isLoading ? (
//               <span className="flex flex-row justify-center items-center">
//                 <Loader2 className="animate-spin mr-1" />
//                 <span>Loading...</span>
//               </span>
//             ) : (
//               "Login"
//             )}
//           </button>
//         </form>

//         {/* Don't have an account? */}
//         <div className="text-center text-sm text-[hsl(240,5%,64.9%)] mt-4">
//           Don't have an account?{" "}
//           <a href="/signup" className="text-[hsl(346.8,77.2%,49.8%)] hover:underline">
//             Sign up
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// }
