import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fethcFinesToUser } from "../Services/booksAPI"; 

export default function UserFines() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token")
  const parsedToken = token ? JSON.parse(token) : null

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
    <div className="bg-[hsla(240,10%,4%,1)] min-h-screen flex justify-center items-start px-4 py-12 text-[#FAFAF9]">
      <div className="max-w-3xl w-full space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-wide">Your Book Fines</h1>
          <p className="text-[#A8A29E] text-sm mt-1">Manage your dues and return books on time 📚</p>
        </div>

        {loading ? (
          <div className="text-center text-lg text-[#A8A29E]">Loading...</div>
        ) : booksWithFines.length === 0 ? (
          <div className="text-center text-lg text-green-400">No books with fines 🎉</div>
        ) : (
          <div className="grid gap-4">
            {booksWithFines.map((book, index) => (
              <div
                key={index}
                className="bg-[#0C0A09]/70 backdrop-blur-md p-4 rounded-xl border border-[hsla(12,7%,15%,1)] shadow-lg"
              >
                <h2 className="text-xl font-semibold mb-1">{book.title}</h2>
                <p className="text-sm text-[#A8A29E]">Author: {book.author}</p>
                {/* <p className="text-sm text-[#A8A29E]">Due Date: {new Date(book.dueDate).toLocaleDateString()}</p> */}
                <p className="text-sm mt-2 text-red-500 font-semibold">Fine: ₹{book.fineAmount}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
