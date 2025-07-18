const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 8080;

// 📁 Static fayllar uchun liderchat2 papkasini o‘qish
app.use(express.static(path.join(__dirname, "liderchat2")));
app.use(express.json());

// 🌐 Asosiy sahifa — login.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "liderchat2", "login.html"));
});

// 🔁 Foydalanuvchi fayli
const usersFile = path.join(__dirname, "users.json");

// 🔸 1. Barcha foydalanuvchilarni olish
app.get("/users", (req, res) => {
  if (!fs.existsSync(usersFile)) return res.json({ users: [] });
  const data = fs.readFileSync(usersFile);
  res.json(JSON.parse(data));
});

// 🔸 2. Saqlash
app.post("/data", (req, res) => {
  const { users } = req.body;
  fs.writeFileSync(usersFile, JSON.stringify({ users }));
  res.json({ status: "ok" });
});

// 🔸 3. O‘chirish
app.post("/delete-user", (req, res) => {
  const { login } = req.body;
  const data = JSON.parse(fs.readFileSync(usersFile));
  const updated = data.users.filter(u => u.login !== login);
  fs.writeFileSync(usersFile, JSON.stringify({ users: updated }));
  res.sendStatus(200);
});

// 🔸 4. Bloklash
app.post("/block-user", (req, res) => {
  const { login, blockedUntil } = req.body;
  const data = JSON.parse(fs.readFileSync(usersFile));
  const user = data.users.find(u => u.login === login);
  if (user) {
    user.blockedUntil = blockedUntil;
    fs.writeFileSync(usersFile, JSON.stringify(data));
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

// 🔸 5. Sessiya
let loggedUser = null;

app.get("/logged-user", (req, res) => {
  if (!loggedUser) return res.json({ user: null });
  const data = JSON.parse(fs.readFileSync(usersFile));
  const user = data.users.find(u => u.login === loggedUser.login);
  res.json({ user, all: data.users });
});

app.post("/set-logged-user", (req, res) => {
  loggedUser = req.body;
  res.sendStatus(200);
});

app.post("/logout", (req, res) => {
  loggedUser = null;
  res.sendStatus(200);
});

// 🔸 6. Yangilash
app.post("/update-user", (req, res) => {
  const updatedUser = req.body;
  const data = JSON.parse(fs.readFileSync(usersFile));
  const index = data.users.findIndex(u => u.gmail === updatedUser.gmail);
  if (index !== -1) {
    data.users[index] = updatedUser;
    loggedUser = updatedUser;
    fs.writeFileSync(usersFile, JSON.stringify(data));
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

// 🟢 Serverni ishga tushurish
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});