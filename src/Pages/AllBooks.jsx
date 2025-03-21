import { useState } from 'react';
import List from '../Components/List';
import Footer from '../Components/Footer';
import Header from '../Components/Header';

function AllBooks() {
  const [books] = useState([
    { _id: 1, title: "Machine Learning", author: "J.K. Rowling", genre: "Fantasy" },
    { _id: 2, title: "A Textbook of Engineering Mechanics", author: "D.S. Kumar", genre: "Engineering" },
    { _id: 3, title: "Software Engineering", author: "Niranjli Singh, Rakesh Kumar", genre: "Engineering" },
    { _id: 4, title: "AI Engineering", author: "Chip Huyen", genre: "Artificial Intelligence" },
    { _id: 5, title: "Aerospace Engineering Beginner's Guide", author: "Andrew L. Long", genre: "Engineering" },
    { _id: 6, title: "The Art of Prompt Engineering with ChatGPT", author: "Norhan Hunter", genre: "Technology" },
    { _id: 7, title: "Advanced Object-Oriented Programming", author: "Unknown", genre: "Programming" },
    { _id: 8, title: "Internet of Things", author: "Dr. Vishal Chaurasiya, Dr. Abhishek Arya", genre: "Technology" },
    { _id: 9, title: "Cloud Computing", author: "Dr. Neeraj Verma, Deepak Khushwah, Dheeraj Goyal", genre: "Technology" },
    { _id: 10, title: "Social Engineering: The Science of Human Hacking", author: "Christopher Hadnagy", genre: "Cybersecurity" },
    { _id: 11, title: "Deep Learning from Scratch", author: "Seth Weidman", genre: "Artificial Intelligence" },
    { _id: 12, title: "Deep Learning", author: "Dr. Praveen Kumar, Dr. Aastha Parikh", genre: "Artificial Intelligence" },
  ]);

  return (
    <>
      <Header/>
      <List books={books} />
      <Footer />
    </>
  );
}



export default AllBooks;