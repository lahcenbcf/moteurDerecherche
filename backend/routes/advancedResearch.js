const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const searchResults = require('./searchResults');

router.get('/:regex', (req, res) => {
  try {
    const regexPattern = new RegExp(req.params.regex, 'gi');
    const directoryPath = path.join(__dirname, '../books');
    const files = fs.readdirSync(directoryPath);
    let wordOccurrences = [];

    files.forEach(file => {
        const filePath = path.join(directoryPath, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const matches = fileContent.match(regexPattern) || [];
        const count = matches.length;

        if (count > 0) {
            const titleMatch = fileContent.match(/^Title: (.+)$/m);
            const title = titleMatch ? titleMatch[1] : 'Unknown Title';
            const link = `https://www.gutenberg.org/cache/epub/${file.replace('.txt', '')}/pg${file.replace('.txt', '')}`;

            wordOccurrences.push({
                title: title,
                link: link,
                count: count
            });
        }
    });

    // Update the advanced search results
    searchResults.updateAdvancedSearchResults(files.filter(file => (fs.readFileSync(path.join(directoryPath, file), 'utf8').match(regexPattern) || []).length > 0));

    // Sort by count in descending order
    wordOccurrences.sort((a, b) => b.count - a.count);

    res.json(wordOccurrences);
  } catch (error) {
    res.status(500).send(error.message);
  }
});



module.exports = router;
