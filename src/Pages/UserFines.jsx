// import React, { useEffect, useState } from "react";
// import { useDispatch,useSelector } from "react-redux";
// import { fethcFinesToUser } from "../Services/booksAPI";
// import { BookOpen, CalendarDays } from "lucide-react";

// export default function UserFines() {
//   const dispatch = useDispatch();
//   const token = localStorage.getItem("token");
//   const parsedToken = token ? JSON.parse(token) : null;

//   const [booksWithFines, setBooksWithFines] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchFines = async () => {
//       setLoading(true);
//       const data = await dispatch(fethcFinesToUser(parsedToken));
//       if (data?.data) {
//         setBooksWithFines(data.data);
//       }
//       setLoading(false);
//     };

//     if (token) fetchFines();
//   }, [dispatch, token]);

//   return (
//     <div className="bg-[#0C0A09] min-h-screen text-[#FAFAF9] px-4 py-12 max-w-5xl mx-auto">
//       <header className="mb-8 text-center">
//         <h1 className="text-3xl md:text-4xl font-bold tracking-wide text-[hsla(21,90%,48%,1)]">
//           Your Book Fines
//         </h1>
//         <p className="text-[#A8A29E] mt-1">
//           Manage your dues and return books on time 
//         </p>
//       </header>

//       {loading ? (
//         <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//           {[...Array(7)].map((_, index) => (
//             <RequestSkeleton key={index} />
//           ))}
//         </div>
//       ) : booksWithFines.length === 0 ? (
//         <EmptyState />
//       ) : (
//         <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//           {booksWithFines.map((book, index) => (
//             <FineCard key={index} book={book} />
//           ))}
//         </div>
//       )}
//     </div>
//   );

//   function FineCard({ book }) {
//     return (
//       <div className="bg-[#0C0A09] rounded-xl border-2 border-[hsla(12,7%,15%,1)] p-5 shadow-md hover:shadow-lg transition-shadow duration-300">
//         <h2 className="text-xl font-semibold text-white mb-1">
//           {book.title}
//         </h2>

//         <div className="flex items-start text-sm text-[#FAFAF9] mt-3">
//           <span>Author: {book.author}</span>
//         </div>

        
//         <p className="mt-3 text-red-500 font-bold text-sm md:text-base">
//                   Fine: ₹{book.fineAmount}
//                 </p>
        
//       </div>
//     );
//   }

//   function EmptyState() {
//     return (
//       <div className="text-center w-fit mx-auto mt-20 py-12 px-4 rounded-lg border-2 border-dashed border-[hsla(12,7%,15%,1)] bg-[#1C1917]">
//         <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[hsla(21,90%,48%,0.1)] mb-4">
//           <div className="h-8 w-8 bg-[hsla(21,90%,48%,1)] rounded-full animate-bounce"></div>
//         </div>
//         <h3 className="text-lg font-semibold text-[#FAFAF9] mb-1">
//           No books with fines 🎉
//         </h3>
//         <p className="text-[#A8A29E] max-w-md mx-auto">
//           Looks like you have no fines. Keep up the good work! 📖✨
//         </p>
//       </div>
//     );
//   }

//   function RequestSkeleton() {
//     return (
//       <div className="bg-[#1C1917] rounded-xl border border-[hsla(12,7%,15%,1)] p-5 shadow-md animate-pulse">
//         <div className="h-6 w-3/4 bg-gray-300 rounded mb-3"></div>
//         <div className="flex items-center mb-2">
//           <div className="w-4 h-4 mr-2 bg-gray-300 rounded"></div>
//           <div className="h-4 w-1/2 bg-gray-400 rounded"></div>
//         </div>
//         <div className="flex items-center">
//           <div className="w-4 h-4 mr-2 bg-gray-300 rounded"></div>
//           <div className="h-4 w-1/3 bg-gray-400 rounded"></div>
//         </div>
//       </div>
//     );
//   }
// }
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fethcFinesToUser } from "../Services/booksAPI";
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

export default function UserFines() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const parsedToken = token ? JSON.parse(token) : null;
  const currentTheme = useSelector((state) => state.theme.theme);
  const theme = themeStyles[currentTheme.toLowerCase()] || themeStyles["midnight"];

  const [booksWithFines, setBooksWithFines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFines = async () => {
      setLoading(true);
      const data = await dispatch(fethcFinesToUser(parsedToken));
      if (data?.data) {
        setBooksWithFines(data.data);
      }
      setLoading(false);
    };

    if (token) fetchFines();
  }, [dispatch, token]);

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
          Your Book Fines
        </h1>
        <p className="mt-1" style={{ color: theme.textMuted }}>
          Manage your dues and return books on time 
        </p>
      </header>

      {loading ? (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(7)].map((_, index) => (
            <RequestSkeleton key={index} theme={theme} />
          ))}
        </div>
      ) : booksWithFines.length === 0 ? (
        <EmptyState theme={theme} />
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {booksWithFines.map((book, index) => (
            <FineCard key={index} book={book} theme={theme} />
          ))}
        </div>
      )}
    </div>
  );

  function FineCard({ book, theme }) {
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
          {book.title}
        </h2>

        <div className="flex items-start text-sm mt-3" style={{ color: theme.textMuted }}>
          <span>Author: {book.author}</span>
        </div>

        <p className="mt-3 font-bold text-sm md:text-base" style={{ color: theme.accent }}>
          Fine: ₹{book.fineAmount}
        </p>
      </div>
    );
  }

  function EmptyState({ theme }) {
    return (
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
          No books with fines 🎉
        </h3>
        <p className="max-w-md mx-auto" style={{ color: theme.textMuted }}>
          Looks like you have no fines. Keep up the good work! 📖✨
        </p>
      </div>
    );
  }

  function RequestSkeleton({ theme }) {
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
  }
}
