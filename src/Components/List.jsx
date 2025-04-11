import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Search, X, BookOpen, Filter } from "lucide-react";
import { requestBook } from "../Services/booksAPI";
import { useSelector, useDispatch } from "react-redux";
import { setLastSearch } from "../slices/Search";
import  {toggleTheme}  from "../slices/ThemeSlice";

const BookList = ({ books }) => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
  const [activeGenre, setActiveGenre] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const token = localStorage.getItem("token");
  const parsedToken = token ? JSON.parse(token) : null;

  // Get all unique genres including "All"
  const genres = useMemo(
    () => ["All", ...new Set(books.map((book) => book.genre))],
    [books]
  );

  // Filter books based on search query and active genre
  const filteredBooks = useMemo(() => {
    let results = books;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        (book) =>
          book.title.toLowerCase().includes(query) ||
          book.author.toLowerCase().includes(query) ||
          book.genre.toLowerCase().includes(query)
      );
    }

    if (activeGenre !== "All") {
      results = results.filter((book) => book.genre === activeGenre);
    }

    return results;
  }, [searchQuery, books, activeGenre]);

  const openModal = (book) => {
    setSelectedBook(book);
  };

  const closeModal = () => {
    setSelectedBook(null);
  };

  const issueBook = (bookId) => {
    console.log("issue happening....");
    dispatch(requestBook(bookId, parsedToken));
    closeModal();
  };

  // Book card component to avoid repetition
  const BookCard = ({ book, index }) => (
    <motion.div
      className={`relative border backdrop-blur-2xl rounded-xl p-5 shadow-lg hover:shadow-2xl w-[285px] h-[420px] mx-auto flex flex-col cursor-pointer transition-transform transform hover:scale-105 ${
        isDarkMode ? "bg-white border-gray-200" : "bg-[#0c0A09] border-[hsla(12,7%,15%,1)]"
      }`}
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
          src={`/book_${index + 1}.jpeg`}
          alt={book.title}
          className="w-full h-full object-cover rounded-lg"
          onError={(e) => {
            e.target.src = "/fallback-book.jpg";
            e.target.className =
              "w-full h-full object-contain rounded-lg bg-gray-800 p-4";
          }}
        />
      </motion.div>
    </motion.div>
  );

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-white text-black" : "bg-[#0C0A09] text-[#E0E0E0]"
      } p-4 md:p-6 lg:p-8`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col space-y-6 mb-8">
          {/* Header and Search */}
          {/* <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <h1 className="text-[#E0E0E0] text-3xl font-bold tracking-tight">
              Discover Your Next Read
            </h1>
            <div className="relative w-full max-w-md">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#888888]"
                size={18}
              />
              <input
                type="text"
                placeholder="Search by title, author or genre..."
                className="pl-10 pr-4 py-3 w-full border border-[#1F1F1F] bg-[#1C1C1C] text-[#E0E0E0] rounded-full focus:outline-none focus:ring-2 focus:ring-[#EA580c] transition-all duration-300"
                value={searchQuery}
                onChange={(e) => {
                  const value = e.target.value;
                  setSearchQuery(value);
                  dispatch(setLastSearch(value));
                }}
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
            <button
              onClick={() => dispatch(toggleTheme())}
              className={`p-2 rounded-full border text-xl ${
                isDarkMode
                  ? "border-gray-300 hover:bg-gray-200"
                  : "border-[#2c2c2c] hover:bg-[#2c2c2c]"
              }`}
              aria-label="Toggle theme"
            >
              {isDarkMode ? "🌞" : "🌙"}
            </button>
          </div> */}
          <div
  className={`flex flex-col sm:flex-row justify-between items-center gap-4 ${
    isDarkMode ? "text-black" : "text-[#E0E0E0]"
  }`}
>
  <h1
    className={`text-3xl font-bold tracking-tight ${
      isDarkMode ? "text-gray-900" : "text-[#E0E0E0]"
    }`}
  >
    Discover Your Next Read
  </h1>

  <div className="relative w-full max-w-md">
    <Search
      className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
        isDarkMode ? "text-gray-400" : "text-[#888888]"
      }`}
      size={18}
    />
    <input
      type="text"
      placeholder="Search by title, author or genre..."
      className={`pl-10 pr-4 py-3 w-full rounded-full focus:outline-none focus:ring-2 ${
        isDarkMode
          ? "border border-gray-300 bg-white text-black focus:ring-orange-500"
          : "border border-[#1F1F1F] bg-[#1C1C1C] text-[#E0E0E0] focus:ring-[#EA580c]"
      }`}
      value={searchQuery}
      onChange={(e) => {
        const value = e.target.value;
        setSearchQuery(value);
        dispatch(setLastSearch(value));
      }}
    />
    {searchQuery && (
      <button
        onClick={() => setSearchQuery("")}
        className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
          isDarkMode ? "text-gray-500 hover:text-gray-800" : "text-[#888888] hover:text-[#E0E0E0]"
        }`}
        aria-label="Clear search"
      >
        <X size={16} />
      </button>
    )}
  </div>

  {/* 🔁 Theme Toggle Button */}
  
</div>

          {/* Filters and Count */}
          {/* <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
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
                  <button
                    onClick={() => setActiveGenre("All")}
                    aria-label="Clear genre filter"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
            </div>
            <p className="text-[#888888] text-sm">
              Showing {filteredBooks.length} of {books.length} books
            </p>
          </div> */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 ${
              isDarkMode
                ? "text-gray-600 hover:text-orange-600"
                : "text-[#888888] hover:text-[#EA580c]"
            } transition-colors`}
            aria-label="Toggle filters"
          >
            <Filter size={18} />
            <span className="text-sm font-medium">Filters</span>
          </button>

          {activeGenre !== "All" && (
            <div
              className={`ml-4 flex items-center gap-1 px-3 py-1 rounded-full ${
                isDarkMode
                  ? "bg-gray-200 text-orange-700"
                  : "bg-[#1F1F1F] text-[#EA580c]"
              }`}
            >
              <span className="text-xs font-medium">{activeGenre}</span>
              <button onClick={() => setActiveGenre("All")}>
                <X size={14} />
              </button>
            </div>
          )}
        </div>

        <p
          className={`text-sm ${
            isDarkMode ? "text-gray-600" : "text-[#888888]"
          }`}
        >
          Showing {filteredBooks.length} of {books.length} books
        </p>
      </div>

          {/* Genre Filters */}
          {/* <AnimatePresence>
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
          </AnimatePresence> */}
          <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="flex flex-wrap gap-2 mt-4">
              {genres.map((genre) => {
                const isActive = activeGenre === genre;
                return (
                  <button
                    key={genre}
                    onClick={() => setActiveGenre(genre)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? "bg-[#EA580c] text-white"
                        : isDarkMode
                        ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
                        : "bg-[#1F1F1F] text-[#888888] hover:bg-[#2C2C2C]"
                    }`}
                  >
                    {genre}
                  </button>
                );
              })}
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
      {/* <AnimatePresence>
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
                <h2 className="text-2xl font-bold text-[#E0E0E0]">
                  {selectedBook.title}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-[#888888] hover:text-[#E0E0E0]"
                >
                  <X size={24} />
                </button>
              </div>
              <p className="text-[#A8A29E] mb-1">by {selectedBook.author}</p>
              <p className="text-[#A8A29E] mb-1">
                Published Year: {selectedBook?.publishedYear ?? "Not available"}
              </p>
              <p className="text-[#EA580c] text-sm font-medium mb-4">
                {selectedBook.genre}
              </p>
              <div className="flex justify-center mb-6">
                <img
                  src={`/book_${books.indexOf(selectedBook) + 1}.jpeg`}
                  alt={selectedBook.title}
                  className="h-48 object-cover rounded-lg shadow-md"
                  onError={(e) => {
                    e.target.src = "/fallback-book.jpg";
                    e.target.className =
                      "h-48 object-contain rounded-lg bg-gray-800 p-4";
                  }}
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 border border-[#ffffff40] text-[#E0E0E0] rounded-lg hover:bg-[#2C2C2C] transition-colors"
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
      </AnimatePresence> */}
      <AnimatePresence>
  {selectedBook && (
    <motion.div
      className={`fixed inset-0 flex items-center justify-center p-4 z-50 ${
        isDarkMode ?   "bg-white bg-opacity-70":"bg-black bg-opacity-50"
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={closeModal}
    >
      <motion.div
        className={`rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto ${
          isDarkMode ? "bg-white text-black":"bg-[#1C1C1C] text-[#E0E0E0]"
        }`}
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold">
            {selectedBook.title}
          </h2>
          <button
            onClick={closeModal}
            className={`hover:text-red-400 ${
              isDarkMode ?  "text-gray-500":"text-[#888888]" 
            }`}
          >
            <X size={24} />
          </button>
        </div>
        <p className="mb-1 text-sm font-medium">
          <span className={isDarkMode ?  "text-gray-600": "text-[#A8A29E]"}>
            by {selectedBook.author}
          </span>
        </p>
        <p className="mb-1 text-sm font-medium">
          <span className={isDarkMode ? "text-gray-600":"text-[#A8A29E]" }>
            Published Year: {selectedBook?.publishedYear ?? "Not available"}
          </span>
        </p>
        <p className="text-[#EA580c] text-sm font-medium mb-4">
          {selectedBook.genre}
        </p>
        <div className="flex justify-center mb-6">
          <img
            src={`/book_${books.indexOf(selectedBook) + 1}.jpeg`}
            alt={selectedBook.title}
            className="h-48 object-cover rounded-lg shadow-md"
            onError={(e) => {
              e.target.src = "/fallback-book.jpg";
              e.target.className =
                "h-48 object-contain rounded-lg bg-gray-800 p-4";
            }}
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={closeModal}
            className={`px-4 py-2 rounded-lg border transition-colors ${
              isDarkMode
                ? 
                 "border-gray-400 text-gray-800 hover:bg-gray-200":
                 "border-[#ffffff40] text-[#E0E0E0] hover:bg-[#2C2C2C]"
            }`}
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
  );
};

export default BookList;
