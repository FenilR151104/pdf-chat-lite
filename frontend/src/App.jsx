import { useState } from "react";
import Upload from "./Upload";
import Chat from "./Chat";
import "./App.css";

export default function App() {
  const [documentId, setDocumentId] = useState("");

  return (
    <div className="app">
      <div className="container">
        <h1 className="title">PDF Chat Lite</h1>

        {!documentId ? (
          <Upload setDocumentId={setDocumentId} />
        ) : (
          <Chat documentId={documentId} />
        )}
      </div>
    </div>
  );
}

