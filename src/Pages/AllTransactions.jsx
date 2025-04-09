import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { allTransactions } from "../Services/booksAPI";
import { CalendarCheck2, Clock4, Book } from "lucide-react";

const AllTransactions = () => {
  const dispatch = useDispatch();
  const [transactions, setTransactions] = useState([]);
  const token = localStorage.getItem("token");
  const parsedToken = token ? JSON.parse(token) : null;

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await dispatch(allTransactions(parsedToken));
        setTransactions(res.transactions || []);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  const formatDate = (dateString) =>
    dateString
      ? new Date(dateString).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "N/A";

  return (
    <div className="min-h-screen bg-[#121212] text-[#E0E0E0] p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-[#E0E0E0] text-3xl font-bold mb-8">All Transactions</h1>

        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="min-w-full bg-[#1C1C1E] border border-[#2c2c2e] text-sm">
        <thead className="bg-[#2C2C2E] text-[#A8A29E] uppercase text-xs">
              <tr>
                <th className="py-3 px-4 text-left">Title</th>
                <th className="py-3 px-4 text-left">User Email</th> {/* New column */}
                <th className="py-3 px-4 text-left">Issue Date</th>
                <th className="py-3 px-4 text-left">Due Date</th>
                <th className="py-3 px-4 text-left">Returned</th>
                <th className="py-3 px-4 text-left">Requested</th>
                <th className="py-3 px-4 text-left">Status</th>
              </tr>
        </thead>

        <tbody>
  {transactions.length > 0 ? (
    transactions.map((transaction) => (
      <tr
        key={transaction._id}
        className="border-b border-[#2c2c2e] hover:bg-[#27272A] transition-colors"
      >
        <td className="py-3 px-4 font-medium text-[hsla(21,90%,48%,1)]">
          {transaction.bookId?.title || "N/A"}
        </td>
        <td className="py-3 px-4">{transaction.userId?.email || "N/A"}</td> {/* New email cell */}
        <td className="py-3 px-4">{formatDate(transaction.issueDate)}</td>
        <td className="py-3 px-4">{formatDate(transaction.returnDate)}</td>
        <td className="py-3 px-4">{formatDate(transaction.returnedDate)}</td>
        <td className="py-3 px-4">{formatDate(transaction.requestDate)}</td>
        <td className="py-3 px-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              transaction.status === "issued"
                ? "bg-red-600/20 text-red-400"
                : "bg-green-600/20 text-green-400"
            }`}
          >
            {transaction.status}
          </span>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="7" className="text-center py-6 text-[#A8A29E]">
        No transactions found.
      </td>
    </tr>
  )}
</tbody>

          </table>
        </div>
      </div>
    </div>
  );
};

export default AllTransactions;
