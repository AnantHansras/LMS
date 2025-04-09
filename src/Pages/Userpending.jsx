import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUserPendingRequests } from "../Services/booksAPI"; 
import {
  BookOpen,
  CalendarDays,
  Loader,
} from "lucide-react";

const MyPending = () => {
  const dispatch = useDispatch();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const parsedToken = token ? JSON.parse(token) : null;

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const response = await dispatch(getUserPendingRequests(parsedToken)); 
      setRequests(response.requests);
    } catch (error) {
      console.error("Failed to fetch pending requests:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0c0A09] min-h-screen text-[#FAFAF9] p-6 max-w-5xl mx-auto">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-wide">Pending Book Requests</h1>
        <p className="text-[#A8A29E] mt-1">
          Your book requests that are still waiting for approval ⏳
        </p>
      </header>

      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <RequestSkeleton key={index} />
          ))}
        </div>
      ) : requests.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
          {requests.map((request) => (
            <RequestCard key={request._id} request={request} />
          ))}
        </div>
      )}
    </div>
  );
};

const RequestCard = ({ request }) => {
  const formattedDate = new Date(request.requestDate).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="bg-[#1C1917] rounded-xl border border-[#3F3F46] p-5 shadow-md">
      <h2 className="text-xl font-semibold text-[#FAFAF9] mb-1">
        {request.bookId.title}
      </h2>

      <div className="flex items-start text-sm text-[#D4D4D8] mb-2">
        <BookOpen className="w-4 h-4 text-yellow-400 mr-2 mt-0.5" />
        <span>Author : {request.bookId.author}</span>
      </div>

      <div className="flex items-start text-sm text-[#D4D4D8] mb-2">
        <CalendarDays className="w-4 h-4 mr-2 text-gray-400" />
        <span>Requested on : {formattedDate}</span>
      </div>
    </div>
  );
};

const EmptyState = () => (
  <div className="text-center w-fit mx-auto mt-20 py-12 px-4 rounded-lg border-2 border-dashed border-[#3F3F46] bg-[#1C1917]">
    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800 mb-4">
      <div className="h-8 w-8 bg-yellow-500 rounded-full animate-bounce"></div>
    </div>
    <h3 className="text-lg font-semibold text-[#FAFAF9] mb-1">
      No pending books yet 💤
    </h3>
    <p className="text-[#A8A29E] max-w-md mx-auto">
      Looks like you haven't requested anything recently. Head over to the books
      list and hit that "Request" button on something exciting 📖✨
    </p>
  </div>
);

const RequestSkeleton = () => (
  <div className="bg-[#1C1917] rounded-xl border border-[#3F3F46] p-5 animate-pulse space-y-4">
    <div className="h-6 w-2/3 bg-gray-600 rounded" />
    <div className="flex items-center mt-2">
      <div className="w-4 h-4 mr-2 bg-gray-600 rounded" />
      <div className="h-4 w-1/2 bg-gray-700 rounded" />
    </div>
    <div className="flex items-center">
      <div className="w-4 h-4 mr-2 bg-gray-600 rounded" />
      <div className="h-4 w-2/3 bg-gray-700 rounded" />
    </div>
  </div>
);

export default MyPending;
