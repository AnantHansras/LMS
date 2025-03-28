import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllBookRequest, approveRequest } from "../Services/booksAPI";
const Pending = () => {
    const dispatch = useDispatch();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const parsedToken = token ? JSON.parse(token) : null;
  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    const response = await dispatch(getAllBookRequest(parsedToken))
    setRequests(response.requests);
  };

  const approveReq = async (transactionID) => {
      const response = await dispatch(approveRequest(transactionID,parsedToken))
      fetchRequests();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Pending Issue Requests</h1>
      {loading ? (
        <p>Loading...</p>
      ) : requests.length === 0 ? (
        <p>No pending requests.</p>
      ) : (
        <div className="grid gap-4">
          {requests.map((request) => (
            <div key={request._id} className="p-4 border rounded-lg shadow-md">
              <h2 className="text-lg font-semibold">{request.bookId.title}</h2>
              <p>Author: {request.bookId.author}</p>
              <p>User: {request.userId.name} ({request.userId.email})</p>
              <button 
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" 
                onClick={() => approveReq(request._id)}
              >
                Approve
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Pending;
