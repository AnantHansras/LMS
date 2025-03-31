// import { useState } from "react";
// import { addbook } from "../Services/booksAPI";
// import { useDispatch } from "react-redux";

// export default function AddBookForm() {
//   const dispatch = useDispatch();
//   const token = localStorage.getItem("token");
//   const parsedToken = token ? JSON.parse(token) : null;
//   const [book, setBook] = useState({ title: "", author: "", genre: "", publishedYear: "", keywords: [] });
//   const [keywordInput, setKeywordInput] = useState("");

//   const handleChange = (e) => {
//     setBook({ ...book, [e.target.name]: e.target.value });
//   };

//   const handleKeywordChange = (e) => {
//     setKeywordInput(e.target.value);
//   };

//   const handleAddKeyword = () => {
//     if (keywordInput.trim() !== "" && !book.keywords.includes(keywordInput.trim())) {
//       setBook({ ...book, keywords: [...book.keywords, keywordInput.trim()] });
//       setKeywordInput("");
//     }
//   };

//   const handleRemoveKeyword = (keyword) => {
//     setBook({ ...book, keywords: book.keywords.filter((k) => k !== keyword) });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await dispatch(addbook(book.title, book.author, book.genre, book.publishedYear, book.keywords, parsedToken));
//     console.log("Book added:", book);
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
//       <div className="w-full max-w-md p-6 shadow-lg rounded-2xl bg-white">
//         <h2 className="text-xl font-semibold text-center mb-4">Add a New Book</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input type="text" name="title" placeholder="Book Title" value={book.title} onChange={handleChange} required className="w-full p-2 border rounded" />
//           <input type="text" name="author" placeholder="Author Name" value={book.author} onChange={handleChange} required className="w-full p-2 border rounded" />
//           <input type="text" name="genre" placeholder="Genre" value={book.genre} onChange={handleChange} required className="w-full p-2 border rounded" />
//           <input type="number" name="publishedYear" placeholder="Published Year" value={book.publishedYear} onChange={handleChange} required className="w-full p-2 border rounded" />
          
//           {/* Keywords Input */}
//           <div>
//             <input type="text" placeholder="Add Keyword" value={keywordInput} onChange={handleKeywordChange} className="w-full p-2 border rounded" />
//             <button type="button" onClick={handleAddKeyword} className="mt-2 w-full bg-green-500 text-white p-2 rounded">Add Keyword</button>
//             <div className="mt-2 flex flex-wrap gap-2">
//               {book.keywords.map((keyword, index) => (
//                 <span key={index} className="bg-blue-200 text-blue-800 px-2 py-1 rounded flex items-center">
//                   {keyword}
//                   <button type="button" onClick={() => handleRemoveKeyword(keyword)} className="ml-2 text-red-600">✖</button>
//                 </span>
//               ))}
//             </div>
//           </div>
          
//           <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Add Book</button>
//         </form>
//       </div>
//     </div>
//   );
// }
// import { useState } from "react";
// import { addbook } from "../Services/booksAPI";
// import { useDispatch } from "react-redux";
// import { X } from "lucide-react";

// export default function AddBookForm() {
//   const dispatch = useDispatch();
//   const token = localStorage.getItem("token");
//   const parsedToken = token ? JSON.parse(token) : null;
//   const [book, setBook] = useState({ title: "", author: "", genre: "", publishedYear: "", keywords: [] });
//   const [keywordInput, setKeywordInput] = useState("");

//   const handleChange = (e) => {
//     setBook({ ...book, [e.target.name]: e.target.value });
//   };

//   const handleKeywordChange = (e) => {
//     setKeywordInput(e.target.value);
//   };

//   const handleAddKeyword = () => {
//     if (keywordInput.trim() !== "" && !book.keywords.includes(keywordInput.trim())) {
//       setBook({ ...book, keywords: [...book.keywords, keywordInput.trim()] });
//       setKeywordInput("");
//     }
//   };

//   const handleRemoveKeyword = (keyword) => {
//     setBook({ ...book, keywords: book.keywords.filter((k) => k !== keyword) });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await dispatch(addbook(book.title, book.author, book.genre, book.publishedYear, book.keywords, parsedToken));
//     console.log("Book added:", book);
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-[#121212] p-4">
//       <div className="w-full max-w-md p-6 shadow-lg rounded-2xl bg-[#1C1C1C] border border-[#1F1F1F]">
//         <h2 className="text-xl font-semibold text-[#FAFAF9] text-center mb-4">Add a New Book</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input type="text" name="title" placeholder="Book Title" value={book.title} onChange={handleChange} required className="w-full p-3 bg-[#0c0A09] text-[#FAFAF9] placeholder-[#A8A29E] border border-[#1F1F1F] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FAFAF9]" />
//           <input type="text" name="author" placeholder="Author Name" value={book.author} onChange={handleChange} required className="w-full p-3 bg-[#0c0A09] text-[#FAFAF9] placeholder-[#A8A29E] border border-[#1F1F1F] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FAFAF9]" />
//           <input type="text" name="genre" placeholder="Genre" value={book.genre} onChange={handleChange} required className="w-full p-3 bg-[#0c0A09] text-[#FAFAF9] placeholder-[#A8A29E] border border-[#1F1F1F] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FAFAF9]" />
//           <input type="number" name="publishedYear" placeholder="Published Year" value={book.publishedYear} onChange={handleChange} required className="w-full p-3 bg-[#0c0A09] text-[#FAFAF9] placeholder-[#A8A29E] border border-[#1F1F1F] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FAFAF9]" />
          
//           {/* Keywords Input */}
//           <div>
//             <input type="text" placeholder="Add Keyword" value={keywordInput} onChange={handleKeywordChange} className="w-full p-3 bg-[#0c0A09] text-[#FAFAF9] placeholder-[#A8A29E] border border-[#1F1F1F] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FAFAF9]" />
//             <button type="button" onClick={handleAddKeyword} className="mt-2 w-full bg-[#FAFAF9] text-[#0c0A09] p-2 rounded-lg hover:bg-[#A8A29E] transition">Add Keyword</button>
//             <div className="mt-2 flex flex-wrap gap-2">
//               {book.keywords.map((keyword, index) => (
//                 <span key={index} className="bg-[#A8A29E] text-[#0c0A09] px-3 py-1 rounded-full flex items-center">
//                   {keyword}
//                   <button type="button" onClick={() => handleRemoveKeyword(keyword)} className="ml-2 text-[#FAFAF9] hover:text-[#E63946] transition">
//                     <X size={14} />
//                   </button>
//                 </span>
//               ))}
//             </div>
//           </div>
          
//           <button type="submit" className="w-full bg-[#FAFAF9] text-[#0c0A09] p-3 rounded-lg hover:bg-[#A8A29E] transition">Add Book</button>
//         </form>
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import { addbook } from "../Services/booksAPI";
import { useDispatch } from "react-redux";
import { X } from "lucide-react";

export default function AddBookForm() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const parsedToken = token ? JSON.parse(token) : null;
  const [book, setBook] = useState({ title: "", author: "", genre: "", publishedYear: "", keywords: [] });
  const [keywordInput, setKeywordInput] = useState("");

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleKeywordChange = (e) => {
    setKeywordInput(e.target.value);
  };

  const handleAddKeyword = () => {
    if (keywordInput.trim() !== "" && !book.keywords.includes(keywordInput.trim())) {
      setBook({ ...book, keywords: [...book.keywords, keywordInput.trim()] });
      setKeywordInput("");
    }
  };

  const handleRemoveKeyword = (keyword) => {
    setBook({ ...book, keywords: book.keywords.filter((k) => k !== keyword) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(addbook(book.title, book.author, book.genre, book.publishedYear, book.keywords, parsedToken));
    console.log("Book added:", book);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#0c0A09] p-4">
      <div className="w-full max-w-md p-6 shadow-lg rounded-2xl bg-[#0c0A09] border border-[hsla(12,7%,15%,1)] text-[#FAFAF9]">
        <h2 className="text-xl font-semibold text-center mb-4">Add a New Book</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="title" placeholder="Book Title" value={book.title} onChange={handleChange} required className="w-full p-3 bg-transparent text-[#A8A29E] placeholder-[#A8A29E] border border-[hsla(12,7%,15%,1)] rounded-lg focus:ring-2 focus:ring-[hsla(21,90%,48%,1)] outline-none text-sm" />
          <input type="text" name="author" placeholder="Author Name" value={book.author} onChange={handleChange} required className="w-full p-3 bg-transparent text-[#A8A29E] placeholder-[#A8A29E] border border-[hsla(12,7%,15%,1)] rounded-lg focus:ring-2 focus:ring-[hsla(21,90%,48%,1)] outline-none text-sm" />
          <input type="text" name="genre" placeholder="Genre" value={book.genre} onChange={handleChange} required className="w-full p-3 bg-transparent text-[#A8A29E] placeholder-[#A8A29E] border border-[hsla(12,7%,15%,1)] rounded-lg focus:ring-2 focus:ring-[hsla(21,90%,48%,1)] outline-none text-sm" />
          <input type="number" name="publishedYear" placeholder="Published Year" value={book.publishedYear} onChange={handleChange} required className="w-full p-3 bg-transparent text-[#A8A29E] placeholder-[#A8A29E] border border-[hsla(12,7%,15%,1)] rounded-lg focus:ring-2 focus:ring-[hsla(21,90%,48%,1)] outline-none text-sm" />
          
          <div>
            <input type="text" placeholder="Add Keyword" value={keywordInput} onChange={handleKeywordChange} className="w-full p-3 bg-transparent text-[#A8A29E] placeholder-[#A8A29E] border border-[hsla(12,7%,15%,1)] rounded-lg focus:ring-2 focus:ring-[hsla(21,90%,48%,1)] outline-none text-sm" />
            <button type="button" onClick={handleAddKeyword} className="mt-2 w-full bg-[hsla(21,90%,48%,1)] text-[#FAFAF9] p-2 rounded-lg hover:bg-[hsla(21,90%,48%,0.9)] transition">Add Keyword</button>
            <div className="mt-2 flex flex-wrap gap-2">
              {book.keywords.map((keyword, index) => (
                <span key={index} className="bg-[#A8A29E] text-[#0c0A09] px-3 py-1 rounded-full flex items-center">
                  {keyword}
                  <button type="button" onClick={() => handleRemoveKeyword(keyword)} className="ml-2 text-[#FAFAF9] hover:text-[#E63946] transition">
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>
          
          <button type="submit" className="w-full p-2 rounded-lg bg-[hsla(21,90%,48%,1)] text-[#FAFAF9] font-semibold hover:bg-[hsla(21,90%,48%,0.9)] hover:shadow-sm hover:shadow-blue-500/50 transition duration-300 text-sm">Add Book</button>
        </form>
      </div>
    </div>
  );
}