import { useEffect, useState } from 'react';
import List from '../Components/List';
import Footer from '../Components/Footer';
import { getallbooks } from '../Services/booksAPI';
import { useDispatch } from 'react-redux';
function admin() {
  const dispatch = useDispatch();
  const [books, setBooks] = useState([]); // Initially empty
  const token = localStorage.getItem("token");
  const parsedToken = token ? JSON.parse(token) : null;

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await dispatch(getallbooks(parsedToken)); // Fetch books from API
        setBooks(data.data);
        console.log(data.data) // Update state with fetched books
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  },[]); // Runs only once when component mounts
  return (
    <>
      <List books={books} />
      <Footer />
    </>
  );
}



export default admin;