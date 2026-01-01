import { useState } from "react";
import axios from "axios";

export default function Upload({ setDocumentId }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadFile = async () => {
    if (!file) {
      alert("Please select a PDF");
      return;
    }

    try {
      setLoading(true);
      const form = new FormData();
      form.append("file", file);

      const res = await axios.post("https://pdf-chat-lite-d5oy.onrender.com/api/upload", 
        form, 
        {
        headers: { "Content-Type": "multipart/form-data" }
      });
      // alert("Uploaded Successfully");
      setDocumentId(res.data.documentId);
    } catch (err) {
      console.error(err);
      alert("Upload failed — please check console");
    }

    setLoading(false);
  };

  return (
    <div className="card">
      <h2>Upload PDF</h2>

      {/* Center File Input */}
      <div className="upload-row">
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </div>

      {/* Center Button */}
      <div className="upload-row">
        <button className="btn" onClick={uploadFile} disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </button>
      </div>
    </div>
  );
}
