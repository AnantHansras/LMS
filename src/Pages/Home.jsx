import React, { useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [bookQuery, setBookQuery] = useState('');
  const [recommendations, setRecommendations] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the book query to the Node.js backend
      const response = await axios.post('http://localhost:5001/api/recommend', { bookQuery });
      console.log("hi",response)
      // Update the recommendations state with the response from Node.js (which comes from Python)
      setRecommendations(response.data);
    } catch (error) {
      console.error('Error fetching :', error);
    }
  };

  return (
    <div>
      <h1>Book Recommendations</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={bookQuery} 
          onChange={(e) => setBookQuery(e.target.value)} 
          placeholder="Enter book, author, or genre"
        />
        <button type="submit">Get Recommendations</button>
      </form>

      <div>
        <h2>Recommendations:</h2>
        {recommendations.length > 0 ? (
          <ul>
            {recommendations.map((book, index) => (
              <li key={index}>
                <h3>{book.title}</h3>
                <p>{book.author}</p>
                <p>{book.genre}</p>
                <p>{book.publishedYear}</p>
                <p>Keywords: {book.keywords.join(', ')}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No recommendations available.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
