async function kirish() {
  const login = document.getElementById("login-login").value.trim();
  const password = document.getElementById("login-password").value.trim();
  const error = document.getElementById("ato");

  try {
    const res = await fetch("/users");
    const data = await res.json();
    const users = data.users || [];

    const user = users.find(u => u.login === login && u.password === password);

    if (user && !user.blockedUntil) {
      await fetch("/set-logged-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      window.location.href = "app-chat.html";
    } else if (user && user.blockedUntil && new Date(user.blockedUntil) > new Date()) {
      error.innerText = "Akaunt bloklangan. Kirish 3 kundan so‘ng mumkin.";
      error.style.display = "block";
    } else {
      error.innerText = "Login yoki parol noto‘g‘ri!";
      error.style.display = "block";
    }
  } catch (err) {
    error.innerText = "Tizimda xatolik. Keyinroq urinib ko‘ring.";
    error.style.display = "block";
  }
}

function togglePassword(show) {
  const passInput = document.getElementById("login-password");
  const openEye = document.getElementById("ochiq");
  const closedEye = document.getElementById("yopiq");
  passInput.type = show ? "text" : "password";
  openEye.style.display = show ? "none" : "inline";
  closedEye.style.display = show ? "inline" : "none";
}