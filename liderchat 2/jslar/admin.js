const list = document.getElementById("accounts-list");
const search = document.getElementById("search");
const modal = document.getElementById("details-modal");

let users = [];
let selectedUser = null;

// 🔄 Serverdan foydalanuvchilarni olish
async function loadUsers(filter = "") {
  try {
    const res = await fetch("/users");
    const data = await res.json();
    users = data.users || [];

    list.innerHTML = "";
    users
      .filter(u => u.login.toLowerCase().includes(filter.toLowerCase()))
      .forEach(user => {
        const div = document.createElement("div");
        div.className = "user-card";
        div.innerHTML = `
          <img src="${user.gender === 'boy' ? 
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYDXpjAKlBEQujfYuu-aIXmwnx6A0Kp980-g&s' :
            'https://cdn.pixabay.com/photo/2024/02/14/05/34/girl-8572400_1280.png'}" class="avatar">
          <div class="info">
            <p>${user.login}</p>
            <button onclick='blockUser("${user.login}")'>Blocked</button>
            <button onclick='showDetails("${user.login}")'>Ma'lumot</button>
          </div>
        `;
        list.appendChild(div);
      });
  } catch (err) {
    console.error("Foydalanuvchilarni yuklashda xatolik:", err);
  }
}

function showDetails(login) {
  const user = users.find(u => u.login === login);
  if (!user) return;
  selectedUser = user;
  document.getElementById("modal-login").innerText = user.login;
  document.getElementById("modal-password").innerText = user.password;
  document.getElementById("modal-date").innerText = `${user.year}-${user.month}-${user.day}`;
  document.getElementById("modal-phone").innerText = user.tel;
  document.getElementById("modal-gmail").innerText = user.gmail;
  modal.style.display = "flex";
}

function closeModal() {
  modal.style.display = "none";
  selectedUser = null;
}

// 🗑 Serverdan foydalanuvchini o‘chirish
async function deleteAccount() {
  if (!selectedUser) return;
  try {
    await fetch("/delete-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login: selectedUser.login })
    });
    closeModal();
    loadUsers();
  } catch (err) {
    alert("O‘chirishda xatolik yuz berdi.");
  }
}

// ⛔ Bloklash
async function blockUser(login) {
  const blockUntil = new Date();
  blockUntil.setHours(blockUntil.getHours() + 72); // 3 kun = 72 soat
  try {
    await fetch("/block-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login, blockedUntil: blockUntil })
    });
    alert("Foydalanuvchi 3 kunga bloklandi.");
    loadUsers();
  } catch (err) {
    alert("Bloklashda xatolik.");
  }
}

search.oninput = () => loadUsers(search.value);
loadUsers();