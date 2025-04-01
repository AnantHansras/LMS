import { useState } from "react";
import { useDispatch } from "react-redux";
import { addbook } from "../Services/booksAPI";

export default function AddBookPage() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const parsedToken = token ? JSON.parse(token) : null;

  const [book, setBook] = useState({
    title: "",
    author: "",
    genre: "",
    publishedYear: "",
    keywords: [],
  });
  const [keyword, setKeyword] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prev) => ({ ...prev, [name]: value }));
  };

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  };

  const addKeyword = (e) => {
    if (e.key === "Enter" && keyword.trim()) {
      e.preventDefault();
      if (!book.keywords.includes(keyword.trim())) {
        setBook((prev) => ({
          ...prev,
          keywords: [...prev.keywords, keyword.trim()],
        }));
      }
      setKeyword("");
    }
  };

  const removeKeyword = (keywordToRemove) => {
    setBook((prev) => ({
      ...prev,
      keywords: prev.keywords.filter((k) => k !== keywordToRemove),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(
      addbook(book.title, book.author, book.genre, book.publishedYear, book.keywords, parsedToken)
    );
    console.log("Book added:", book);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black p-4">
      <div className="w-full max-w-md rounded-lg bg-neutral-900 p-6 text-white shadow-lg">
        <h2 className="mb-1 text-center text-2xl font-light">Add New Book</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm text-neutral-400">Title</label>
            <input
              type="text"
              name="title"
              value={book.title}
              onChange={handleChange}
              className="mt-0.5 w-full rounded-md border border-neutral-700 bg-neutral-800 text-sm p-[0.4rem] text-white focus:ring focus:ring-neutral-600"
              placeholder="Enter book title"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-neutral-400">Author</label>
            <input
              type="text"
              name="author"
              value={book.author}
              onChange={handleChange}
              className="mt-0.5 w-full rounded-md border border-neutral-700 bg-neutral-800 text-sm p-[0.4rem] text-white focus:ring focus:ring-neutral-600"
              placeholder="Enter author name"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-neutral-400">Genre</label>
            <select
              name="genre"
              value={book.genre}
              onChange={handleChange}
              className="mt-0.5 w-full rounded-md border border-neutral-700  bg-neutral-800 text-sm p-[0.4rem] text-white focus:ring focus:ring-neutral-600"
              required
            >
              <option value="">Select genre</option>
              <option value="fiction">Fiction</option>
              <option value="non-fiction">Non-Fiction</option>
              <option value="science-fiction">Science Fiction</option>
              <option value="fantasy">Fantasy</option>
              <option value="mystery">Mystery</option>
              <option value="biography">Biography</option>
              <option value="history">History</option>
              <option value="poetry">Poetry</option>
              <option value="self-help">Self-Help</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-neutral-400">Published Year</label>
            <input
              type="number"
              name="publishedYear"
              value={book.publishedYear}
              onChange={handleChange}
              className="mt-0.5 w-full rounded-md border border-neutral-700 bg-neutral-800 text-sm p-[0.4rem] text-white focus:ring focus:ring-neutral-600"
              placeholder="Enter year"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-neutral-400">Keywords</label>
            <input
              type="text"
              value={keyword}
              onChange={handleKeywordChange}
              onKeyDown={addKeyword}
              className="mt-0.5 w-full rounded-md border border-neutral-700 bg-neutral-800 text-sm p-[0.4rem] text-white focus:ring focus:ring-neutral-600"
              placeholder="Type and press Enter"
            />
            {book.keywords.length > 0 && (
              <div className="mt-1 flex flex-wrap gap-2">
                {book.keywords.map((kw, index) => (
                  <span
                    key={index}
                    className="flex items-center rounded-full bg-neutral-800 px-2.5 py-1 text-xs text-neutral-300 ring-1 ring-neutral-700"
                  >
                    {kw}
                    <button
                      type="button"
                      onClick={() => removeKeyword(kw)}
                      className="ml-2 text-neutral-400 hover:text-red-500"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-white p-2 text-black hover:bg-neutral-200"
          >
            Add Book
          </button>
        </form>
      </div>
    </div>
  );
}