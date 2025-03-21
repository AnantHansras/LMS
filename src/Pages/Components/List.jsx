// import { useState } from "react";

// const BookList = ({ books }) => {
//   const [searchQuery, setSearchQuery] = useState("");

//   // Filter books based on the title, author, or genre
//   const filteredBooks = books.filter((book) =>
//     book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     book.genre.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//       <>
//     <div className="p-4">
//       {/* Search Bar */}
//       <input
//         type="text"
//         placeholder="Search books..."
//         className="p-2 border rounded w-full mb-4"
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//         />

//       {/* Book List */}
//       <div className="grid grid-cols-3 gap-4">
//         {filteredBooks.length > 0 ? (
//             filteredBooks.map((book) => (
//                 <div key={book._id} className="p-4 border rounded shadow">
//               <h3 className="text-lg font-bold">{book.title}</h3>
//               <p className="text-sm text-gray-600">{book.author}</p>
//               <p className="text-sm text-gray-500">{book.genre}</p>
//             </div>
//           ))
//         ) : (
//             <p className="text-gray-500 col-span-3 text-center">No books found.</p>
//         )}
//       </div>
//     </div>
//         </>
//   );
// };

// export default BookList;
// // import { useState } from "react";
// //  export default function  List() {
// //     return(
// //         <>
// //         <h1>Book List</h1>
// //         </>
// //     )

// // }

// import { useState } from "react";
// import { motion } from "framer-motion";

// const BookList = ({ books }) => {
//   const [searchQuery, setSearchQuery] = useState("");

//   // Filter books based on the title, author, or genre
//   const filteredBooks = books.filter(
//     (book) =>
//       book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       book.genre.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#0B1120] to-[#141C2F] p-6">
//       {/* Search Bar */}
//       <div className="flex justify-center mb-6">
//         <input
//           type="text"
//           placeholder="Search books..."
//           className="p-3 border border-[#334155] bg-[#1E293B] text-white rounded-md w-full max-w-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//       </div>

//       {/* Book List */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredBooks.length > 0 ? (
//           filteredBooks.map((book) => (
//             <motion.div
//               key={book._id}
//               className="relative bg-[#1E293B] border border-[#334155] rounded-xl p-6 shadow-lg hover:shadow-2xl"
//               whileHover={{ scale: 1.05 }}
//             >
//               <motion.h2
//                 className="text-lg font-bold text-blue-400"
//                 whileHover={{ y: -5 }}
//               >
//                 {book.title}
//               </motion.h2>
//               <motion.p
//                 className="text-gray-400 text-sm mt-1"
//                 whileHover={{ y: -3 }}
//               >
//                 {book.author}
//               </motion.p>
//               <motion.p className="text-gray-500 text-xs mt-1">
//                 {book.genre}
//               </motion.p>
//               <motion.div
//                 className="h-40 w-full bg-gray-700 rounded-lg mt-4 flex justify-center items-center text-gray-300"
//                 whileHover={{ scale: 1.1, rotate: -2 }}
//               >
//                <img src={`/book_${book._id}.jpeg`} alt={book.title} className="w-full h-full object-cover rounded-lg" />

//               </motion.div>
//             </motion.div>
//           ))
//         ) : (
//           <p className="text-gray-400 col-span-3 text-center text-lg">
//             No books found.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BookList;

// import { useState } from "react";
// import { motion } from "framer-motion";

// const BookList = ({ books }) => {
//   const [searchQuery, setSearchQuery] = useState("");

//   // Filter books based on the title, author, or genre
//   const filteredBooks = books.filter(
//     (book) =>
//       book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       book.genre.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#0B1120] to-[#141C2F] p-6">
//       {/* Search Bar */}
//       <div className="flex justify-center mb-6">
//         <input
//           type="text"
//           placeholder="Search books..."
//           className="p-3 border border-[#334155] bg-[#1E293B] text-white rounded-md w-full max-w-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//       </div>

//       {/* Book List */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-1">
//         {filteredBooks.length > 0 ? (
//           filteredBooks.map((book) => (
//             <motion.div
//               key={book._id}
//               className="relative bg-[#1E293B] border border-[#334155] rounded-xl p-4 shadow-lg hover:shadow-2xl w-[250px] h-[400px] mx-auto flex flex-col"
//               whileHover={{ scale: 1.05 }}
//             >
//               <motion.h2 className="text-lg font-bold text-blue-400">{book.title}</motion.h2>
//               <motion.p className="text-gray-400 text-sm">{book.author}</motion.p>
//               <motion.p className="text-gray-500 text-xs">{book.genre}</motion.p>

//               {/* Fixed Image Styling */}
//               <motion.div
//                 className="h-[350px] w-full bg-gray-700 rounded-lg mt-auto flex justify-center items-center overflow-hidden"
//                 whileHover={{ scale: 1.1, rotate: -2 }}
//               >
//                 <img
//                   src={`/book_${book._id}.jpeg`}
//                   alt={book.title}
//                   className="w-full h-full object-cover rounded-lg"
//                 />
//               </motion.div>
//             </motion.div>
//           ))
//         ) : (
//           <motion.div
//     className="col-span-8 flex flex-col items-center justify-center text-center text-gray-400 mt-10"
//     initial={{ opacity: 0, y: -10 }}
//     animate={{ opacity: 1, y: 0 }}
//     transition={{ duration: 0.5 }}
//   >
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       fill="none"
//       viewBox="0 0 24 24"
//       strokeWidth="1.5"
//       stroke="currentColor"
//       className="w-12 h-12 text-gray-500 mb-2"
//     >
//       <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h18M3 12h18m-9 7h9" />
//     </svg>
//     <p className="text-lg font-semibold">No books found</p>
//     <p className="text-sm text-gray-500">Try searching for something else.</p>
//   </motion.div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BookList;
import { useState } from "react";
import { motion } from "framer-motion";

const BookList = ({ books }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter books based on the title, author, or genre
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.genre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[hsla(240,10%,4%,1)] p-6">
      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row justify-center items-center mb-6 space-y-4 sm:space-y-0 sm:space-x-6">
        <h2 className="text-[#FAFAF9] text-2xl font-semibold text-center sm:text-left">
          Shop Your Next Book
        </h2>
        <input
          type="text"
          placeholder="Search books..."
          className="p-3 border border-[hsla(12,7%,15%,1)] bg-[#0c0A09] text-[#FAFAF9] rounded-md w-full max-w-md shadow-md focus:outline-none focus:ring-2 focus:ring-[hsla(21,90%,48%,1)] transition duration-300"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Book List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <motion.div
              key={book._id}
              className="relative bg-[#0c0A09] border border-[hsla(12,7%,15%,1)] backdrop-blur-2xl rounded-xl p-4 shadow-lg hover:shadow-2xl w-[250px] h-[400px] mx-auto flex flex-col"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              {/* Book Title & Author */}
              <motion.div className="mb-2">
                <h2 className="text-lg font-bold text-[hsla(21,90%,48%,1)]">
                  {book.title}
                </h2>
                <p className="text-[#A8A29E] text-sm">{book.author}</p>
                <p className="text-[#A8A29E] text-xs">{book.genre}</p>
              </motion.div>

              {/* Book Image */}
              <motion.div
                className="h-[350px] w-full bg-[hsla(240,10%,4%,1)] rounded-lg mt-auto flex justify-center items-center overflow-hidden shadow-md"
                whileHover={{ scale: 1.1, rotate: -2 }}
              >
                <img
                  src={`/book_${book._id}.jpeg`}
                  alt={book.title}
                  className="w-full h-full object-cover rounded-lg"
                  onError={(e) => {
                    e.target.src = "/fallback-book.jpg"; // Fallback image if not found
                  }}
                />
              </motion.div>
            </motion.div>
          ))
        ) : (
          <motion.div
            className="col-span-full flex flex-col items-center justify-center text-center text-[#A8A29E] mt-10"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-12 h-12 text-[#A8A29E] mb-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 5h18M3 12h18m-9 7h9"
              />
            </svg>
            <p className="text-lg font-semibold">No books found</p>
            <p className="text-sm text-[#A8A29E]">
              Try searching for something else.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BookList;
