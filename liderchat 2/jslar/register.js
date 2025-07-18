window.onload = () => {
  const year = document.getElementById("year");
  const month = document.getElementById("month");
  const day = document.getElementById("day");

  for (let i = 2025; i >= 1980; i--) year.innerHTML += `<option>${i}</option>`;
  for (let i = 1; i <= 12; i++) month.innerHTML += `<option>${i}</option>`;
  for (let i = 1; i <= 31; i++) day.innerHTML += `<option>${i}</option>`;
};

let selectedGender = null;

document.getElementById("boy").onclick = () => {
  selectedGender = "boy";
  document.getElementById("boy").style.background = "lime";
  document.getElementById("girl").style.background = "gray";
};

document.getElementById("girl").onclick = () => {
  selectedGender = "girl";
  document.getElementById("girl").style.background = "pink";
  document.getElementById("boy").style.background = "gray";
};

document.querySelector(".buttonlar2[type='submit'], .buttonlar2.create")?.addEventListener("click", async () => {
  const login = document.getElementById("new-login").value.trim();
  const password = document.getElementById("new-password").value.trim();
  const again = document.getElementById("again-password").value.trim();
  const gmail = document.getElementById("gmail").value.trim();
  const tel = document.getElementById("tel").value.trim();
  const year = document.getElementById("year").value;
  const month = document.getElementById("month").value;
  const day = document.getElementById("day").value;

  const validCodes = ["99", "98", "97", "95", "93", "91", "90", "88", "77", "55", "33"];
  const isValidTel = /^[0-9]{9}$/.test(tel) && validCodes.includes(tel.slice(0, 2));
  const isValidGmail = gmail.endsWith("@gmail.com");

  if (!login || !password || password !== again || !isValidGmail || !isValidTel || !selectedGender) {
    alert("Ma'lumotlar to‘liq emas yoki xato kiritilgan.");
    return;
  }

  // 🔄 Serverdan barcha foydalanuvchilarni olish
  const res = await fetch("/users");
  const data = await res.json();
  const users = data.users;

  if (users.some(u => u.login === login || u.gmail === gmail)) {
    alert("Bu login yoki gmail allaqachon mavjud.");
    return;
  }

  const newUser = {
    login,
    password,
    gmail,
    tel: "+998" + tel,
    year,
    month,
    day,
    gender: selectedGender,
    blocked: false,
    blockedUntil: null,
  };

  users.push(newUser);

  // 🔄 Serverga foydalanuvchilar ro‘yxatini saqlash
  await fetch("/data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ users })
  });

  // 🟢 Kirgan foydalanuvchini sessiyada saqlash
  await fetch("/set-logged-user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser)
  });

  window.location.href = "login.html";
});