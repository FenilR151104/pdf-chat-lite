const stopWords = ["what","is","the","a","of","in","who","where","when","and","to","for"];

exports.extractKeywords = (question) => {
  return question
    .toLowerCase()
    .split(/\W+/)
    .filter(w => w && !stopWords.includes(w));
};
