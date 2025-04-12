import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { getAllBookRequest, approveRequest } from "../Services/booksAPI"
import { BookOpen, User, Mail,CalendarDays , CheckCircle, Loader } from "lucide-react"

const Pending = () => {
  const dispatch = useDispatch()
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const token = localStorage.getItem("token")
  const parsedToken = token ? JSON.parse(token) : null

  useEffect(() => {
    fetchRequests()
  }, [])

  const fetchRequests = async () => {
    setLoading(true)
    try {
      const response = await dispatch(getAllBookRequest(parsedToken))
      setRequests(response.requests)
    } catch (error) {
      console.error("Failed to fetch requests:", error)
    } finally {
      setLoading(false)
    }
  }

  const approveReq = async (transactionID) => {
    try {
      await dispatch(approveRequest(transactionID, parsedToken))
      fetchRequests()
    } catch (error) {
      console.error("Failed to approve request:", error)
    }
  }

  return (
    <div className="bg-[#0c0A09] min-h-screen text-[#FAFAF9] p-6 max-w-7xl mx-auto">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-wide text-[#EA580c]">Pending Issue Requests</h1>
        <p className="text-[#A8A29E] mt-1">Manage and approve pending book requests</p>
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
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {requests.map((request) => (
            <RequestCard key={request._id} request={request} onApprove={approveReq} />
          ))}
        </div>
      )}
    </div>
  )
}




const RequestCard = ({ request, onApprove }) => {
  const [isApproving, setIsApproving] = useState(false)

  const handleApprove = async () => {
    setIsApproving(true)
    try {
      await onApprove(request._id)
    } finally {
      setIsApproving(false)
    }
  }

  const formattedDate = new Date(request.requestDate).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })

  return (
    <div className="bg-[#0c0A09] rounded-xl border border-[#3F3F46] p-5 shadow-md hover:shadow-lg transition">
      {/* Book Title */}
      <h2 className="text-xl font-semibold text-[#FAFAF9] mb-1">{request.bookId.title}</h2>
      <div className="flex items-start text-sm text-[#D4D4D8] mb-2">
        <BookOpen className="w-4 h-4 text-yellow-400 mr-2 mt-0.5" />
        <span>Author : {request.bookId.author}</span>
      </div>
      {/* Request Date */}
      <div className="flex items-start text-sm text-[#D4D4D8] mb-2">
        <CalendarDays className="w-4 h-4 mr-2 text-gray-400" />
        <span>Requested on : {formattedDate}</span>
      </div>

      {/* Author */}
     

      {/* Requested by */}
      <div className="flex items-start text-sm text-[#D4D4D8] mb-2">
        <User className="w-4 h-4 text-emerald-400 mr-2 mt-0.5" />
        <span>Requested By : {request.userId.name}</span>
      </div>

      {/* Email */}
      <div className="flex items-start text-sm text-[#D4D4D8]">
        <Mail className="w-4 h-4 text-blue-400 mr-2 mt-0.5" />
        <span className="break-all">{request.userId.email}</span>
      </div>

      {/* Approve Button */}
      <div className="mt-5">
        <button
          className={`w-full py-2 px-4 active:scale-90 rounded-md font-medium flex items-center justify-center transition duration-300 ${
            isApproving
              ? "bg-gray-700 text-gray-400 cursor-not-allowed"
              : "bg-[hsla(21,90%,48%,1)] hover:bg-[hsla(21,90%,48%,0.7)] text-[#FAFAF9]"
          }`}
          onClick={handleApprove}
          disabled={isApproving}
        >
          {isApproving ? (
            <span className="flex items-center">
              <Loader className="w-4 h-4 mr-2 animate-spin" />
              Processing...
            </span>
          ) : (
            <>
              <CheckCircle className="w-4 h-4 mr-2" />
              Approve Request
            </>
          )}
        </button>
      </div>
    </div>
  )
}


const EmptyState = () => (
  <div className="text-center w-fit mx-auto mt-20 py-12 px-4 rounded-lg border-2 border-dashed border-[#3F3F46] bg-[#1C1917]">
    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800 mb-4">
      <div className="h-8 w-8 bg-gray-600 rounded-full"></div>
    </div>
    <h3 className="text-lg font-medium text-[#FAFAF9] mb-1">No pending requests</h3>
    <p className="text-[#A8A29E] max-w-md mx-auto">
      There are currently no book issue requests waiting for approval. New requests will appear here.
    </p>
  </div>
)

const RequestSkeleton = () => (
  <div className="bg-[#1C1917] rounded-xl border border-[#3F3F46] p-5 animate-pulse space-y-4">
  
    {/* Status Badge */}
    <div className="w-20 h-5 bg-gray-700 rounded-full" />

    {/* Book Title */}
    <div className="h-6 w-2/3 bg-gray-600 rounded" />

    {/* Author */}
    <div className="flex items-center mt-2">
      <div className="w-4 h-4 mr-2 bg-gray-600 rounded" />
      <div className="h-4 w-1/2 bg-gray-700 rounded" />
    </div>

    {/* Username */}
    <div className="flex items-center">
      <div className="w-4 h-4 mr-2 bg-gray-600 rounded" />
      <div className="h-4 w-2/3 bg-gray-700 rounded" />
    </div>

    {/* Email */}
    <div className="flex items-center">
      <div className="text-gray-600 mr-2">📧</div>
      <div className="h-4 w-3/4 bg-gray-700 rounded" />
    </div>

    {/* Approve Button */}
    <div className="mt-4 h-10 bg-gray-700 rounded" />
  </div>
)


export default Pending
