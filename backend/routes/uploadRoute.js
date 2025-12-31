const express = require("express");
const multer = require("multer");
const { uploadPDF } = require("../controllers/uploadController");
const documents = require("../utils/store");

const router = express.Router();

// Use memory storage 
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload Route
router.post("/upload", upload.single("file"), uploadPDF);

// List All Uploaded Documents
router.get("/documents", (req, res) => {
  const list = [];

  documents.forEach((value, key) => {
    list.push({
      documentId: key,
      filename: value.filename,
      uploadedAt: value.uploadDate
    });
  });

  res.json(list);
});

module.exports = router;
