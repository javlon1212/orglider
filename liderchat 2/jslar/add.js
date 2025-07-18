document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.getElementById("add");
  const qName = document.getElementById("qName");
  const plaUser = document.getElementById("pla-user");
  const userNo = document.getElementById("userNo");
  const pastDiv = document.querySelector(".past");

  // 👇 All users ro‘yxati (doimiy)
  const allUsers = [
    { login: "ali", name: "Ali", avatar: "./ipmage/ali.png" },
    { login: "vali", name: "Vali", avatar: "./ipmage/vali.png" },
    { login: "sami", name: "Sami", avatar: "./ipmage/logo.png" }
  ];

  // Serverdan qo‘shilgan userlarni olish
  async function getUsersFromServer() {
    const res = await fetch("/data");
    const data = await res.json();
    return data.users || [];
  }

  // Serverga yangi userni yuborish
  async function saveUsersToServer(users) {
    await fetch("/data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ users })
    });
  }

  // Userlarni chiqarish
  async function renderUsers() {
    const addedUsers = await getUsersFromServer();
    pastDiv.innerHTML = "";
    addedUsers.slice().reverse().forEach(({ name, login, avatar }) => {
      const btn = document.createElement("button");
      btn.className = "user-button";
      btn.innerHTML = `
        <div class="but-chap">
          <img class="logosi" src="${avatar || "./ipmage/logo.png"}" alt="">
          <p class="nomi">${name}</p>
          <img class="stikeri" src="./ipmage/logo.png" alt="">
        </div>
        <div class="but-ong">
          <p class="x-soni">1</p>
        </div>
      `;
      pastDiv.prepend(btn);
    });
  }

  renderUsers(); // Sahifa yuklanganda

  // "Add" tugmasi bosilganda
  addBtn.onclick = async () => {
    const name = qName.value.trim();
    const loginInput = plaUser.value.trim();

    if (!name || !loginInput.startsWith("@")) {
      userNo.textContent = "@ bilan login kiriting";
      return;
    }

    const login = loginInput.slice(1);
    const foundUser = allUsers.find(u => u.login === login);

    if (!foundUser) {
      userNo.textContent = "Login topilmadi!";
      return;
    }

    let addedUsers = await getUsersFromServer();

    if (addedUsers.some(u => u.login === login)) {
      userNo.textContent = "Bu foydalanuvchi allaqachon qo‘shilgan!";
      return;
    }

    addedUsers.push({ name, login, avatar: foundUser.avatar });
    await saveUsersToServer(addedUsers);

    userNo.textContent = "Foydalanuvchi qo‘shildi!";
    qName.value = "";
    plaUser.value = "";

    renderUsers(); // Yangidan chiqaramiz
  };
});