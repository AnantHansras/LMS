import { useEffect, useState } from 'react';
import Footer from '../Components/Footer';
import { fetchIssuedBooksToUser} from '../Services/booksAPI';
import { useDispatch } from 'react-redux';
import Issued from '../Components/Issued.jsx';

function IssuedBooks() {
  const dispatch = useDispatch();
  const [books, setBooks] = useState([]); 
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const parsedToken = token ? JSON.parse(token) : null;

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const data = await dispatch(fetchIssuedBooksToUser(parsedToken)); 
        setBooks(data.data);
        console.log(data) 
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  },[]); 

  return (
    <>
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
          {[...Array(10)].map((_, index) => (
            <BookSkeleton key={index} />
          ))}
        </div>
      ) : (
        <Issued books={books} />
      )}
      <Footer />
    </>
  );
}
const BookSkeleton = () => {
  return (
    <div className="animate-pulse rounded-xl border border-[hsla(12,7%,15%,1)] bg-[#1C1917] p-4 shadow-md">
      <div className="h-48 w-full bg-gray-300 rounded mb-4"></div> {/* Placeholder for the image */}
      <div className="h-4 w-3/4 bg-gray-300 rounded mb-2"></div> {/* Placeholder for the title */}
      <div className="h-3 w-1/2 bg-gray-300 rounded"></div> {/* Placeholder for the author */}
    </div>
  );
};
export default IssuedBooks;