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
//   const filteredBooks = books.filter(
//     (book) =>
//       book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       book.genre.toLowerCase().includes(searchQuery.toLowerCase())
//   );
//   // When searchQuery is an empty string (""),
//   // book.title.toLowerCase().includes("") → Always true
//   // book.author.toLowerCase().includes("") → Always true
//   // book.genre.toLowerCase().includes("") → Always true

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
//         {filteredBooks.length > 0? (
//           filteredBooks.map((book, index) => (
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
//                   src={`/book_${index+1}.jpeg`}
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




// "use client"
// import { useState, useEffect } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { Trash2, Search, X, BookOpen, Filter } from "lucide-react"
// import { removebook, requestBook } from "../Services/booksAPI"
// import { useDispatch } from "react-redux"

// const BookList = ({ books }) => {
//   const dispatch = useDispatch()
//   const [searchQuery, setSearchQuery] = useState("")
//   const [selectedBook, setSelectedBook] = useState(null)
//   const [filteredBooks, setFilteredBooks] = useState(books)
//   const [activeGenre, setActiveGenre] = useState("All")
//   const token = localStorage.getItem("token")
//   const parsedToken = token ? JSON.parse(token) : null
//   const [showFilters, setShowFilters] = useState(false)


//     const searchfilteredB = books.filter(
//     (book) =>
//       book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       book.genre.toLowerCase().includes(searchQuery.toLowerCase())
//   );
//     const filteredB = books.filter(
//     (book) =>
//       book.title.toLowerCase().includes(activeGenre.toLowerCase()) ||
//       book.author.toLowerCase().includes(activeGenre.toLowerCase()) ||
//       book.genre.toLowerCase().includes(activeGenre.toLowerCase())
//   );
// //   // When searchQuery is an empty string (""),
// //   // book.title.toLowerCase().includes("") → Always true
// //   // book.author.toLowerCase().includes("") → Always true
// //   // book.genre.toLowerCase().includes("") → Always true

//   const genres = ["All", ...Array.from(new Set(books.map((book) => book.genre)))]

//   useEffect(() => {
//     let results = books
//     if (searchQuery) {
//       results = results.filter(
//         (book) =>
//           book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           book.author.toLowerCase().includes(searchQuery.toLowerCase()),
//       )
//     }
//     if (activeGenre !== "All") {
//       results = results.filter((book) => book.genre === activeGenre)
//     }
//     setFilteredBooks(results)
//   }, [searchQuery, books, activeGenre])

//   const onDelete = (bookId, e) => {
//     e.stopPropagation()
//     dispatch(removebook(bookId, parsedToken))
//   }

//   const openModal = (book) => {
//     setSelectedBook(book)
//   }

//   const closeModal = () => {
//     setSelectedBook(null)
//   }

//   const issueBook = (bookId) => {
//     dispatch(requestBook(bookId, parsedToken))
//     closeModal()
//   }

//   return (
//     <div className="min-h-screen bg-[#121212] text-[#E0E0E0] p-4 md:p-6 lg:p-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex flex-col space-y-6 mb-8">
//           <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
//             <h1 className="text-[#E0E0E0] text-3xl font-bold tracking-tight">Discover Your Next Read</h1>
//             <div className="relative w-full max-w-md">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#888888]" size={18} />
//               <input
//                 type="text"
//                 placeholder="Search by title or author..."
//                 className="pl-10 pr-4 py-3 w-full border border-[#1F1F1F] bg-[#1C1C1C] text-[#E0E0E0] rounded-full focus:outline-none focus:ring-2 focus:ring-[#007ACC] transition-all duration-300"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//               {searchQuery && (
//                 <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#888888] hover:text-[#E0E0E0] transition-colors">
//                   <X size={16} />
//                 </button>
//               )}
//             </div>
//           </div>

//           <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
//             <div className="flex items-center">
//               <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2 text-[#888888] hover:text-[#007ACC] transition-colors">
//                 <Filter size={18} />
//                 <span className="text-sm font-medium">Filters</span>
//               </button>
//               {activeGenre !== "All" && (
//                 <div className="ml-4 flex items-center gap-1 bg-[#1F1F1F] text-[#007ACC] px-3 py-1 rounded-full">
//                   <span className="text-xs font-medium">{activeGenre}</span>
//                   <button onClick={() => setActiveGenre("All")}>
//                     <X size={14} />
//                   </button>
//                 </div>
//               )}
//             </div>
//             <p className="text-[#888888] text-sm">Showing {filteredBooks.length} of {books.length} books</p>
//           </div>
//           <AnimatePresence>
//             {showFilters && (
//               <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
//                 <div className="flex flex-wrap gap-2">
//                   {genres.map((genre) => (
//                     <button key={genre} onClick={() => setActiveGenre(genre)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeGenre === genre ? "bg-[#007ACC] text-white" : "bg-[#1F1F1F] text-[#888888] hover:bg-[#2C2C2C]"}`}>
//                       {genre}
//                     </button>
//                   ))}
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-8">
//           {filteredB.length > 0 ? (filteredB.map((book, index) => (
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
//                   src={`/book_${index+1}.jpeg`}
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
//           {searchfilteredB.length > 0 &&  filteredB.length <=0 ? (
//          searchfilteredB.map((book, index) => (
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
//                   src={`/book_${index+1}.jpeg`}
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
//         </div>
//       </div>
//     </div>
//   )
// }

// export default BookList

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Trash2, Search, X, BookOpen, Filter } from "lucide-react"
import { removebook, requestBook } from "../Services/booksAPI"
import { useDispatch } from "react-redux"

const BookList = ({ books }) => {
  const dispatch = useDispatch()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedBook, setSelectedBook] = useState(null)
  const [activeGenre, setActiveGenre] = useState("All")
  const [showFilters, setShowFilters] = useState(false)
  
  const token = localStorage.getItem("token")
  const parsedToken = token ? JSON.parse(token) : null

  // Get all unique genres including "All"
  const genres = useMemo(() => 
    ["All", ...new Set(books.map((book) => book.genre))], 
    [books]
  )

  // Filter books based on search query and active genre
  const filteredBooks = useMemo(() => {
    let results = books
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      results = results.filter(
        (book) =>
          book.title.toLowerCase().includes(query) ||
          book.author.toLowerCase().includes(query) ||
          book.genre.toLowerCase().includes(query)
      )
    }
    
    if (activeGenre !== "All") {
      results = results.filter((book) => book.genre === activeGenre)
    }
    
    return results
  }, [searchQuery, books, activeGenre])

  const openModal = (book) => {
    setSelectedBook(book)
  }

  const closeModal = () => {
    setSelectedBook(null)
  }

  const issueBook = (bookId) => {
    console.log("issue happening....")
    dispatch(requestBook(bookId, parsedToken))
    closeModal()
  }

  // Book card component to avoid repetition
  const BookCard = ({ book, index }) => (
    <motion.div
      className="relative bg-[#0c0A09] border border-[hsla(12,7%,15%,1)] backdrop-blur-2xl rounded-xl p-5 shadow-lg hover:shadow-2xl w-[250px] h-[420px] mx-auto flex flex-col cursor-pointer transition-transform transform hover:scale-105"
      onClick={() => openModal(book)}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >

      <div className="mb-3 text-center">
        <h2 className="text-lg font-bold text-[hsla(21,90%,48%,1)] truncate">
          {book.title}
        </h2>
        <p className="text-[#A8A29E] text-sm">{book.author}</p>
        <p className="text-[#A8A29E] text-xs italic">{book.genre}</p>
      </div>

      <motion.div className="h-[350px] w-full bg-[hsla(240,10%,4%,1)] rounded-lg mt-auto flex justify-center items-center overflow-hidden shadow-md">
        <img
          src={`/book_${index+1}.jpeg`}
          alt={book.title}
          className="w-full h-full object-cover rounded-lg"
          onError={(e) => { 
            e.target.src = "/fallback-book.jpg"; 
            e.target.className = "w-full h-full object-contain rounded-lg bg-gray-800 p-4";
          }}
        />
      </motion.div>
    </motion.div>
  )

  return (
    <div className="min-h-screen bg-[#121212] text-[#E0E0E0] p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col space-y-6 mb-8">
          {/* Header and Search */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <h1 className="text-[#E0E0E0] text-3xl font-bold tracking-tight">Discover Your Next Read</h1>
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#888888]" size={18} />
              <input
                type="text"
                placeholder="Search by title, author or genre..."
                className="pl-10 pr-4 py-3 w-full border border-[#1F1F1F] bg-[#1C1C1C] text-[#E0E0E0] rounded-full focus:outline-none focus:ring-2 focus:ring-[#EA580c] transition-all duration-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")} 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#888888] hover:text-[#E0E0E0] transition-colors"
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Filters and Count */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center">
              <button 
                onClick={() => setShowFilters(!showFilters)} 
                className="flex items-center gap-2 text-[#888888] hover:text-[#EA580c] transition-colors"
                aria-label="Toggle filters"
              >
                <Filter size={18} />
                <span className="text-sm font-medium">Filters</span>
              </button>
              {activeGenre !== "All" && (
                <div className="ml-4 flex items-center gap-1 bg-[#1F1F1F] text-[#EA580c] px-3 py-1 rounded-full">
                  <span className="text-xs font-medium">{activeGenre}</span>
                  <button onClick={() => setActiveGenre("All")} aria-label="Clear genre filter">
                    <X size={14} />
                  </button>
                </div>
              )}
            </div>
            <p className="text-[#888888] text-sm">
              Showing {filteredBooks.length} of {books.length} books
            </p>
          </div>

          {/* Genre Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }} 
                animate={{ height: "auto", opacity: 1 }} 
                exit={{ height: 0, opacity: 0 }} 
                transition={{ duration: 0.3 }} 
                className="overflow-hidden"
              >
                <div className="flex flex-wrap gap-2">
                  {genres.map((genre) => (
                    <button 
                      key={genre} 
                      onClick={() => setActiveGenre(genre)} 
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        activeGenre === genre 
                          ? "bg-[#EA580c] text-white" 
                          : "bg-[#1F1F1F] text-[#888888] hover:bg-[#2C2C2C]"
                      }`}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Books Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-8">
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book, index) => (
                <BookCard key={book._id} book={book} index={index} />
              ))
            ) : (
              <motion.div
                className="col-span-full flex flex-col items-center justify-center text-center text-[#A8A29E] mt-10"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <BookOpen size={48} className="mb-4 text-[#EA580c]" />
                <p className="text-lg font-semibold">No books found</p>
                <p className="text-sm text-[#A8A29E]">
                  {searchQuery || activeGenre !== "All" 
                    ? "Try adjusting your search or filters" 
                    : "The library appears to be empty"}
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Book Details Modal */}
      <AnimatePresence>
        {selectedBook && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="bg-[#1C1C1C] rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-[#E0E0E0]">{selectedBook.title}</h2>
                <button onClick={closeModal} className="text-[#888888] hover:text-[#E0E0E0]">
                  <X size={24} />
                </button>
              </div>
              <p className="text-[#A8A29E] mb-2">by {selectedBook.author}</p>
              <p className="text-[#EA580c] text-sm font-medium mb-4">{selectedBook.genre}</p>
              <div className="flex justify-center mb-6">
                <img
                  src={`/book_${books.indexOf(selectedBook) + 1}.jpeg`}
                  alt={selectedBook.title}
                  className="h-48 object-cover rounded-lg shadow-md"
                  onError={(e) => { 
                    e.target.src = "/fallback-book.jpg";
                    e.target.className = "h-48 object-contain rounded-lg bg-gray-800 p-4";
                  }}
                />
              </div>
              <p className="text-[#E0E0E0] mb-6">
                Published Year: {selectedBook?.publishedYear ?? "Not available"}
              </p>

              <div className="flex justify-end gap-3">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 border border-[#1F1F1F] text-[#E0E0E0] rounded-lg hover:bg-[#2C2C2C] transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => issueBook(selectedBook._id)}
                  className="px-4 py-2 bg-[#EA580c] text-white rounded-lg hover:bg-[#da601e] transition-colors"
                >
                  Request Book
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default BookList
