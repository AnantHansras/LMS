import { useEffect, useState } from 'react';
import List from '../Components/List';
import Footer from '../Components/Footer';
import { fetchIssuedBooksToUser} from '../Services/booksAPI';
import { useDispatch } from 'react-redux';
import Issued from '../Components/Issued.jsx';
function IssuedBooks() {
  const dispatch = useDispatch();
  const [books, setBooks] = useState([]); 
  const token = localStorage.getItem("token");
  const parsedToken = token ? JSON.parse(token) : null;

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await dispatch(fetchIssuedBooksToUser(parsedToken)); 
        setBooks(data.data);
        console.log(data) 
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  },[]); 

  return (
    <>
      <Issued books={books} />
      <Footer />
    </>
  );
}



export default IssuedBooks;