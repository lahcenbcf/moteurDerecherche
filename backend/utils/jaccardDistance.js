const fs = require('fs');
const path = require('path');
const natural = require('natural');
const tokenizer = new natural.WordTokenizer();


function jaccardDistance(setA, setB) {
    const intersection = new Set([...setA].filter(x => setB.has(x)));
    const union = new Set([...setA, ...setB]);
    return 1 - (intersection.size / union.size);
}

module.exports = { jaccardDistance };


function generateBookSuggestions(searchedBooks, allBooks, threshold = 0.7) {
    let suggestions = new Map();

    searchedBooks.forEach(searchedBook => {
        const searchedBookPath = path.join(__dirname, '../books', searchedBook);
        const searchedBookContent = fs.readFileSync(searchedBookPath, 'utf-8');
        const searchedTokens = new Set(tokenizer.tokenize(searchedBookContent));
        const searchedTitleMatch = searchedBookContent.match(/^Title: (.+)$/m);
        const searchedTitle = searchedTitleMatch ? searchedTitleMatch[1] : 'Unknown Title';

        allBooks.forEach(book => {
            if (book !== searchedBook) {
                const bookPath = path.join(__dirname, '../books', book);
                const bookContent = fs.readFileSync(bookPath, 'utf-8');
                const bookTokens = new Set(tokenizer.tokenize(bookContent));
                const distance = jaccardDistance(searchedTokens, bookTokens);

                if (distance < threshold) {
                    if (!suggestions.has(searchedTitle)) {
                        suggestions.set(searchedTitle, []);
                    }
                    suggestions.get(searchedTitle).push(book);
                }
            }
        });
    });

    return suggestions;
}

module.exports = { generateBookSuggestions };

