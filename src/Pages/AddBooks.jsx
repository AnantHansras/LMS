import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addbook } from "../Services/booksAPI";
import Illustration from "../assets/undraw_notebook_8ihb.svg";

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

export default function AddBookPage() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const parsedToken = token ? JSON.parse(token) : null;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const currentTheme = useSelector((state) => state.theme.theme);
  const theme = themeStyles[currentTheme.toLowerCase()] || themeStyles["midnight"];

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
      return book.title && book.author && book.genre;
    } else if (step === 2) {
      return book.coverPhoto !== null;
    } else if (step === 3) {
      return book.publishedYear && book.keywords.length > 0 && termsAccepted;
    }
    return false;
  };

  const addKeyword = (e) => {
    if (e.key === "Enter" && keyword) {
      e.preventDefault();
      if (!book.keywords.includes(keyword)) {
        setBook((prev) => ({
          ...prev,
          keywords: [...prev.keywords, keyword],
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
    <div className="min-h-screen flex justify-center items-center px-4" style={{ backgroundColor: theme.background }}>
      <div
        className="w-full max-w-4xl rounded-2xl shadow-xl flex flex-col md:flex-row gap-6 p-6"
        style={{
          backgroundColor: theme.cardBg,
          borderColor: theme.border,
          border: `1px solid ${theme.border}`,
          color: theme.textPrimary,
        }}
      >
        {/* SVG Illustration */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center">
          <img src={Illustration} alt="Add Book" className="w-full max-w-xs" />
          <p className="text-sm max-w-sm mt-2 text-center" style={{ color: theme.textMuted }}>
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
            <div className="space-y-4">
              {step === 1 && (
                <>
                  <div>
                    <label className="block text-sm" style={{ color: theme.textPrimary }}>Title</label>
                    <input
                      type="text"
                      name="title"
                      value={book.title}
                      onChange={handleChange}
                      required
                      className="mt-0.5 w-full rounded-md border outline-none text-sm p-[0.4rem] focus:ring-2"
                      style={{
                        backgroundColor: theme.cardBg,
                        borderColor: theme.border,
                        color: theme.textMuted,
                        '--tw-ring-color': theme.inputFocusRing,
                      }}
                      placeholder="Enter book title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm" style={{ color: theme.textPrimary }}>Author</label>
                    <input
                      type="text"
                      name="author"
                      value={book.author}
                      onChange={handleChange}
                      required
                      className="mt-0.5 w-full rounded-md border outline-none text-sm p-[0.4rem] focus:ring-2"
                      style={{
                        backgroundColor: theme.cardBg,
                        borderColor: theme.border,
                        color: theme.textMuted,
                        '--tw-ring-color': theme.inputFocusRing,
                      }}
                      placeholder="Enter author name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm" style={{ color: theme.textPrimary }}>Genre</label>
                    <input
                      type="text"
                      name="genre"
                      value={book.genre}
                      onChange={handleChange}
                      required
                      className="mt-0.5 w-full rounded-md border outline-none text-sm p-[0.4rem] focus:ring-2"
                      style={{
                        backgroundColor: theme.cardBg,
                        borderColor: theme.border,
                        color: theme.textMuted,
                        '--tw-ring-color': theme.inputFocusRing,
                      }}
                      placeholder="e.g. Science Fiction, Romance"
                    />
                  </div>
                </>
              )}

              {step === 2 && (
                <div>
                  <label className="block text-sm mb-1" style={{ color: theme.textPrimary }}>
                    Cover Photo
                  </label>
                  <div className="relative border-2 border-dashed rounded-md h-48 flex items-center justify-center text-center cursor-pointer hover:border-[hsla(21,90%,48%,1)] transition overflow-hidden"
                    style={{
                      borderColor: theme.border,
                    }}
                  >
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
                      <div className="flex flex-col items-center justify-center text-center" style={{ color: theme.textMuted }}>
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
                    <label className="block text-sm" style={{ color: theme.textPrimary }}>Keywords</label>
                    <input
                      type="text"
                      value={keyword}
                      onChange={handleKeywordChange}
                      onKeyDown={addKeyword}
                      className="mt-0.5 w-full outline-none rounded-md border text-sm p-[0.4rem] focus:ring-2"
                      style={{
                        backgroundColor: theme.cardBg,
                        borderColor: theme.border,
                        color: theme.textMuted,
                        '--tw-ring-color': theme.inputFocusRing,
                      }}
                      placeholder="Type and press Enter"
                    />
                    {book.keywords.length > 0 && (
                      <div className="mt-1 flex flex-wrap gap-2">
                        {book.keywords.map((kw, index) => (
                          <span
                            key={index}
                            className="flex items-center rounded-full px-2.5 py-1 text-xs ring-1"
                            style={{
                              backgroundColor: theme.border,
                              color: theme.textPrimary,
                              borderColor: theme.textMuted,
                            }}
                          >
                            {kw}
                            <button
                              type="button"
                              onClick={() => removeKeyword(kw)}
                              className="ml-2 hover:text-red-500"
                              style={{ color: theme.textMuted }}
                            >
                              ✕
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm" style={{ color: theme.textPrimary }}>Published Year</label>
                    <select
                      name="publishedYear"
                      value={book.publishedYear}
                      onChange={handleChange}
                      className="mt-0.5 w-full max-h-60 overflow-y-auto rounded-md border text-sm p-[0.4rem] focus:ring-2"
                      style={{
                        backgroundColor: theme.cardBg,
                        borderColor: theme.border,
                        color: theme.textMuted,
                        '--tw-ring-color': theme.inputFocusRing,
                      }}
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
                  <div className="mt-2 w-full rounded-md p-2 text-sm" style={{ color: theme.textMuted }}>
                    <label
                      htmlFor="terms"
                      className="flex items-center gap-3 cursor-pointer select-none"
                    >
                      <input
                        id="terms"
                        type="checkbox"
                        checked={termsAccepted}
                        onChange={(e) => setTermsAccepted(e.target.checked)}
                        className="h-5 w-5 rounded-sm transition-all duration-200"
                        style={{ accentColor: theme.accent, borderColor: theme.textMuted }}
                      />
                      <span className="text-xs">
                        I confirm that all the information provided is accurate
                        and complete.
                      </span>
                    </label>
                  </div>
                </>
              )}
            </div>

            {/* Buttons */}
            <div className="flex justify-between pt-4">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep((prev) => prev - 1)}
                  className="rounded-md px-4 py-2 text-sm hover:bg-[#3F3F46]"
                  style={{ backgroundColor: theme.border, color: theme.textPrimary }}
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
                      ? "text-[#FAFAF9] hover:bg-[hsla(21,90%,48%,0.9)]"
                      : "text-black cursor-not-allowed"
                  }`}
                  style={{
                    backgroundColor: isStepValid() ? theme.accent : theme.border,
                    color: theme.buttonText,
                  }}
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!isStepValid() || isSubmitting}
                  className={`ml-auto rounded-md px-4 py-2 text-sm transition-colors duration-200 ${
                    isStepValid()
                      ? "text-[#FAFAF9] hover:bg-[hsla(21,90%,48%,0.9)]"
                      : "text-black cursor-not-allowed"
                  }`}
                  style={{
                    backgroundColor: isStepValid() ? theme.accent : theme.border,
                    color: theme.buttonText,
                  }}
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