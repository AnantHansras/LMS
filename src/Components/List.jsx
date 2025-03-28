import { useState } from "react";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import { removebook, requestBook } from "../Services/booksAPI";
import { useDispatch } from 'react-redux';

const BookList = ({ books }) => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
  const token = localStorage.getItem("token");
  const parsedToken = token ? JSON.parse(token) : null;

  const onDelete = (bookId) => {
    dispatch(removebook(bookId, parsedToken));
  };

  const openModal = (book) => {
    setSelectedBook(book);
  };

  const closeModal = () => {
    setSelectedBook(null);
  };

  const issueBook = (bookId) => {
    dispatch(requestBook(bookId,parsedToken))
    closeModal();
  };

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6">
        {books.length > 0 ? (
          books.map((book) => (
            <motion.div
              key={book._id}
              className="relative bg-[#0c0A09] border border-[hsla(12,7%,15%,1)] backdrop-blur-2xl rounded-xl p-4 shadow-lg hover:shadow-2xl w-[250px] h-[400px] mx-auto flex flex-col cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              onClick={() => openModal(book)}
            >
              {/* Delete Icon */}
              <button
                className="absolute top-2 right-2 text-[#A8A29E] hover:text-red-500 transition"
                onClick={(e) => { e.stopPropagation(); onDelete(book._id); }}
              >
                <Trash2 size={18} />
              </button>

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
                  onError={(e) => { e.target.src = "/fallback-book.jpg"; }}
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
            <p className="text-lg font-semibold">No books found</p>
            <p className="text-sm text-[#A8A29E]">Try searching for something else.</p>
          </motion.div>
        )}
      </div>

      {/* Modal */}
      {selectedBook && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-[#0c0A09] p-6 rounded-lg shadow-xl text-[#FAFAF9] max-w-sm w-full">
            <h2 className="text-lg font-semibold">Issue Book</h2>
            <p>Do you want to issue "{selectedBook.title}"?</p>
            <div className="flex justify-end mt-4 space-x-4">
              <button className="px-4 py-2 bg-gray-700 rounded-md" onClick={closeModal}>Cancel</button>
              <button className="px-4 py-2 bg-[hsla(21,90%,48%,1)] text-white rounded-md" onClick={() => issueBook(selectedBook._id)}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookList;
