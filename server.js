const express = require('express');
const cors = require('cors');
require('dotenv').config();

const debateController = require('./controllers/debateController'); // Import debate controller

const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies
app.use(cors({ origin: 'http://localhost:3000' })); // Replace with your frontend URL


// Define a simple route for the root path
app.get('/', (req, res) => {
  res.send('Backend is deployed and running');
});

// Define a route for starting the debate
app.post('/startDebate', debateController.startDebate);

// Start the server and listen on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});