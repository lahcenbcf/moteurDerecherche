const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { kmpSearch } = require('../utils/kmpAlgorithm');
const searchResults = require('./searchResults');

router.get('/:word', (req, res) => {
  try {
    const searchWord = req.params.word;
    const directoryPath = path.join(__dirname, '../books');
    const files = fs.readdirSync(directoryPath);
    let wordOccurrences = [];

    files.forEach(file => {
        const filePath = path.join(directoryPath, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const count = kmpSearch(fileContent, searchWord);

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

    searchResults.updateSimpleSearchResults(files.filter(file => kmpSearch(fs.readFileSync(path.join(directoryPath, file), 'utf8'), searchWord) > 0));
    
    // Sort by count in descending order
    wordOccurrences.sort((a, b) => b.count - a.count);

    res.json(wordOccurrences);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
