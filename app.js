const express = require('express');
const articleRoutes = require('./routes/articleRoutes'); // Import article routes

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Use the article routes
app.use(articleRoutes);

// Start the server
const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
