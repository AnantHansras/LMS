import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fethcFinesToUser } from "../Services/booksAPI";

export default function UserFines() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const parsedToken = token ? JSON.parse(token) : null;

  const [booksWithFines, setBooksWithFines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFines = async () => {
      setLoading(true);
      const data = await dispatch(fethcFinesToUser(parsedToken));
      if (data?.data) {
        setBooksWithFines(data.data);
      }
      setLoading(false);
    };

    if (token) fetchFines();
  }, [dispatch, token]);

  return (
    <div className="bg-[hsla(240,10%,4%,1)] min-h-screen max-w-5xl mx-auto flex justify-center items-start px-4 py-12 text-[#FAFAF9]">
      <div className="w-full max-w-6xl space-y-8">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold tracking-wide">Your Book Fines</h1>
          <p className="text-[#A8A29E] text-sm md:text-base mt-2">
            Manage your dues and return books on time 📚
          </p>
        </div>

        {loading ? (
          <div className="text-center text-lg text-[#A8A29E]">Loading...</div>
        ) : booksWithFines.length === 0 ? (
          <div className="text-center text-lg text-green-400">No books with fines 🎉</div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {booksWithFines.map((book, index) => (
              <div
                key={index}
                className="bg-[#1c1917]/80 backdrop-blur-md p-5 rounded-2xl border border-[#292524] shadow-md hover:shadow-xl transition duration-300"
              >
                <h2 className="text-lg md:text-xl font-semibold text-white">{book.title}</h2>
                <p className="text-sm text-[#d6d3d1]">Author: {book.author}</p>
                {/* <p className="text-sm text-[#A8A29E]">Due: {new Date(book.dueDate).toLocaleDateString()}</p> */}
                <p className="mt-3 text-red-500 font-bold text-sm md:text-base">
                  Fine: ₹{book.fineAmount}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
