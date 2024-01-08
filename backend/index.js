const express = require('express');
const cors=require("cors")
const downloadRoutes = require('./routes/downloadRoutes');
const simpleResearchRoutes = require('./routes/simpleResearch');
const advancedResearchRoutes = require('./routes/advancedResearch');
const suggestionRoutes = require('./routes/suggestions');

const app = express();

const PORT = process.env.PORT || 8081;
app.use(cors())
app.use('/api', downloadRoutes);
app.use('/simpleResearch', simpleResearchRoutes);
app.use('/advancedResearch', advancedResearchRoutes);
app.use('/suggestion', suggestionRoutes);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
