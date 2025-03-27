import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { allTransactions } from "../Services/booksAPI";
const AllTransactions = () => {
    const dispatch = useDispatch();
  const [transactions, setTransactions] = useState([]);
  const token = localStorage.getItem("token");
  const parsedToken = token ? JSON.parse(token) : null;
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await dispatch(allTransactions(parsedToken));
        setTransactions(res.transactions);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };
  
    fetchTransactions();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">All Transactions</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border">Book Title</th>
              <th className="py-2 px-4 border">User ID</th>
              <th className="py-2 px-4 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions && transactions.map((transaction) => (
              <tr key={transaction._id} className="border-t">
                <td className="py-2 px-4 border">{transaction.bookId?.title || "N/A"}</td>
                <td className="py-2 px-4 border">{transaction.userId || "N/A"}</td>
                <td className={`py-2 px-4 border ${transaction.status === 'returned' ? 'text-green-600' : 'text-red-600'}`}>{transaction.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllTransactions;
