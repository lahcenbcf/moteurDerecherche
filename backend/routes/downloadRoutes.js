const express = require('express');
const router = express.Router();
const bulkDownload = require('../utils/bulkDownload');

router.get('/download', async (req, res) => {
    try {
        const numBooks = 1600; // Number of books to download
        await bulkDownload(numBooks);
        res.send('Bulk download initiated. Check server logs for progress.');
    } catch (error) {
        res.status(500).send('Error occurred during bulk download');
    }
});

module.exports = router;
