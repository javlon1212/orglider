// 🟢 Kirgan userni serverdan olish
window.addEventListener("DOMContentLoaded", async () => {
  const res = await fetch("/logged-user");
  const data = await res.json();
  const user = data.user;

  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const now = new Date();
  if (user.blockedUntil && new Date(user.blockedUntil) > now) {
    alert("Akaunt bloklangan. Kirish mumkin emas.");
    await fetch("/logout", { method: "POST" });
    window.location.href = "login.html";
    return;
  }

  const loginElem = document.getElementById("user-login");
  const imgElem = document.getElementById("user-img");

  if (loginElem) loginElem.innerText = user.login;
  if (imgElem) {
    imgElem.src = user.avatar || (
      user.gender === "boy"
        ? "https://cdn-icons-png.flaticon.com/512/1999/1999625.png"
        : "https://cdn.pixabay.com/photo/2024/02/14/05/34/girl-8572400_1280.png"
    );
  }
});

// 🟢 Chat background localStorage'dan
window.addEventListener('load', () => {
  const bg = localStorage.getItem('chat-bg');
  if (bg) {
    const ong = document.querySelector('.ong');
    if (ong) {
      ong.style.backgroundImage = `url('${bg}')`;
      ong.style.backgroundSize = 'cover';
      ong.style.backgroundPosition = 'center';
    }
  }
});

// 🔁 Usul tanlash
const startBtn = document.getElementById("start");
const chiUsul1 = document.querySelector(".chi-usul1");
const chiUsul2 = document.querySelector(".chi-usul2");

startBtn?.addEventListener("click", () => {
  chiUsul1.style.display = "none";
  chiUsul2.style.display = "flex";
  localStorage.setItem("inputVisible", "true");
});

window.addEventListener("load", () => {
  if (localStorage.getItem("inputVisible") === "true") {
    chiUsul1.style.display = "none";
    chiUsul2.style.display = "flex";
  }
});

// 🎧 YouTube audio yuklash (serverda /api/download-audio endpoint kerak!)
document.getElementById("downloadBtn")?.addEventListener("click", async function () {
  const response = await fetch('/api/download-audio', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url: 'https://www.youtube.com/watch?v=c7DwV2HMmNw' })
  });

  const data = await response.json();
  if (data.success) {
    const link = document.getElementById("downloadLink");
    link.href = data.audioUrl;
    link.style.display = 'inline';
    link.textContent = 'Download';
  } else {
    alert("Audio yuklab olinmadi");
  }
});

// 🎛 Menyu toggle
const menu = document.getElementById('menu');
const bshi = document.querySelector('.bshi');
const chap = document.querySelector('.chap');
const chap32 = document.querySelector('.chap32');
const overlay = document.getElementById('overlay');

menu?.addEventListener('click', () => {
  bshi.classList.add('hidden');
  chap32.classList.add('active');
  overlay.style.display = 'block';
});

overlay?.addEventListener('click', () => {
  chap32.classList.remove('active');
  setTimeout(() => {
    bshi.classList.remove('hidden');
    chap.style.display = 'flex';
    overlay.style.display = 'none';
  }, 300);
});

// ➕ Qoshish panelini ochish
function ochilqoshihs() {
  const qoshishDiv = document.querySelector('.qoshish');
  if (qoshishDiv.style.display === 'none' || qoshishDiv.style.display === '') {
    qoshishDiv.style.display = 'block';
  } else {
    qoshishDiv.style.display = 'none';
  }
}