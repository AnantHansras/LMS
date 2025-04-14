import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllBookRequest, approveRequest } from "../Services/booksAPI"
import { BookOpen, User, Mail,CalendarDays , CheckCircle, Loader } from "lucide-react"

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

const Pending = () => {
  const dispatch = useDispatch()
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const token = localStorage.getItem("token")
  const parsedToken = token ? JSON.parse(token) : null
    const currentTheme = useSelector((state) => state.theme.theme);
    const theme = themeStyles[currentTheme.toLowerCase()] || themeStyles["midnight"];

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
    <div className="min-h-screen p-6" style={{ backgroundColor: theme.background, color: theme.textPrimary }}>
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-wide" style={{ color: theme.accent }}>Pending Issue Requests</h1>
        <p className="mt-1" style={{ color: theme.textMuted }}>Manage and approve pending book requests</p>
      </header>

      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <RequestSkeleton key={index} theme={theme} />
          ))}
        </div>
      ) : requests.length === 0 ? (
        <EmptyState theme={theme} />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {requests.map((request) => (
            <RequestCard key={request._id} request={request} onApprove={approveReq} theme={theme} />
          ))}
        </div>
      )}
    </div>
  )
}




const RequestCard = ({ request, onApprove, theme }) => {
  const [isApproving, setIsApproving] = useState(false)
  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };
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
    <div className="rounded-xl p-5 shadow-md hover:shadow-lg transition" style={{ backgroundColor: theme.cardBg, border: `1px solid ${theme.border}`, color: theme.textPrimary }}>
      {/* Book Title */}
      <h2 className="text-xl font-semibold mb-1" style={{ color: theme.textPrimary }}>{truncateText(request.bookId.title, 27)}</h2>
      <div className="flex items-start text-sm mb-2" style={{ color: theme.textMuted }}>
        <BookOpen className="w-4 h-4 mr-2 mt-0.5" style={{ color: theme.accent }} />
        <span>Author : {request.bookId.author}</span>
      </div>
      {/* Request Date */}
      <div className="flex items-start text-sm mb-2" style={{ color: theme.textMuted }}>
        <CalendarDays className="w-4 h-4 mr-2" style={{ color: theme.accent }} />
        <span>Requested on : {formattedDate}</span>
      </div>

      {/* Author */}
     

      {/* Requested by */}
      <div className="flex items-start text-sm mb-2" style={{ color: theme.textMuted }}>
        <User className="w-4 h-4 mr-2 mt-0.5" style={{ color: theme.accent }} />
        <span>Requested By : {request.userId.name}</span>
      </div>

      {/* Email */}
      <div className="flex items-start text-sm" style={{ color: theme.textMuted }}>
        <Mail className="w-4 h-4 mr-2 mt-0.5" style={{ color: theme.accent }} />
        <span className="break-all">{request.userId.email}</span>
      </div>

      {/* Approve Button */}
      <div className="mt-5">
        <button
          className={`w-full py-2 px-4 active:scale-90 rounded-md font-medium flex items-center justify-center transition duration-300 ${
            isApproving
              ? "cursor-not-allowed"
              : ""
          }`}
          onClick={handleApprove}
          disabled={isApproving}
          style={{
            backgroundColor: isApproving ? theme.accentHover : theme.accent,
            color: theme.buttonText,
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = theme.accentHover)}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = theme.accent)}
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


const EmptyState = ({ theme }) => (
  <div className="text-center w-fit mx-auto mt-20 py-12 px-4 rounded-lg border-2 border-dashed" style={{ borderColor: theme.border, backgroundColor: theme.cardBg, color: theme.textPrimary }}>
    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: theme.border }}>
      <div className="h-8 w-8 rounded-full" style={{ backgroundColor: theme.accent }}></div>
    </div>
    <h3 className="text-lg font-medium mb-1" style={{ color: theme.textPrimary }}>No pending requests</h3>
    <p className="text-sm max-w-md mx-auto" style={{ color: theme.textMuted }}>
      There are currently no book issue requests waiting for approval. New requests will appear here.
    </p>
  </div>
)

const RequestSkeleton = ({ theme }) => (
  <div className="rounded-xl p-5 animate-pulse space-y-4" style={{ backgroundColor: theme.cardBg, border: `1px solid ${theme.border}` }}>
  
    {/* Status Badge */}
    <div className="w-20 h-5 rounded-full" style={{ backgroundColor: theme.border }} />

    {/* Book Title */}
    <div className="h-6 w-2/3 rounded" style={{ backgroundColor: theme.border }} />

    {/* Author */}
    <div className="flex items-center mt-2">
      <div className="w-4 h-4 mr-2 rounded" style={{ backgroundColor: theme.border }} />
      <div className="h-4 w-1/2 rounded" style={{ backgroundColor: theme.border }} />
    </div>

    {/* Username */}
    <div className="flex items-center">
      <div className="w-4 h-4 mr-2 rounded" style={{ backgroundColor: theme.border }} />
      <div className="h-4 w-2/3 rounded" style={{ backgroundColor: theme.border }} />
    </div>

    {/* Email */}
    <div className="flex items-center">
      <div className="h-4 w-3/4 rounded" style={{ backgroundColor: theme.border }} />
    </div>

    {/* Approve Button */}
    <div className="mt-4 h-10 rounded" style={{ backgroundColor: theme.border }} />
  </div>
)


export default Pending