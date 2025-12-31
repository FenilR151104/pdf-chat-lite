const { randomUUID } = require("crypto");
const pdf = require("pdf-parse");
const documents = require("../utils/store");

exports.uploadPDF = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const pdfData = await pdf(req.file.buffer);

    const documentId = "doc_" + randomUUID();

    documents.set(documentId, {
      filename: req.file.originalname,
      content: pdfData.text,
      uploadDate: new Date().toISOString(),
      history: []
    });

    res.json({
      message: "PDF uploaded successfully",
      documentId,
      filename: req.file.originalname
    });

  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    res.status(500).json({
      message: "Upload failed",
      error: err.message
    });
  }
};
