const express = require('express');
const { addArticle, getArticle, search } = require('../controllers/articleController'); // Import controller functions

const router = express.Router();

// Define routes
router.post('/articles', addArticle);         // Add an article
router.get('/articles/:id', getArticle);     // Get an article by ID
router.get('/articles/search', search);      // Search articles by keyword

module.exports = router; // Export the route