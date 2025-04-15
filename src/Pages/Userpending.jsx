// import { useEffect, useState } from "react";
// import { useDispatch,useSelector } from "react-redux";
// import { getUserPendingRequests } from "../Services/booksAPI";
// import {
//   BookOpen,
//   CalendarDays,
// } from "lucide-react";

// const MyPending = () => {
//   const dispatch = useDispatch();
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const token = localStorage.getItem("token");
//   const parsedToken = token ? JSON.parse(token) : null;

//   useEffect(() => {
//     fetchRequests();
//   }, []);

//   const fetchRequests = async () => {
//     setLoading(true);
//     try {
//       const response = await dispatch(getUserPendingRequests(parsedToken));
//       setRequests(response.requests);
//     } catch (error) {
//       console.error("Failed to fetch pending requests:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-[#0C0A09] min-h-screen text-[#FAFAF9] px-4 py-12 max-w-5xl mx-auto">
//       <header className="mb-8 text-center">
//         <h1 className="text-3xl md:text-4xl font-bold tracking-wide text-[hsla(21,90%,48%,1)]">
//           Pending Book Requests
//         </h1>
//         <p className="text-[#A8A29E] mt-1">
//           Your book requests that are still waiting for approval
//         </p>
//       </header>

//       {loading ? (
//         <div className="space-y-4">
//           {[...Array(3)].map((_, index) => (
//             <RequestSkeleton key={index} />
//           ))}
//         </div>
//       ) : requests.length === 0 ? (
//         <EmptyState />
//       ) : (
//         <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//           {requests.map((request) => (
//             <RequestCard key={request._id} request={request} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// const RequestCard = ({ request }) => {
//   const formattedDate = new Date(request.requestDate).toLocaleDateString(
//     "en-GB",
//     {
//       day: "numeric",
//       month: "short",
//       year: "numeric",
//     }
//   );

//   return (
//     <div className="bg-[#0c0A09] rounded-xl border-2 border-[hsla(12,7%,15%,1)] p-5 shadow-md hover:shadow-lg transition-shadow duration-300">
//       <h2 className="text-xl font-semibold text-white mb-1">
//         {request.bookId.title}
//       </h2>

//       <div className="flex items-start text-sm text-[#FAFAF9] mb-2">
//         <BookOpen className="w-4 h-4 text-[hsla(21,90%,48%,1)] mr-2 mt-0.5" />
//         <span>Author: {request.bookId.author}</span>
//       </div>

//       <div className="flex items-start text-sm text-[#FAFAF9] mb-2">
//         <CalendarDays className="w-4 h-4 mr-2 text-[hsla(21,90%,48%,1)]" />
//         <span>Requested on: {formattedDate}</span>
//       </div>
//     </div>
//   );
// };

// const EmptyState = () => (
//   <div className="text-center w-fit mx-auto mt-20 py-12 px-4 rounded-lg border-2 border-dashed border-[hsla(12,7%,15%,1)] bg-[#1C1917]">
//     <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[hsla(21,90%,48%,0.1)] mb-4">
//       <div className="h-8 w-8 bg-[hsla(21,90%,48%,1)] rounded-full animate-bounce"></div>
//     </div>
//     <h3 className="text-lg font-semibold text-[#FAFAF9] mb-1">
//       No pending books yet 💤
//     </h3>
//     <p className="text-[#A8A29E] max-w-md mx-auto">
//       Looks like you haven't requested anything recently. Head over to the books
//       list and hit that "Request" button on something exciting 📖✨
//     </p>
//   </div>
// );

// const RequestSkeleton = () => {
//   return (
//     <div className="bg-[#1C1917] rounded-xl border border-[hsla(12,7%,15%,1)] p-5 shadow-md animate-pulse">
//       <div className="h-6 w-3/4 bg-gray-300 rounded mb-3"></div>
//       <div className="flex items-center mb-2">
//         <div className="w-4 h-4 mr-2 bg-gray-300 rounded"></div>
//         <div className="h-4 w-1/2 bg-gray-400 rounded"></div>
//       </div>
//       <div className="flex items-center">
//         <div className="w-4 h-4 mr-2 bg-gray-300 rounded"></div>
//         <div className="h-4 w-1/3 bg-gray-400 rounded"></div>
//       </div>
//     </div>
//   );
// };

// export default MyPending;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserPendingRequests } from "../Services/booksAPI";
import { BookOpen, CalendarDays } from "lucide-react";

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

const MyPending = () => {
  const dispatch = useDispatch();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const parsedToken = token ? JSON.parse(token) : null;
  const currentTheme = useSelector((state) => state.theme.theme);
  const theme = themeStyles[currentTheme.toLowerCase()] || themeStyles["midnight"];

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const response = await dispatch(getUserPendingRequests(parsedToken));
      setRequests(response.requests);
    } catch (error) {
      console.error("Failed to fetch pending requests:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen px-4 py-12 max-w-5xl mx-auto"
      style={{ backgroundColor: theme.background, color: theme.textPrimary }}
    >
      <header className="mb-8 text-center">
        <h1 
          className="text-3xl md:text-4xl font-bold tracking-wide"
          style={{ color: theme.accent }}
        >
          Pending Book Requests
        </h1>
        <p className="mt-1" style={{ color: theme.textMuted }}>
          Your book requests that are still waiting for approval
        </p>
      </header>

      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <RequestSkeleton key={index} theme={theme} />
          ))}
        </div>
      ) : requests.length === 0 ? (
        <EmptyState theme={theme} />
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {requests.map((request) => (
            <RequestCard key={request._id} request={request} theme={theme} />
          ))}
        </div>
      )}
    </div>
  );
};

const RequestCard = ({ request, theme }) => {
  const formattedDate = new Date(request.requestDate).toLocaleDateString(
    "en-GB",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );

  return (
    <div 
      className="rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow duration-300"
      style={{
        backgroundColor: theme.cardBg,
        border: `2px solid ${theme.border}`,
        color: theme.textPrimary
      }}
    >
      <h2 className="text-xl font-semibold mb-1">
        {request.bookId.title}
      </h2>

      <div className="flex items-start text-sm mb-2">
        <BookOpen 
          className="w-4 h-4 mr-2 mt-0.5" 
          style={{ color: theme.accent }} 
        />
        <span>Author: {request.bookId.author}</span>
      </div>

      <div className="flex items-start text-sm mb-2">
        <CalendarDays 
          className="w-4 h-4 mr-2" 
          style={{ color: theme.accent }} 
        />
        <span>Requested on: {formattedDate}</span>
      </div>
    </div>
  );
};

const EmptyState = ({ theme }) => (
  <div 
    className="text-center w-fit mx-auto mt-20 py-12 px-4 rounded-lg border-2 border-dashed"
    style={{
      backgroundColor: theme.cardBg,
      borderColor: theme.border,
    }}
  >
    <div 
      className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
      style={{ backgroundColor: `${theme.accent}20` }}
    >
      <div 
        className="h-8 w-8 rounded-full animate-bounce"
        style={{ backgroundColor: theme.accent }}
      ></div>
    </div>
    <h3 className="text-lg font-semibold mb-1">
      No pending books yet 💤
    </h3>
    <p style={{ color: theme.textMuted }} className="max-w-md mx-auto">
      Looks like you haven't requested anything recently. Head over to the books
      list and hit that "Request" button on something exciting 📖✨
    </p>
  </div>
);

const RequestSkeleton = ({ theme }) => {
  return (
    <div 
      className="rounded-xl p-5 shadow-md animate-pulse"
      style={{
        backgroundColor: theme.cardBg,
        border: `1px solid ${theme.border}`,
      }}
    >
      <div 
        className="h-6 w-3/4 rounded mb-3"
        style={{ backgroundColor: theme.textMuted }}
      ></div>
      <div className="flex items-center mb-2">
        <div 
          className="w-4 h-4 mr-2 rounded"
          style={{ backgroundColor: theme.textMuted }}
        ></div>
        <div 
          className="h-4 w-1/2 rounded"
          style={{ backgroundColor: theme.border }}
        ></div>
      </div>
      <div className="flex items-center">
        <div 
          className="w-4 h-4 mr-2 rounded"
          style={{ backgroundColor: theme.textMuted }}
        ></div>
        <div 
          className="h-4 w-1/3 rounded"
          style={{ backgroundColor: theme.border }}
        ></div>
      </div>
    </div>
  );
};

export default MyPending;





// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getUserPendingRequests } from "../Services/booksAPI";
// import { BookOpen, CalendarDays } from "lucide-react";

// const MyPending = () => {
//   const dispatch = useDispatch();
//   const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const token = localStorage.getItem("token");
//   const parsedToken = token ? JSON.parse(token) : null;

//   useEffect(() => {
//     fetchRequests();
//   }, []);

//   const fetchRequests = async () => {
//     setLoading(true);
//     try {
//       const response = await dispatch(getUserPendingRequests(parsedToken));
//       setRequests(response.requests);
//     } catch (error) {
//       console.error("Failed to fetch pending requests:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const bgColor = isDarkMode ? "bg-white" : "bg-[#0C0A09]";
//   const textColor = isDarkMode ? "text-gray-900" : "text-[#FAFAF9]";
//   const subtleText = isDarkMode ? "text-gray-600" : "text-[#A8A29E]";

//   return (
//     <div
//       className={`${bgColor} ${textColor} min-h-screen transition-colors duration-300 px-4 py-12 max-w-5xl mx-auto`}
//     >
//       <header className="mb-8 text-center">
//         <h1 className="text-3xl md:text-4xl font-bold tracking-wide text-[hsla(21,90%,48%,1)]">
//           Pending Book Requests
//         </h1>
//         <p className={`${subtleText} mt-1`}>
//           Your book requests that are still waiting for approval
//         </p>
//       </header>

//       {loading ? (
//         <div className="space-y-4">
//           {[...Array(3)].map((_, index) => (
//             <RequestSkeleton key={index} isDarkMode={isDarkMode} />
//           ))}
//         </div>
//       ) : requests.length === 0 ? (
//         <EmptyState isDarkMode={isDarkMode} />
//       ) : (
//         <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//           {requests.map((request) => (
//             <RequestCard
//               key={request._id}
//               request={request}
//               isDarkMode={isDarkMode}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// const RequestCard = ({ request, isDarkMode }) => {
//   const formattedDate = new Date(request.requestDate).toLocaleDateString(
//     "en-GB",
//     {
//       day: "numeric",
//       month: "short",
//       year: "numeric",
//     }
//   );

//   const bg = isDarkMode ? "bg-white" : "bg-[#0c0A09]";
//   const border = isDarkMode ? "border-gray-200" : "border-[hsla(12,7%,15%,1)]";
//   const text = isDarkMode ? "text-gray-900" : "text-white";

//   return (
//     <div
//       className={`${bg} rounded-xl border-2 ${border} p-5 shadow-md hover:shadow-lg transition-shadow duration-300`}
//     >
//       <h2 className={`text-xl font-semibold ${text} mb-1`}>
//         {request.bookId.title}
//       </h2>
//       <div className="flex items-start text-sm mb-2">
//         <BookOpen className="w-4 h-4 text-[hsla(21,90%,48%,1)] mr-2 mt-0.5" />
//         <span className={`${text}`}>Author: {request.bookId.author}</span>
//       </div>
//       <div className="flex items-start text-sm">
//         <CalendarDays className="w-4 h-4 mr-2 text-[hsla(21,90%,48%,1)]" />
//         <span className={`${text}`}>Requested on: {formattedDate}</span>
//       </div>
//     </div>
//   );
// };

// const EmptyState = ({ isDarkMode }) => {
//   const bg = isDarkMode ?   "bg-gray-100" :"bg-[#1C1917]";
//   const border = isDarkMode ? "border-gray-300":"border-[hsla(12,7%,15%,1)]" ;
//   const text = isDarkMode ?  "text-gray-900" :"text-[#FAFAF9]" ;
//   const subtext = isDarkMode ?  "text-gray-600":"text-[#A8A29E]" ;

//   return (
//     <div
//       className={`text-center w-fit mx-auto mt-20 py-12 px-4 rounded-lg border-2 border-dashed ${border} ${bg}`}
//     >
//       <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[hsla(21,90%,48%,0.1)] mb-4">
//         <div className="h-8 w-8 bg-[hsla(21,90%,48%,1)] rounded-full animate-bounce"></div>
//       </div>
//       <h3 className={`text-lg font-semibold ${text} mb-1`}>
//         No pending books yet 💤
//       </h3>
//       <p className={`${subtext} max-w-md mx-auto`}>
//         Looks like you haven't requested anything recently. Head over to the
//         books list and hit that "Request" button on something exciting 📖✨
//       </p>
//     </div>
//   );
// };

// const RequestSkeleton = ({ isDarkMode }) => {
//   const bg = isDarkMode ? "bg-[#1C1917]" : "bg-gray-100";
//   const border = isDarkMode ? "border-[hsla(12,7%,15%,1)]" : "border-gray-300";
//   const pulseBg = isDarkMode ? "bg-gray-400" : "bg-gray-300";

//   return (
//     <div
//       className={`${bg} rounded-xl border ${border} p-5 shadow-md animate-pulse`}
//     >
//       <div className={`h-6 w-3/4 ${pulseBg} rounded mb-3`}></div>
//       <div className="flex items-center mb-2">
//         <div className={`w-4 h-4 mr-2 ${pulseBg} rounded`}></div>
//         <div className={`h-4 w-1/2 ${pulseBg} rounded`}></div>
//       </div>
//       <div className="flex items-center">
//         <div className={`w-4 h-4 mr-2 ${pulseBg} rounded`}></div>
//         <div className={`h-4 w-1/3 ${pulseBg} rounded`}></div>
//       </div>
//     </div>
//   );
// };

// export default MyPending;
