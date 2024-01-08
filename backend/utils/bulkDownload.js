const downloadBook = require('./fileDownloader');

async function bulkDownload(numBooks) {
    for (let i = 0; i < numBooks; i++) {
        try {
            const filePath = await downloadBook();
            console.log(`Downloaded book saved to: ${filePath}`);
        } catch (error) {
            console.error('Error occurred during bulk download:', error);
        }
    }
}

module.exports = bulkDownload;
