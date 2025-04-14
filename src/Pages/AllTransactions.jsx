import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allTransactions } from "../Services/booksAPI";
import { CalendarCheck2, Clock4, Book } from "lucide-react";

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
    background: "hsl(150, 25%, 5%)", // deeper forest green-black
    cardBg: "hsl(150, 20%, 10%)", // soft forest green-dark
    border: "hsl(150, 10%, 20%)", // subtle greenish-gray
    textPrimary: "hsl(0, 0%, 95%)", // bright white
    textMuted: "hsl(150, 10%, 60%)", // muted sage tone
    accent: "hsl(140, 70%, 45%)", // vibrant leaf green
    accentHover: "hsl(140, 70%, 38%)", // darker leaf green on hover
    inputFocusRing: "hsl(140, 80%, 25%)", // strong jungle green
    buttonText: "hsl(140, 100%, 10%)", // very dark green
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
    background: "hsl(340, 20%, 6%)", // deep rose-black with subtle warmth
    cardBg: "hsl(345, 15%, 12%)", // dark rose-tinted card
    border: "hsl(345, 10%, 22%)", // warm rose-gray for softer edges
    textPrimary: "hsl(0, 0%, 96%)", // soft white for high readability
    textMuted: "hsl(345, 10%, 65%)", // muted dusty rose
    accent: "hsl(346, 75%, 50%)", // rich vibrant rose
    accentHover: "hsl(346, 75%, 42%)", // darker rose on hover
    inputFocusRing: "hsl(346, 85%, 40%)", // slightly deeper pink-red for focus
    buttonText: "hsl(350, 100%, 98%)", // pale rose-white for contrast
  },
};

const AllTransactions = () => {
  const dispatch = useDispatch();
  const [transactions, setTransactions] = useState([]);
  const token = localStorage.getItem("token");
  const parsedToken = token ? JSON.parse(token) : null;
  const currentTheme = useSelector((state) => state.theme.theme);
  const theme =
    themeStyles[currentTheme.toLowerCase()] || themeStyles["midnight"];

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
    <div
      className="min-h-screen p-4 md:p-6 lg:p-8"
      style={{ backgroundColor: theme.background, color: theme.textPrimary }}
    >
      <div className="max-w-7xl mx-auto">
        <h1
          className="text-3xl font-bold mb-8"
          style={{ color: theme.textPrimary }}
        >
          All Transactions
        </h1>

        <div
          className="overflow-x-auto rounded-lg shadow-lg border-2"
          style={{ backgroundColor: theme.cardBg, borderColor: theme.border }}
        >
          <table
            className="min-w-full text-sm border border-[#2c2c2e]"
            style={{ backgroundColor: theme.cardBg }}
          >
            <thead
              className="uppercase text-xs border-b border-[#2c2c2e]"
              style={{ backgroundColor: theme.cardBg, color: theme.textMuted }}
            >
              <tr>
                <th className="py-3 px-4 text-left">Title</th>
                <th className="py-3 px-4 text-left">User Email</th>
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
                    className="transition-colors border-b border-[#2c2c2e] hover:bg-[#27272A]"
                  >
                    <td
                      className="py-3 px-4 font-medium"
                      style={{ color: theme.accent }}
                    >
                      {transaction.bookId?.title || "N/A"}
                    </td>
                    <td
                      className="py-3 px-4"
                      style={{ color: theme.textMuted }}
                    >
                      {transaction.userId?.email || "N/A"}
                    </td>
                    <td
                      className="py-3 px-4"
                      style={{ color: theme.textMuted }}
                    >
                      {formatDate(transaction.issueDate)}
                    </td>
                    <td
                      className="py-3 px-4"
                      style={{ color: theme.textMuted }}
                    >
                      {formatDate(transaction.returnDate)}
                    </td>
                    <td
                      className="py-3 px-4"
                      style={{ color: theme.textMuted }}
                    >
                      {formatDate(transaction.returnedDate)}
                    </td>
                    <td
                      className="py-3 px-4"
                      style={{ color: theme.textMuted }}
                    >
                      {formatDate(transaction.requestDate)}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          transaction.status === "returned"
                            ? "bg-green-600/20 text-green-400"
                            : transaction.status === "pending"
                            ? "bg-red-600/20 text-red-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center py-6"
                    style={{ color: theme.textMuted }}
                  >
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
