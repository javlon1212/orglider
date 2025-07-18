// jslar/main.js
window.addEventListener("load", () => {
  const bg = localStorage.getItem("chat-bg");
  if (bg) {
    const ong = document.querySelector(".ong");
    if (ong) {
      ong.style.backgroundImage = `url('${bg}')`;
      ong.style.backgroundSize = "cover";
      ong.style.backgroundPosition = "center";
    }
  }

  const menu = document.getElementById("menu");
  const bshi = document.querySelector(".bshi");
  const chap = document.querySelector(".chap");
  const chap32 = document.querySelector(".chap32");
  const overlay = document.getElementById("overlay");

  if (menu && bshi && chap32 && overlay && chap) {
    menu.addEventListener("click", () => {
      bshi.classList.add("hidden");
      chap32.classList.add("active");
      overlay.style.display = "block";
    });

    overlay.addEventListener("click", () => {
      chap32.classList.remove("active");
      setTimeout(() => {
        bshi.classList.remove("hidden");
        chap.style.display = "flex";
        overlay.style.display = "none";
      }, 300);
    });
  }
});

function ochilqoshihs() {
  const qoshishDiv = document.querySelector(".qoshish");
  if (qoshishDiv) {
    if (qoshishDiv.style.display === "none" || qoshishDiv.style.display === "") {
      qoshishDiv.style.display = "block";
    } else {
      qoshishDiv.style.display = "none";
    }
  }
}