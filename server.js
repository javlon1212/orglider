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
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
