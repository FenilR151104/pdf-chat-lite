const express = require("express");
const cors = require("cors");

const uploadRoute = require("./routes/uploadRoute");
const askRoute = require("./routes/askRoute");

const app = express();

app.use(cors());
app.use(express.json());

// Debug logger
app.use((req, res, next) => {
  console.log("REQUEST:", req.method, req.url);
  next();
});

// Test route
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend working" });
});

// Routes
app.use("/api", uploadRoute);
app.use("/api", askRoute);

// Start server
const PORT = 5000;

const server = app.listen(PORT, () => {
  console.log(`Backend running on ${PORT}`);
});

// Show errors if any
server.on("error", (err) => {
  console.error("SERVER ERROR:", err);
});

