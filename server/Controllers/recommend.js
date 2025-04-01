const axios = require('axios');

const recommendBooks = async (req, res) => {
  const { bookQuery } = req.body;

  try {
    
    const response = await axios.post('http://localhost:5002/recommend_py', { bookQuery });
    
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    res.status(500).json({ message: 'Error fetching recommendation' });
  }
};

module.exports = { recommendBooks };
