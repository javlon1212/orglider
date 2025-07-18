const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 8080;

// Public papkadan static fayllarga ruxsat
app.use(express.static("public"));

// `/login` sahifasiga login.html yuborish
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

// Root sahifa
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

// Serverni ishga tushirish
app.listen(port, () => {
  console.log(`✅ Server started on http://localhost:${port}`);
});
