let user = null;
let allUsers = [];

// Kirgan userni serverdan yuklash
async function loadUser() {
  const res = await fetch("/logged-user");
  const data = await res.json();
  if (!data.user) {
    window.location.href = "login.html";
    return;
  }

  user = data.user;
  allUsers = data.all || [];

  const now = new Date();
  if (user.blockedUntil && new Date(user.blockedUntil) > now) {
    alert("Akaunt bloklangan. Kirish mumkin emas.");
    await fetch("/logout", { method: "POST" });
    window.location.href = "login.html";
    return;
  }

  document.getElementById("user-login").innerText = user.login;
  document.getElementById("user-img").src = user.avatar || (user.gender === "boy"
    ? "https://cdn-icons-png.flaticon.com/512/1999/1999625.png"
    : "https://cdn.pixabay.com/photo/2024/02/14/05/34/girl-8572400_1280.png");
}

async function logout() {
  await fetch("/logout", { method: "POST" });
  window.location.href = "login.html";
}

function toggleLoginEdit() {
  document.getElementById("login-edit").style.display = 'block';
}

function togglePassEdit() {
  document.getElementById("pass-edit").style.display = 'block';
}

async function saveLogin() {
  const newLogin = document.getElementById("new-login").value.trim();
  if (!newLogin) return alert("Login bo'sh bo'lmasligi kerak");

  user.login = newLogin;
  await updateUser();
  document.getElementById("user-login").innerText = newLogin;
  alert("Login yangilandi");
}

async function savePassword() {
  const oldPass = document.getElementById("old-pass").value;
  const newPass = document.getElementById("new-pass").value;
  if (oldPass !== user.password) return alert("Eski parol xato");

  user.password = newPass;
  await updateUser();
  alert("Parol o'zgartirildi");
}

function changeAvatar(e) {
  const file = e.target.files[0];
  if (!file || !file.name.endsWith(".png")) return alert("Faqat PNG rasm kerak");
  const reader = new FileReader();
  reader.onload = async () => {
    user.avatar = reader.result;
    await updateUser();
    document.getElementById("user-img").src = user.avatar;
    alert("Avatar yangilandi");
  };
  reader.readAsDataURL(file);
}

async function setAdminVisible(yes) {
  user.adminVisibleUntil = yes ? Date.now() + 5 * 60 * 1000 : 0;
  await updateUser();
  alert(yes ? "Admin uchun ma'lumotlar ko‘rinadi" : "Yashirildi");
}

async function updateUser() {
  await fetch("/update-user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });
}

// Panel animatsiya
document.getElementById("menu").addEventListener("click", () => {
  const panel = document.getElementById("panel");
  panel.style.transform = panel.style.transform === "translateX(0%)" ? "translateX(100%)" : "translateX(0%)";
});

// Emoji toggle
document.addEventListener("DOMContentLoaded", () => {
  loadUser();

  const setEmoji = document.getElementById("s");
  const otaStiker = document.querySelector(".ota-stiker");

  if (setEmoji && otaStiker) {
    setEmoji.addEventListener("click", (e) => {
      e.preventDefault();
      otaStiker.style.display = otaStiker.style.display === "block" ? "none" : "block";
    });
  }
});