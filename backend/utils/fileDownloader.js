const axios = require('axios');
const fs = require('fs');
const path = require("path")

async function downloadBook() {
    let random_number = Math.floor(Math.random() * (67250 - 66150 + 1)) + 66150;
    let url = `https://www.gutenberg.org/cache/epub/${random_number}/pg${random_number}.txt`;

    try {
        let response = await axios.get(url);
        while (response.data.includes('<title>404 | Project Gutenberg</title>')) {
            random_number = Math.floor(Math.random() * (67250 - 66150 + 1)) + 66150;
            url = `https://www.gutenberg.org/cache/epub/${random_number}/pg${random_number}.txt`;
            response = await axios.get(url);
        }

        const savePath = path.resolve(__dirname, '..', 'books', `${random_number}.txt`);
        fs.writeFileSync(savePath, response.data);
        return savePath;
    } catch (error) {
        console.error('Error downloading book:', error);
        throw error;
    }
}

module.exports = downloadBook;
