import { useState } from "react";
import { useDispatch } from "react-redux";
import { addbook } from "../Services/booksAPI";
import Illustration from "../assets/undraw_add-tasks_4qsy.svg";

export default function AddBookPage() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const parsedToken = token ? JSON.parse(token) : null;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [step, setStep] = useState(1);
  const [book, setBook] = useState({
    title: "",
    author: "",
    genre: "",
    publishedYear: "",
    keywords: [],
    coverPhoto: null,
  });
  const [keyword, setKeyword] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prev) => ({ ...prev, [name]: value }));
  };

  const handleKeywordChange = (e) => setKeyword(e.target.value);

  const isStepValid = () => {
    if (step === 1) {
      return book.title.trim() && book.author.trim() && book.genre.trim();
    } else if (step === 2) {
      return book.coverPhoto !== null;
    } else if (step === 3) {
      return book.publishedYear && book.keywords.length > 0 && termsAccepted;
    }
    return false;
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBook((prev) => ({ ...prev, coverPhoto: file }));
    }
  };
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await dispatch(
      addbook(
        book.title,
        book.author,
        book.genre,
        book.publishedYear,
        book.keywords,
        book.coverPhoto,
        parsedToken
      )
    );
    setBook({
      title: "",
      author: "",
      genre: "",
      publishedYear: "",
      keywords: [],
      coverPhoto: null,
    });
    setKeyword("");
    setTermsAccepted(false);
    setStep(1);
    setIsSubmitting(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black p-4">
      <div className="w-full max-w-4xl rounded-lg bg-neutral-900 p-6 text-white shadow-lg flex flex-col md:flex-row gap-6">
        {/* SVG Illustration */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center">
          <img src={Illustration} alt="Add Book" className="w-full max-w-xs" />
          <p className="text-neutral-400 text-sm max-w-sm mt-2 text-center">
            This form helps you add a new book to your library. Follow the
            3-step process, provide accurate details, upload a cover, and
            complete all fields.
          </p>
        </div>

        {/* Step Form */}
        <div className="w-full md:w-1/2 min-h-[18rem] flex flex-col justify-between">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-between h-full space-y-4"
          >
            <div className="space-y-3">
              {step === 1 && (
                <>
                  <div>
                    <label className="block text-sm text-neutral-400">
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={book.title}
                      onChange={handleChange}
                      required
                      className="mt-0.5 w-full rounded-md border border-neutral-700 bg-neutral-800 text-sm p-[0.4rem] text-white focus:ring focus:ring-neutral-600"
                      placeholder="Enter book title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-neutral-400">
                      Author
                    </label>
                    <input
                      type="text"
                      name="author"
                      value={book.author}
                      onChange={handleChange}
                      required
                      className="mt-0.5 w-full rounded-md border border-neutral-700 bg-neutral-800 text-sm p-[0.4rem] text-white focus:ring focus:ring-neutral-600"
                      placeholder="Enter author name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-neutral-400">
                      Genre
                    </label>
                    <input
                      type="text"
                      name="genre"
                      value={book.genre}
                      onChange={handleChange}
                      required
                      className="mt-0.5 w-full rounded-md border border-neutral-700 bg-neutral-800 text-sm p-[0.4rem] text-white focus:ring focus:ring-neutral-600"
                      placeholder="e.g. Science Fiction, Romance"
                    />
                  </div>
                </>
              )}

              {step === 2 && (
                <div>
                  <label className="block text-sm text-neutral-400 mb-1">
                    Cover Photo
                  </label>
                  <div className="relative border-2 border-dashed border-neutral-700 rounded-md h-48 flex items-center justify-center text-center cursor-pointer hover:border-neutral-500 transition overflow-hidden">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer z-10"
                    />
                    {book.coverPhoto ? (
                      <img
                        src={URL.createObjectURL(book.coverPhoto)}
                        alt="Preview"
                        className="object-contain h-full w-full"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-neutral-400 z-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-10 w-10 mb-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4-4m0 0l-4 4m4-4v12"
                          />
                        </svg>
                        <p className="text-sm">Click or drag to upload image</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {step === 3 && (
                <>
                  <div>
                    <label className="block text-sm text-neutral-400">
                      Keywords
                    </label>
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
                  <div>
                    <label className="block text-sm text-neutral-400">
                      Published Year
                    </label>
                    <select
                      name="publishedYear"
                      value={book.publishedYear}
                      onChange={handleChange}
                      className="mt-0.5 w-full max-h-60 overflow-y-auto rounded-md border border-neutral-700 bg-neutral-800 text-sm p-[0.4rem] text-white focus:ring focus:ring-neutral-600"
                      required
                    >
                      <option value="">Select year</option>
                      {Array.from({ length: 100 }, (_, i) => {
                        const year = new Date().getFullYear() - i;
                        return (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="mt-2 w-full rounded-md p-2 text-sm text-neutral-400">
                    <label
                      htmlFor="terms"
                      className="flex items-center gap-3 cursor-pointer select-none"
                    >
                      <input
                        id="terms"
                        type="checkbox"
                        checked={termsAccepted}
                        onChange={(e) => setTermsAccepted(e.target.checked)}
                        className="h-5 w-5 accent-green-500 border border-neutral-600 rounded-sm transition-all duration-200"
                      />
                      <span className="text-neutral-400 text-xs">
                        I confirm that all the information provided is accurate
                        and complete.
                      </span>
                    </label>
                  </div>
                </>
              )}
            </div>

            {/* Buttons fixed position */}
            <div className="flex justify-between pt-4">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep((prev) => prev - 1)}
                  className="rounded-md bg-neutral-700 px-4 py-2 text-sm hover:bg-neutral-600"
                >
                  Back
                </button>
              ) : (
                <div />
              )}
              {step < 3 ? (
                <button
                  type="button"
                  disabled={!isStepValid()}
                  onClick={() => setStep((prev) => prev + 1)}
                  className={`ml-auto rounded-md px-4 py-2 text-sm transition-colors duration-200 ${
                    isStepValid()
                      ? "bg-white text-black hover:bg-neutral-200"
                      : "bg-neutral-400 text-black cursor-not-allowed"
                  }`}
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!isStepValid() || isSubmitting}
                  className={`ml-auto rounded-md px-4 py-2 text-sm transition-colors duration-200 ${
                    isStepValid()
                      ? "bg-white text-black hover:bg-neutral-200"
                      : "bg-neutral-400 text-black cursor-not-allowed"
                  }`}
                >
                  {isSubmitting ? "Adding..." : "Add Book"}

                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
