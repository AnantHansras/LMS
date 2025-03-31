// import { useState } from "react";
// import { motion } from "framer-motion";
// import { Trash2 } from "lucide-react";
// import { removebook, requestBook } from "../Services/booksAPI";
// import { useDispatch } from 'react-redux';

// const BookList = ({ books }) => {
//   const dispatch = useDispatch();
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedBook, setSelectedBook] = useState(null);
//   const token = localStorage.getItem("token");
//   const parsedToken = token ? JSON.parse(token) : null;

//   const onDelete = (bookId) => {
//     dispatch(removebook(bookId, parsedToken));
//   };

//   const openModal = (book) => {
//     setSelectedBook(book);
//   };

//   const closeModal = () => {
//     setSelectedBook(null);
//   };

//   const issueBook = (bookId) => {
//     dispatch(requestBook(bookId, parsedToken));
//     closeModal();
//   };

//   return (
//     <div className="min-h-screen bg-[hsla(240,10%,4%,1)] p-6">
//       {/* Search Bar */}
//       <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
//         <h2 className="text-[#FAFAF9] text-2xl font-semibold text-center sm:text-left">
//           Shop Your Next Book
//         </h2>
//         <input
//           type="text"
//           placeholder="Search books..."
//           className="p-3 border border-[hsla(12,7%,15%,1)] bg-[#0c0A09] text-[#FAFAF9] rounded-full w-full max-w-md shadow-md focus:outline-none focus:ring-2 focus:ring-[hsla(21,90%,48%,1)] transition duration-300"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//       </div>

//       {/* Book List */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-8">
//         {books.length > 0 ? (
//           books.map((book) => (
//             <motion.div
//               key={book._id}
//               className="relative bg-[#0c0A09] border border-[hsla(12,7%,15%,1)] backdrop-blur-2xl rounded-xl p-5 shadow-lg hover:shadow-2xl w-[250px] h-[420px] mx-auto flex flex-col cursor-pointer transition-transform transform hover:scale-105"
//               onClick={() => openModal(book)}
//             >
//               {/* Delete Icon */}
//               <button
//                 className="absolute top-3 right-3 text-[#A8A29E] hover:text-red-500 transition"
//                 onClick={(e) => { e.stopPropagation(); onDelete(book._id); }}
//               >
//                 <Trash2 size={18} />
//               </button>

//               {/* Book Details */}
//               <div className="mb-3 text-center">
//                 <h2 className="text-lg font-bold text-[hsla(21,90%,48%,1)] truncate">
//                   {book.title}
//                 </h2>
//                 <p className="text-[#A8A29E] text-sm">{book.author}</p>
//                 <p className="text-[#A8A29E] text-xs italic">{book.genre}</p>
//               </div>

//               {/* Book Image */}
//               <motion.div
//                 className="h-[350px] w-full bg-[hsla(240,10%,4%,1)] rounded-lg mt-auto flex justify-center items-center overflow-hidden shadow-md"
//               >
//                 <img
//                   src={`/book_${book._id}.jpeg`}
//                   alt={book.title}
//                   className="w-full h-full object-cover rounded-lg"
//                   onError={(e) => { e.target.src = "/fallback-book.jpg"; }}
//                 />
//               </motion.div>
//             </motion.div>
//           ))
//         ) : (
//           <motion.div
//             className="col-span-full flex flex-col items-center justify-center text-center text-[#A8A29E] mt-10"
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             <p className="text-lg font-semibold">No books found</p>
//             <p className="text-sm text-[#A8A29E]">Try searching for something else.</p>
//           </motion.div>
//         )}
//       </div>

//       {/* Modal */}
//       {selectedBook && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
//           <motion.div 
//             className="bg-[#0c0A09] p-6 rounded-lg shadow-xl text-[#FAFAF9] max-w-sm w-full text-center"
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.3 }}
//           >
//             <h2 className="text-xl font-semibold mb-3">Issue Book</h2>
//             <p className="text-sm">Do you want to issue "{selectedBook.title}"?</p>
//             <div className="flex justify-center mt-5 space-x-4">
//               <button className="px-4 py-2 bg-gray-700 rounded-md transition hover:bg-gray-600" onClick={closeModal}>Cancel</button>
//               <button className="px-4 py-2 bg-[hsla(21,90%,48%,1)] text-white rounded-md transition hover:bg-[hsla(21,85%,40%,1)]" onClick={() => issueBook(selectedBook._id)}>Confirm</button>
//             </div>
//           </motion.div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BookList;

"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Trash2, Search, X, BookOpen, Filter } from "lucide-react"
import { removebook, requestBook } from "../Services/booksAPI"
import { useDispatch } from "react-redux"

const BookList = ({ books }) => {
  const dispatch = useDispatch()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedBook, setSelectedBook] = useState(null)
  const [filteredBooks, setFilteredBooks] = useState(books)
  const [activeGenre, setActiveGenre] = useState("All")
  const token = localStorage.getItem("token")
  const parsedToken = token ? JSON.parse(token) : null
  const [showFilters, setShowFilters] = useState(false)

  const genres = ["All", ...Array.from(new Set(books.map((book) => book.genre)))]

  useEffect(() => {
    let results = books
    if (searchQuery) {
      results = results.filter(
        (book) =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }
    if (activeGenre !== "All") {
      results = results.filter((book) => book.genre === activeGenre)
    }
    setFilteredBooks(results)
  }, [searchQuery, books, activeGenre])

  const onDelete = (bookId, e) => {
    e.stopPropagation()
    dispatch(removebook(bookId, parsedToken))
  }

  const openModal = (book) => {
    setSelectedBook(book)
  }

  const closeModal = () => {
    setSelectedBook(null)
  }

  const issueBook = (bookId) => {
    dispatch(requestBook(bookId, parsedToken))
    closeModal()
  }

  return (
    <div className="min-h-screen bg-[#121212] text-[#E0E0E0] p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col space-y-6 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <h1 className="text-[#E0E0E0] text-3xl font-bold tracking-tight">Discover Your Next Read</h1>
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#888888]" size={18} />
              <input
                type="text"
                placeholder="Search by title or author..."
                className="pl-10 pr-4 py-3 w-full border border-[#1F1F1F] bg-[#1C1C1C] text-[#E0E0E0] rounded-full focus:outline-none focus:ring-2 focus:ring-[#007ACC] transition-all duration-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#888888] hover:text-[#E0E0E0] transition-colors">
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center">
              <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2 text-[#888888] hover:text-[#007ACC] transition-colors">
                <Filter size={18} />
                <span className="text-sm font-medium">Filters</span>
              </button>
              {activeGenre !== "All" && (
                <div className="ml-4 flex items-center gap-1 bg-[#1F1F1F] text-[#007ACC] px-3 py-1 rounded-full">
                  <span className="text-xs font-medium">{activeGenre}</span>
                  <button onClick={() => setActiveGenre("All")}>
                    <X size={14} />
                  </button>
                </div>
              )}
            </div>
            <p className="text-[#888888] text-sm">Showing {filteredBooks.length} of {books.length} books</p>
          </div>
          <AnimatePresence>
            {showFilters && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                <div className="flex flex-wrap gap-2">
                  {genres.map((genre) => (
                    <button key={genre} onClick={() => setActiveGenre(genre)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeGenre === genre ? "bg-[#007ACC] text-white" : "bg-[#1F1F1F] text-[#888888] hover:bg-[#2C2C2C]"}`}>
                      {genre}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default BookList


