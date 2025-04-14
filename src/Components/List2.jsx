import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Search, X, BookOpen, Filter, RotateCw } from "lucide-react";
import { removebook, requestBook } from "../Services/booksAPI";
import { useDispatch, useSelector } from "react-redux";
import { setLastSearch } from "../slices/Search";

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

const BookList = ({ books }) => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
  const [activeGenre, setActiveGenre] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const token = localStorage.getItem("token");
  const parsedToken = token ? JSON.parse(token) : null;

  const currentTheme = useSelector((state) => state.theme.theme);
  const theme = themeStyles[currentTheme.toLowerCase()] || themeStyles["midnight"];

  const genres = useMemo(
    () => ["All", ...new Set(books.map((book) => book.genre))],
    [books]
  );

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

  const onDelete = async (bookId, e) => {
    setIsDeleting(true);
    try {
      await dispatch(removebook(bookId, parsedToken));
      window.location.reload();
    } finally {
      setIsDeleting(false);
      closeModal();
    }
  };

  const BookCard = ({ book, index }) => (
    <motion.div
      className="relative rounded-xl p-5 shadow-lg hover:shadow-2xl w-[285px] h-[420px] mx-auto flex flex-col cursor-pointer transition-transform transform hover:scale-105"
      style={{
        backgroundColor: theme.cardBg,
        border: `1px solid ${theme.border}`,
        color: theme.textPrimary,
      }}
      onClick={() => {
        openModal(book);
        dispatch(setLastSearch(book.title));
      }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="mb-3 text-center">
        <h2 className="text-lg font-bold truncate" style={{ color: theme.accent }}>
          {book.title}
        </h2>
        <p className="text-sm" style={{ color: theme.textMuted }}>{book.author}</p>
        <p className="text-xs italic" style={{ color: theme.textMuted }}>{book.genre}</p>
      </div>

      <motion.div
        className="h-[350px] w-full rounded-lg mt-auto flex justify-center items-center overflow-hidden shadow-md"
        style={{ backgroundColor: theme.border }}
      >
        <img
          src={book.imageUrl || `/book_${index + 1}.jpeg`}
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
    <div className="min-h-screen p-4 md:p-6 lg:p-8" style={{ backgroundColor: theme.background, color: theme.textPrimary }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col space-y-6 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <h1 className="text-3xl font-bold tracking-tight" style={{ color: theme.textPrimary }}>
              Discover Your Next Read
            </h1>
            <div className="relative w-full max-w-md">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2"
                size={18}
                style={{ color: theme.textMuted }}
              />
              <input
                type="text"
                placeholder="Search by title, author or genre..."
                className="w-full pl-10 pr-4 py-3 rounded-full outline-none border focus:ring-2 transition-all duration-300"
                style={{
                  backgroundColor: theme.cardBg,
                  borderColor: theme.border,
                  color: theme.textMuted,
                  '--tw-ring-color': theme.inputFocusRing,
                }}
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
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 transition-colors"
                  aria-label="Clear search"
                  style={{ color: theme.textMuted }}
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 transition-colors"
                aria-label="Toggle filters"
                style={{ color: theme.textMuted }}
              >
                <Filter size={18} />
                <span className="text-sm font-medium">Filters</span>
              </button>
              {activeGenre !== "All" && (
                <div className="ml-4 flex items-center gap-1 px-3 py-1 rounded-full" style={{ backgroundColor: theme.border }}>
                  <span className="text-xs font-medium" style={{ color: theme.accent }}>{activeGenre}</span>
                  <button
                    onClick={() => setActiveGenre("All")}
                    aria-label="Clear genre filter"
                  >
                    <X size={14} style={{ color: theme.textMuted }} />
                  </button>
                </div>
              )}
            </div>
            <p className="text-sm" style={{ color: theme.textMuted }}>
              Showing {filteredBooks.length} of {books.length} books
            </p>
          </div>

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
                      className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
                      style={{
                        backgroundColor: activeGenre === genre ? theme.accent : theme.border,
                        color: activeGenre === genre ? theme.buttonText : theme.textMuted,
                      }}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-8">
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book, index) => (
                <BookCard key={book._id} book={book} index={index} />
              ))
            ) : (
              <motion.div
                className="col-span-full flex flex-col items-center justify-center text-center mt-10"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{ color: theme.textMuted }}
              >
                <BookOpen size={48} className="mb-4" style={{ color: theme.accent }} />
                <p className="text-lg font-semibold">No books found</p>
                <p className="text-sm">
                  {searchQuery || activeGenre !== "All"
                    ? "Try adjusting your search or filters"
                    : "The library appears to be empty"}
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

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
              className="rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              style={{ backgroundColor: theme.cardBg, color: theme.textPrimary, borderColor: theme.border, border: `1px solid ${theme.border}` }}
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold" style={{ color: theme.textPrimary }}>
                  {selectedBook.title}
                </h2>
                <button
                  onClick={closeModal}
                  className="transition-colors"
                  style={{ color: theme.textMuted }}
                >
                  <X size={24} />
                </button>
              </div>
              <p className="mb-1" style={{ color: theme.textMuted }}>by {selectedBook.author}</p>
              <p className="mb-1" style={{ color: theme.textMuted }}>
                Published Year: {selectedBook?.publishedYear ?? "Not available"}
              </p>
              <p className="text-sm font-medium mb-4" style={{ color: theme.accent }}>
                {selectedBook.genre}
              </p>
              <div className="flex justify-center mb-6">
                <img
                  src={selectedBook.imageUrl || `/book_${books.indexOf(selectedBook) + 1}.jpeg`}
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
                  className="px-4 py-2 rounded-lg transition-colors"
                  style={{
                    borderColor: theme.textMuted,
                    color: theme.textPrimary,
                    border: `1px solid ${theme.textMuted}40`,
                    backgroundColor: theme.cardBg,
                  }}
                >
                  Close
                </button>
                <button
                  onClick={(e) => onDelete(selectedBook._id, e)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    isDeleting ? "cursor-not-allowed" : "hover:bg-[#da601e]"
                  }`}
                  disabled={isDeleting}
                  style={{
                    backgroundColor: isDeleting ? theme.accentHover : theme.accent,
                    color: theme.buttonText,
                  }}
                >
                  {isDeleting ? (
                    <div className="flex items-center justify-center">
                      <RotateCw className="mr-2 h-5 w-5 animate-spin" />
                      Deleting...
                    </div>
                  ) : (
                    "Delete Book"
                  )}
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