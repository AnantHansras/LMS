import { useState } from "react";
import { addbook } from "../Services/booksAPI";
import { useDispatch } from "react-redux";

export default function AddBookForm() {
 const dispatch = useDispatch();
 const token = localStorage.getItem("token");
 const parsedToken = token ? JSON.parse(token) : null;
  const [book, setBook] = useState({ title: "", author: "", genre: "", publishedYear: "" });

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(addbook(book.title,book.author,book.genre,book.publishedYear,parsedToken));
    console.log("Book added:", book);
    // Handle API request to add the book
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md p-6 shadow-lg rounded-2xl bg-white">
        <h2 className="text-xl font-semibold text-center mb-4">Add a New Book</h2>
        <div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="title"
              placeholder="Book Title"
              value={book.title}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              name="author"
              placeholder="Author Name"
              value={book.author}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              name="genre"
              placeholder="Genre"
              value={book.genre}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
            <input
              type="number"
              name="publishedYear"
              placeholder="Published Year"
              value={book.publishedYear}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Add Book</button>
          </form>
        </div>
      </div>
    </div>
  );
}