const documents = require("../utils/store");
const { extractKeywords } = require("../services/keywordService");

exports.askQuestion = (req, res) => {
  const { question } = req.body;

  if (!question)
    return res.status(400).json({ message: "Question required" });

  if (documents.size === 0)
    return res.json({
      answer: "No documents available to search"
    });

  const keywords = extractKeywords(question);

  let bestMatch = "";
  let bestScore = 0;
  let bestFile = "";

  documents.forEach((doc) => {
    const lines = doc.content
      .split(/\r?\n/)
      .map(l => l.trim())
      .filter(l => l.length > 2);

    lines.forEach(line => {
      let score = 0;
      keywords.forEach(k => {
        const regex = new RegExp("\\b" + k + "\\b", "i");
        if (regex.test(line)) score++;
      });

      if (score > bestScore) {
        bestScore = score;
        bestMatch = line;
        bestFile = doc.filename;
      }
    });
  });

  if (!bestMatch)
    return res.json({
      answer: "No relevant match found"
    });

  res.json({
    file: bestFile,
    answer: bestMatch
  });
};
