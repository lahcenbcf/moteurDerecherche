const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const { generateBookSuggestions } = require('../utils/jaccardDistance');
const searchResults = require('./searchResults');
router.get('/simple', (req, res) => {
    
    try {
        const allBooks = fs.readdirSync(path.join(__dirname, '../books'));
        const simpleSearchResults = searchResults.getSimpleSearchResults();
        const simpleSuggestionsMap = generateBookSuggestions(simpleSearchResults, allBooks);

        const simpleSuggestions = Array.from(simpleSuggestionsMap).map(([key, value]) => {
            return {
                searchBook: key,
                suggestions: value.map(file => {
                    const filePath = path.join(__dirname, '../books', file);
                    const fileContent = fs.readFileSync(filePath, 'utf8');
                    const titleMatch = fileContent.match(/^Title: (.+)$/m);
                    const title = titleMatch ? titleMatch[1] : 'Unknown Title';
                    const link = `https://www.gutenberg.org/cache/epub/${file.replace('.txt', '')}/pg${file.replace('.txt', '')}`;
                    return { title, link };
                })
            };
        });

        res.json(simpleSuggestions);
    } catch (error) {
        console.error("Error in simple suggestions route:", error);
        res.status(500).send("An error occurred: " + error.message);
    }
});

router.get('/advanced', (req, res) => {
    try {
        const allBooks = fs.readdirSync(path.join(__dirname, '../books'));
        const advancedSearchResults = searchResults.getAdvancedSearchResults();
        const advancedSuggestionsMap = generateBookSuggestions(advancedSearchResults, allBooks);
        const advancedSuggestions = Array.from(advancedSuggestionsMap).map(([key, value]) => {
            return {
                searchBook: key,
                suggestions: value.map(file => {
                    const filePath = path.join(__dirname, '../books', file);
                    const fileContent = fs.readFileSync(filePath, 'utf8');
                    const titleMatch = fileContent.match(/^Title: (.+)$/m);
                    const title = titleMatch ? titleMatch[1] : 'Unknown Title';
                    const link = `https://www.gutenberg.org/cache/epub/${file.replace('.txt', '')}/pg${file.replace('.txt', '')}`;
                    return { title, link };
                })
            };
        });

        res.json(advancedSuggestions);
    } catch (error) {
        console.error("Error in advanced suggestions route:", error);
        res.status(500).send("An error occurred: " + error.message);
    }
});


module.exports = router;