// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import NotebookSVG from "../assets/undraw_book-lover_cmz5.svg";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// export default function Home() {
//   const [recommendations, setRecommendations] = useState([]);
//   const [loadingRecommendations, setLoadingRecommendations] = useState(true);
//   const bookQuery = useSelector((state) => state.lastSearch.lastSearch);

//   const naviagte = useNavigate();
  
//   useEffect(() => {
//     const fetchRecommendations = async () => {
//       setLoadingRecommendations(true);
//       try {
//         const response = await axios.post(
//           "http://localhost:5001/api/recommend",
//           { bookQuery }
//         );
//         console.log("bookQuery:", bookQuery);
//         console.log("Recommendations:", response.data);
//         setRecommendations(response.data.recommendations);
//       } catch (error) {
//         console.error("Error fetching recommendations:", error);
//       } finally {
//         setLoadingRecommendations(false);
//       }
//     };
//     fetchRecommendations();
//   }, [bookQuery]);

//   return (
//     <div className="flex flex-col min-h-screen w-full bg-[#0C0A09] text-[#FAFAF9] relative overflow-hidden p-10 py-4">
//       <div className="absolute top-0 right-0 w-64 h-64 bg-[hsla(21,90%,48%,0.1)] rounded-full filter blur-3xl opacity-20 -z-10"></div>
//       <div className="absolute bottom-0 left-0 w-80 h-80 bg-[hsla(204,70%,53%,0.1)] rounded-full filter blur-3xl opacity-20 -z-10"></div>

//       <div className="container max-w-6xl mx-auto px-4 py-10 flex flex-col gap-10">
//         <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
//           {/* Left Section */}
//           <div className="flex-1 space-y-6">
//             <div className="flex items-center gap-2">
//               <svg
//                 className="h-8 w-8 text-[hsla(21,90%,48%,1)]"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="1"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               >
//                 <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
//                 <path d="M8 7h6" />
//                 <path d="M8 11h8" />
//                 <path d="M8 15h6" />
//               </svg>
//               <h1 className="text-2xl font-bold text-[#FAFAF9] flex">
//                 <span className="bg-transparent rounded-md p-1 pl-0">
//                   Library
//                 </span>
//                 <span className="bg-[hsla(21,90%,48%,1)] text-black rounded-md p-1">
//                   Hub
//                 </span>
//               </h1>
//             </div>
//             <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
//               Discover Your{" "}
//               <span className="text-[hsla(21,90%,48%,1)]">Next</span> Great{" "}
//               <span className="text-[hsla(21,90%,48%,1)]">Read</span>
//             </h2>
//             <p className="text-[#A8A29E] text-lg max-w-md">
//               Access thousands of books, manage your loans, and discover new
//               favorites with our modern library system.
//             </p>
//             <div className="flex flex-wrap gap-4">
//               {/* 🎯 Hover Effect Buttons */}
//               <button onClick={() => naviagte('/allbooks')} className="bg-[hsla(21,90%,48%,1)] hover:bg-[hsla(21,90%,48%,0.9)] hover:scale-105 transition-transform shadow-md text-[#FAFAF9] rounded-full px-6 py-2">
//                 Browse Catalog
//               </button>
//               <button onClick={() => naviagte('/settings')} className="border border-[hsla(21,90%,48%,0.4)] hover:border-[hsla(21,90%,48%,1)] hover:scale-105 transition-transform shadow-md text-[hsla(21,90%,48%,1)] rounded-full px-6 py-2">
//                 My Account
//               </button>
//             </div>
//           </div>

//           {/* Right Section - Replaced SVG */}
//           <div className="flex-1 flex justify-center items-center relative">
//             <img
//               src={NotebookSVG}
//               alt="Notebook illustration"
//               className="h-[280px] w-[280px] sm:h-[360px] sm:w-[360px] object-contain transition-all duration-500 mt-10"
//             />

//             {/* Top Badge */}
//             <div className="absolute top-4 right-4 bg-[#1C1917]/90 backdrop-blur-md p-3 py-2 rounded-2xl shadow-lg flex items-center gap-2 animate-bouncee2 text-[#FAFAF9] ring-1 ring-[hsla(21,90%,48%,0.4)]">
//               <svg
//                 className="h-3 w-3 text-[hsla(21,90%,48%,1)]"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 viewBox="0 0 24 24"
//               >
//                 <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
//               </svg>
//               <span className="font-medium text-xs">500+ Books</span>
//             </div>
//             {/* Bottom Badge */}
//             <div className="absolute bottom-4 left-4 bg-[#1C1917]/90 backdrop-blur-md p-3 py-2 rounded-2xl shadow-lg flex items-center gap-2 animate-bouncee text-[#FAFAF9] ring-1 ring-[hsla(21,90%,48%,0.4)]">
//               <svg
//                 className="h-3 w-3 text-[hsla(21,90%,48%,1)]"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 viewBox="0 0 24 24"
//               >
//                 <circle cx="12" cy="12" r="10" />
//                 <polyline points="12 6 12 12 16 14" />
//               </svg>
//               <span className="font-medium text-xs">24/7 Access</span>
//             </div>
//           </div>
//           <style>
//             {`
//             @keyframes bouncee2 {
//                       0%, 100% {
//                       transform: none;
//                       animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
//                     }
//                       50% {
                        
//                         transform: translateY(-25%);
//                         animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
//                       }
//                     }
//                   .animate-bouncee2 {
//                     animation: bounce 2s infinite;
//                   }
//       @keyframes bouncee {
//                     0%, 100% {
//                       transform: translateY(-25%);
//                       animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
//                     }
//                     50% {
//                       transform: none;
//                       animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
//                     }
//                   }
//             .animate-bouncee {
//               animation: bounce 2s infinite;
//             }
//   `}
//           </style>
//         </div>

//         {/* Recommended Books Section */}
//         <div className="w-full">
//           <h3 className="text-xl font-semibold text-[#FAFAF9] mb-4">
//             Recommended Books
//           </h3>
//           <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
//             {loadingRecommendations ? (
//               // Render skeleton loaders while recommendations are loading
//               [...Array(4)].map((_, index) => (
//                 <div
//                   key={index}
//                   className="animate-pulse group relative overflow-hidden rounded-xl border border-[hsla(12,7%,15%,1)] bg-[#1C1917] shadow-sm transition-all duration-300"
//                 >
//                   <div className="h-56 w-full bg-gray-300 rounded"></div>
//                   <div className="p-3">
//                     <div className="h-3 w-3/4 bg-gray-300 rounded mb-1"></div>
//                     <div className="h-2 w-1/2 bg-gray-300 rounded"></div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               // Render recommendations when loading is complete
//               recommendations.map((book, index) => (
//                 <div
//                   key={index}
//                   className="group relative overflow-hidden rounded-xl border border-[hsla(12,7%,15%,1)] bg-[#1C1917] shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1"
//                 >
//                   <a href="#" className="absolute inset-0 z-10">
//                     <span className="sr-only">{book.title}</span>
//                   </a>
//                   <img
//                     src={book.imageUrl}
//                     alt={book.title}
//                     className="object-cover aspect-[2/3] w-full transition-transform duration-300 group-hover:scale-105"
//                   />
//                   <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent p-3 text-white">
//                     <h3 className="font-medium text-sm line-clamp-1">
//                       {book.title}
//                     </h3>
//                     <p className="text-xs opacity-85">{book.author}</p>
//                   </div>
//                   <div className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-[hsla(0,0%,100%,0.1)] px-2 py-1 text-xs text-[#FAFAF9] backdrop-blur">
//                     <svg
//                       className="h-3 w-3 text-[hsla(21,90%,48%,1)]"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       viewBox="0 0 24 24"
//                     >
//                       <circle cx="12" cy="12" r="10" />
//                       <polyline points="12 6 12 12 16 14" />
//                     </svg>
//                     <span>{book.isAvailable || "Available"}</span>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import axios from "axios";
import NotebookSVG from "../assets/undraw_book-lover_cmz5.svg";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

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
    background: "hsl(150, 25%, 5%)",
    cardBg: "hsl(150, 20%, 10%)",
    border: "hsl(150, 10%, 20%)",
    textPrimary: "hsl(0, 0%, 95%)",
    textMuted: "hsl(150, 10%, 60%)",
    accent: "hsl(140, 70%, 45%)",
    accentHover: "hsl(140, 70%, 38%)",
    inputFocusRing: "hsl(140, 80%, 25%)",
    buttonText: "hsl(140, 100%, 10%)",
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
    background: "hsl(340, 20%, 6%)",
    cardBg: "hsl(345, 15%, 12%)",
    border: "hsl(345, 10%, 22%)",
    textPrimary: "hsl(0, 0%, 96%)",
    textMuted: "hsl(345, 10%, 65%)",
    accent: "hsl(346, 75%, 50%)",
    accentHover: "hsl(346, 75%, 42%)",
    inputFocusRing: "hsl(346, 85%, 40%)",
    buttonText: "hsl(350, 100%, 98%)",
  },
};

export default function Home() {
  const [recommendations, setRecommendations] = useState([]);
  const [loadingRecommendations, setLoadingRecommendations] = useState(true);
  const bookQuery = useSelector((state) => state.lastSearch.lastSearch);
  const currentTheme = useSelector((state) => state.theme.theme);
  const theme = themeStyles[currentTheme.toLowerCase()] || themeStyles["midnight"];
  const naviagte = useNavigate();
  
  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoadingRecommendations(true);
      try {
        const response = await axios.post(
          "http://localhost:5001/api/recommend",
          { bookQuery }
        );
        console.log("bookQuery:", bookQuery);
        console.log("Recommendations:", response.data);
        setRecommendations(response.data.recommendations);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      } finally {
        setLoadingRecommendations(false);
      }
    };
    fetchRecommendations();
  }, [bookQuery]);

  return (
    <div 
      className="flex flex-col min-h-screen w-full relative overflow-hidden p-10 py-4"
      style={{ backgroundColor: theme.background, color: theme.textPrimary }}
    >
      <div 
        className="absolute top-0 right-0 w-64 h-64 rounded-full filter blur-3xl opacity-20 -z-10"
        style={{ backgroundColor: theme.accent }}
      ></div>
      <div 
        className="absolute bottom-0 left-0 w-80 h-80 rounded-full filter blur-3xl opacity-20 -z-10"
        style={{ backgroundColor: theme.inputFocusRing }}
      ></div>

      <div className="container max-w-6xl mx-auto px-4 py-10 flex flex-col gap-10">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
          {/* Left Section */}
          <div className="flex-1 space-y-6">
            <div className="flex items-center gap-2">
              <svg
                className="h-8 w-8"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ color: theme.accent }}
              >
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                <path d="M8 7h6" />
                <path d="M8 11h8" />
                <path d="M8 15h6" />
              </svg>
              <h1 className="text-2xl font-bold flex">
                <span className="rounded-md p-1 pl-0">
                  Library
                </span>
                <span 
                  className="rounded-md p-1"
                  style={{ 
                    backgroundColor: theme.accent,
                    color: theme.buttonText
                  }}
                >
                  Hub
                </span>
              </h1>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Discover Your{" "}
              <span style={{ color: theme.accent }}>Next</span> Great{" "}
              <span style={{ color: theme.accent }}>Read</span>
            </h2>
            <p className="text-lg max-w-md" style={{ color: theme.textMuted }}>
              Access thousands of books, manage your loans, and discover new
              favorites with our modern library system.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => naviagte('/allbooks')} 
                className="hover:scale-105 transition-transform shadow-md rounded-full px-6 py-2"
                style={{
                  backgroundColor: theme.accent,
                  color: theme.buttonText,
                  "&:hover": { backgroundColor: theme.accentHover }
                }}
              >
                Browse Catalog
              </button>
              <button 
                onClick={() => naviagte('/settings')} 
                className="hover:scale-105 transition-transform shadow-md rounded-full px-6 py-2"
                style={{
                  border: `1px solid ${theme.accent}40`,
                  color: theme.accent,
                  "&:hover": { borderColor: theme.accent }
                }}
              >
                My Account
              </button>
            </div>
          </div>

          {/* Right Section - Replaced SVG */}
          <div className="flex-1 flex justify-center items-center relative">
            <img
              src={NotebookSVG}
              alt="Notebook illustration"
              className="h-[280px] w-[280px] sm:h-[360px] sm:w-[360px] object-contain transition-all duration-500 mt-10"
            />

            {/* Top Badge */}
            <div 
              className="absolute top-4 right-4 backdrop-blur-md p-3 py-2 rounded-2xl shadow-lg flex items-center gap-2 animate-bouncee2"
              style={{
                backgroundColor: `${theme.cardBg}90`,
                color: theme.textPrimary,
                border: `1px solid ${theme.accent}40`
              }}
            >
              <svg
                className="h-3 w-3"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                style={{ color: theme.accent }}
              >
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
              </svg>
              <span className="font-medium text-xs">500+ Books</span>
            </div>
            {/* Bottom Badge */}
            <div 
              className="absolute bottom-4 left-4 backdrop-blur-md p-3 py-2 rounded-2xl shadow-lg flex items-center gap-2 animate-bouncee"
              style={{
                backgroundColor: `${theme.cardBg}90`,
                color: theme.textPrimary,
                border: `1px solid ${theme.accent}40`
              }}
            >
              <svg
                className="h-3 w-3"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                style={{ color: theme.accent }}
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span className="font-medium text-xs">24/7 Access</span>
            </div>
          </div>
          <style>
            {`
            @keyframes bouncee2 {
              0%, 100% {
                transform: none;
                animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
              }
              50% {
                transform: translateY(-25%);
                animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
              }
            }
            .animate-bouncee2 {
              animation: bounce 2s infinite;
            }
            @keyframes bouncee {
              0%, 100% {
                transform: translateY(-25%);
                animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
              }
              50% {
                transform: none;
                animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
              }
            }
            .animate-bouncee {
              animation: bounce 2s infinite;
            }
            `}
          </style>
        </div>

        {/* Recommended Books Section */}
        <div className="w-full">
          <h3 className="text-xl font-semibold mb-4">
            Recommended Books
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {loadingRecommendations ? (
              [...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse group relative overflow-hidden rounded-xl shadow-sm transition-all duration-300"
                  style={{
                    backgroundColor: theme.cardBg,
                    border: `1px solid ${theme.border}`
                  }}
                >
                  <div 
                    className="h-56 w-full rounded"
                    style={{ backgroundColor: theme.border }}
                  ></div>
                  <div className="p-3">
                    <div 
                      className="h-3 w-3/4 rounded mb-1"
                      style={{ backgroundColor: theme.border }}
                    ></div>
                    <div 
                      className="h-2 w-1/2 rounded"
                      style={{ backgroundColor: theme.border }}
                    ></div>
                  </div>
                </div>
              ))
            ) : (
              recommendations.map((book, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-xl shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1"
                  style={{
                    backgroundColor: theme.cardBg,
                    border: `1px solid ${theme.border}`
                  }}
                >
                  <a href="#" className="absolute inset-0 z-10">
                    <span className="sr-only">{book.title}</span>
                  </a>
                  <img
                    src={book.imageUrl}
                    alt={book.title}
                    className="object-cover aspect-[2/3] w-full transition-transform duration-300 group-hover:scale-105"
                  />
                  <div 
                    className="absolute bottom-0 w-full bg-gradient-to-t p-3"
                    style={{
                      background: `linear-gradient(to top, ${theme.background}80, transparent)`,
                      color: theme.textPrimary
                    }}
                  >
                    <h3 className="font-medium text-sm line-clamp-1">
                      {book.title}
                    </h3>
                    <p className="text-xs opacity-85">{book.author}</p>
                  </div>
                  <div 
                    className="absolute right-2 top-2 flex items-center gap-1 rounded-full px-2 py-1 text-xs backdrop-blur"
                    style={{
                      backgroundColor: `${theme.textPrimary}10`,
                      color: theme.textPrimary
                    }}
                  >
                    <svg
                      className="h-3 w-3"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      style={{ color: theme.accent }}
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <span>{book.isAvailable || "Available"}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
