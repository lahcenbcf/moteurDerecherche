function buildKMPTable(pattern) {
    const lps = new Array(pattern.length);
    let length = 0; // length of the previous longest prefix suffix
    lps[0] = 0; // lps[0] is always 0
    let i = 1;

    // Loop calculates lps[i] for i = 1 to pattern.length - 1
    while (i < pattern.length) {
        if (pattern[i] === pattern[length]) {
            length++;
            lps[i] = length;
            i++;
        } else {
            if (length !== 0) {
                length = lps[length - 1];
            } else {
                lps[i] = 0;
                i++;
            }
        }
    }

    return lps;
}

function kmpSearch(text, pattern) {
    const lps = buildKMPTable(pattern);
    let j = 0; // index for pattern[]
    let i = 0; // index for text[]
    let result = 0;

    while (i < text.length) {
        if (pattern[j] === text[i]) {
            j++;
            i++;
        }
        if (j === pattern.length) {
            result++;
            j = lps[j - 1];
        } else if (i < text.length && pattern[j] !== text[i]) {
            if (j !== 0) {
                j = lps[j - 1];
            } else {
                i = i + 1;
            }
        }
    }

    return result;
}

module.exports = { kmpSearch };


