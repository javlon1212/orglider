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


//p


const fs = require("fs");

// Ma'lumot olish
app.get("/data", (req, res) => {
  const filePath = path.join(__dirname, "data.json");
  if (!fs.existsSync(filePath)) {
    return res.json({ text: "" });
  }
  const json = fs.readFileSync(filePath);
  res.json(JSON.parse(json));
});

// Ma'lumot yozish
app.use(express.json());
app.post("/data", (req, res) => {
  const filePath = path.join(__dirname, "data.json");
  const { text } = req.body;
  fs.writeFileSync(filePath, JSON.stringify({ text }));
  res.json({ status: "ok" });
});