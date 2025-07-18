document.addEventListener("DOMContentLoaded", () => {
  const good = document.getElementById("good");
  const noggod = document.getElementById("noggod");
  const prem = document.querySelector(".prem");
  const otaStiker = document.querySelector(".ota-stiker");

  good.style.display = "none";
  noggod.style.display = "none";

  const payments = [
    { id: "68769a349b04b5164395d362", hours: 24 },
    { id: "68769a73b49e2a9ab67159c8", hours: 720 },
    { id: "68769b2113e70db8dfed513d", hours: 8730 }
  ];

  const savePayment = (hours) => {
    const now = Date.now();
    const expire = now + hours * 3600000;
    localStorage.setItem("payInfo", JSON.stringify({ start: now, expire }));
  };

  const checkRealPayment = async (paymeId) => {
    try {
      const res = await fetch(`https://checkout.test.paycom.uz/api/check-order/${paymeId}`);
      const data = await res.json();
      if (data.status === "success") {
        const pay = payments.find(p => p.id === paymeId);
        savePayment(pay.hours);
        good.style.display = "block";
        noggod.style.display = "none";
      } else {
        noggod.style.display = "block";
        good.style.display = "none";
      }
    } catch {
      noggod.style.display = "block";
      good.style.display = "none";
    }
  };

  payments.forEach(pay => {
    const link = document.querySelector(`a[href*="${pay.id}"]`);
    if (link) {
      link.addEventListener("click", () => {
        setTimeout(() => checkRealPayment(pay.id), 1000);
      });
    }
  });

  const setEmojiBtn = document.getElementById("s");
  if (setEmojiBtn) {
    setEmojiBtn.addEventListener("click", () => {
      const info = JSON.parse(localStorage.getItem("payInfo"));
      const now = Date.now();
      if (info && now < info.expire) {
        if (otaStiker) otaStiker.style.display = "none";
        if (prem) prem.style.display = "block";
      } else {
        if (otaStiker) otaStiker.style.display = "block";
        if (prem) prem.style.display = "none";
      }
    });
  }

  const backBtn = document.querySelector('a[href*="app-chat.html"]');
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      if (otaStiker) otaStiker.style.display = "none";
      if (prem) prem.style.display = "none";
    });
  }
});