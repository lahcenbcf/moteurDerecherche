// In a file like 'searchResults.js'
let fileNamesSimple = [];
let fileNamesAdvanced = [];

function updateSimpleSearchResults(results) {
    fileNamesSimple = results;
}

function updateAdvancedSearchResults(results) {
    fileNamesAdvanced = results;
}

function getSimpleSearchResults() {
    return fileNamesSimple;
}

function getAdvancedSearchResults() {
    return fileNamesAdvanced;
}

module.exports = {
    updateSimpleSearchResults,
    updateAdvancedSearchResults,
    getSimpleSearchResults,
    getAdvancedSearchResults
};
