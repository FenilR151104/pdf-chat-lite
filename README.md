PDF Chat Lite System

Upload PDFs and ask questions — the system extracts text, stores it in memory, and answers using keyword-based matching with contextual search.

=> Project Overview

PDF Chat Lite allows users to:
- Upload a PDF document
- Extract its textual content
- Ask questions related to the document
- System searches across all uploaded PDFs
- Returns best matching sentence with context
- Displays which PDF the answer came from

=> Tech Stack

Frontend
- React + Vite
- Axios
- Modern UI

Backend
- Node.js + Express
- pdf-parse (text extraction)
- Multer (file upload)
- In-memory Map storage (No DB required)

=> API Documentation

1) Upload PDF
Endpoint: POST /api/upload
Header: Content-Type: multipart/form-data
Body: file: <PDF file>
Success Response: {
  "message": "PDF uploaded successfully",
  "documentId": "doc_12345",
  "filename": "sample.pdf"
}
Error: 404 - No file provided
       500 - PDF parsing failed

2) Ask Question
Endpoint: POST /api/ask
Body: {
  "question": "your query"
}
Success Response: {
  "file": "sample.pdf",
  "answer": "Matched relevant text here"
}
If no match: {
  "answer": "No relevant match found"
}
Error: 400 - question missing
       500 - internal error

3) List Uploaded Documents
Endpoint: GET /api/documents
Response:[
{
  "documentId": "doc_12345",
   "filename": "sample.pdf",
   "uploadedAt": "2025-01-30T10:10:10Z"
}]

=> Keyword search logic explanation

When a user asks a question:

1) Extract Keywords
Convert question to lowercase
Remove common stopwords like: the, a, an, is, are, to, from, about, of …
Keep meaningful keywords only

2) Split PDF Text
The extracted PDF text is split into meaningful lines: content.split(/\r?\n/)
Each line becomes a searchable unit.

3) Score Matching Lines
For each line:
Check if line contains each keyword (word match)
Every match = +1 score
Example:
Question: What is in-memory storage?
Keywords: ["memory", "storage"]
If line contains both → score = 2
If only one → score = 1

4) Best Match Wins
Highest score line is selected
If tie → first match chosen
If no match → "No relevant match found"

=> Local setup instructions

1) Clone Repository 
git clone  https://github.com/FenilR151104/pdf-chat-lite.git
cd pdf-chat-lite

2) Backend Setup
cd backend
npm install
node server.js
Backend runs at: http://localhost:5000

3) Frontend Setup
Open new terminal:
cd frontend
npm install
npm run dev
Frontend runs at: http://localhost:5173

4) Run both together (Frontend + Backend)
In package.json
"scripts": {
    "dev": "concurrently \"cd backend && node server.js\" \"cd frontend && npm run dev\""
}
