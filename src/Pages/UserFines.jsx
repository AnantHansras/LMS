// import React, { useEffect, useState } from "react";
// import { useDispatch,useSelector } from "react-redux";
// import { fethcFinesToUser } from "../Services/booksAPI";
// import { BookOpen, CalendarDays } from "lucide-react";

// export default function UserFines() {
//   const dispatch = useDispatch();
//   const token = localStorage.getItem("token");
//   const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);
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

export default function UserFines() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);
  const parsedToken = token ? JSON.parse(token) : null;

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

  const bgMain = isDarkMode ? "bg-white text-gray-900" : "bg-[#0C0A09] text-[#FAFAF9]";
  const bgCard = isDarkMode ? "bg-gray-100 border-gray-300" : "bg-[#0C0A09] border-[hsla(12,7%,15%,1)]";
  const skeletonCard = isDarkMode ? "bg-gray-200 border-gray-300" : "bg-[#1C1917] border-[hsla(12,7%,15%,1)]";
  const emptyStateBg = isDarkMode ? "bg-gray-100 border-gray-300" : "bg-[#1C1917] border-[hsla(12,7%,15%,1)]";

  return (
    <div className={`${bgMain} min-h-screen px-4 py-12 max-w-5xl mx-auto transition-colors duration-300`}>
      <header className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold tracking-wide text-[hsla(21,90%,48%,1)]">
          Your Book Fines
        </h1>
        <p className={`${isDarkMode ? "text-gray-600" : "text-[#A8A29E]"} mt-1`}>
          Manage your dues and return books on time 
        </p>
      </header>

      {loading ? (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(7)].map((_, index) => (
            <RequestSkeleton key={index} />
          ))}
        </div>
      ) : booksWithFines.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {booksWithFines.map((book, index) => (
            <FineCard key={index} book={book} />
          ))}
        </div>
      )}
    </div>
  );

  function FineCard({ book }) {
    return (
      <div className={`${bgCard} rounded-xl border-2 p-5 shadow-md hover:shadow-lg transition-shadow duration-300`}>
        <h2 className="text-xl font-semibold mb-1">
          {book.title}
        </h2>

        <div className="flex items-start text-sm mt-3">
          <span>Author: {book.author}</span>
        </div>

        <p className="mt-3 text-red-500 font-bold text-sm md:text-base">
          Fine: ₹{book.fineAmount}
        </p>
      </div>
    );
  }

  function EmptyState() {
    return (
      <div className={`text-center w-fit mx-auto mt-20 py-12 px-4 rounded-lg border-2 border-dashed ${emptyStateBg}`}>
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[hsla(21,90%,48%,0.1)] mb-4">
          <div className="h-8 w-8 bg-[hsla(21,90%,48%,1)] rounded-full animate-bounce"></div>
        </div>
        <h3 className="text-lg font-semibold mb-1">
          No books with fines 🎉
        </h3>
        <p className={`${isDarkMode ? "text-gray-600" : "text-[#A8A29E]"} max-w-md mx-auto`}>
          Looks like you have no fines. Keep up the good work! 📖✨
        </p>
      </div>
    );
  }

  function RequestSkeleton() {
    return (
      <div className={`${skeletonCard} rounded-xl border p-5 shadow-md animate-pulse`}>
        <div className="h-6 w-3/4 bg-gray-300 rounded mb-3"></div>
        <div className="flex items-center mb-2">
          <div className="w-4 h-4 mr-2 bg-gray-300 rounded"></div>
          <div className="h-4 w-1/2 bg-gray-400 rounded"></div>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 mr-2 bg-gray-300 rounded"></div>
          <div className="h-4 w-1/3 bg-gray-400 rounded"></div>
        </div>
      </div>
    );
  }
}
