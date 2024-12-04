const articles = []; // In-memory storage for articles
const { v4: uuidv4 } = require('uuid');

/**
 * Add a new article.
 */
const addArticle = (req, res) => {
    const { title, content, tags } = req.body;

    // Validate input fields
    if (!title || !content || !Array.isArray(tags)) {
        return res.status(400).json({ error: "Invalid article data. Ensure 'title', 'content', and 'tags' are provided." });
    }

    const newArticle = {
        id: uuidv4(),
        title,
        content,
        tags,
        date: new Date(),
    };

    articles.push(newArticle); // Add to in-memory array
    res.status(201).json(newArticle); // Respond with the new article
};

/**
 * Get an article by ID.
 */
const getArticle = (req, res) => {
    const article = articles.find(a => a.id === req.params.id);

    if (!article) {
        return res.status(404).json({ error: "Article not found" });
    }

    res.json(article);
};

/**
 * Search articles by keyword in title or content.
 */
const search = (req, res) => {
    const { keyword, sortBy = "relevance" } = req.query;

    if (!keyword) {
        return res.status(400).json({ error: "Keyword is required for searching." });
    }

    const keywordLower = keyword.toLowerCase();
    const matchedArticles = articles.filter(article =>
        article.title.toLowerCase().includes(keywordLower) ||
        article.content.toLowerCase().includes(keywordLower)
    );

    // Sort based on relevance or date
    if (sortBy === "relevance") {
        matchedArticles.sort((a, b) => {
            const freqA = (a.title.match(new RegExp(keyword, "gi")) || []).length +
                          (a.content.match(new RegExp(keyword, "gi")) || []).length;
            const freqB = (b.title.match(new RegExp(keyword, "gi")) || []).length +
                          (b.content.match(new RegExp(keyword, "gi")) || []).length;
            return freqB - freqA;
        });
    } else if (sortBy === "date") {
        matchedArticles.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    res.json(matchedArticles);
};

module.exports = { addArticle, getArticle, search };