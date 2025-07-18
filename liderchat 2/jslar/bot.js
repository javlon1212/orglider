document.getElementById("user-input").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    const input = event.target.value.trim().toLowerCase();
    const chatBox = document.getElementById("chat-box");

    if (input === "/start") {
      setTimeout(() => {
        const msg1 = document.createElement("div");
        msg1.className = "message right";
        msg1.textContent = "You: START";
        chatBox.appendChild(msg1);
        chatBox.scrollTop = chatBox.scrollHeight;
      }, 400);

      // 2-xabar: chap tomonda (botdan)
      setTimeout(() => {
        const msg2 = document.createElement("div");
        msg2.className = "message left";
        msg2.textContent = "Hello my name youtube bot. Pls YouTube link. LiderYoutube ok.";
        chatBox.appendChild(msg2);
        chatBox.scrollTop = chatBox.scrollHeight;
      }, 2000);
    } else {
      // Foydalanuvchining yozgan narsa
      const msg = document.createElement("div");
      msg.className = "message right";
      msg.textContent = input;
      chatBox.appendChild(msg);
      chatBox.scrollTop = chatBox.scrollHeight;

      // Agar foydalanuvchi "you" deb yozgan bo‘lsa, bot javob bermasdan faqat "ok" chiqsin
      if (input === "you") {
        const okMsg = document.createElement("div");
        okMsg.className = "message right";
        okMsg.textContent = "ok";
        chatBox.appendChild(okMsg);
        chatBox.scrollTop = chatBox.scrollHeight;
      }
    }

    // input maydonini tozalash
    event.target.value = "";
  }
});
document.addEventListener("DOMContentLoaded", function () {
    const policeBtn = document.querySelectorAll("#bPolice");
    const boty2 = document.getElementById("boty2");

    policeBtn.forEach(btn => {
        btn.addEventListener("click", () => {
            boty2.style.display = "block";
        });
    });
});
  const input = document.getElementById('user-input2');
  const chatBox = document.getElementById('chat-box2');

  input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      const msg = input.value.trim();
      if (msg === '') return;
      if (msg === '/start') {
        showUserMessage('Start');
        setTimeout(() => {
          showBotMessage("hello Police robo bot");
          showBotMessage(`my bot link: <a href="#" >@botrobo022-a</a>`);
          showCopyButton();
        }, 1000);
      }
      input.value = '';
    }
  });

  function showUserMessage(text) {
    const div = document.createElement('div');
    div.className = 'message user';
    div.innerText = `you: ${text}`;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  function showBotMessage(htmlContent) {
    const div = document.createElement('div');
    div.className = 'message bot';
    div.innerHTML = htmlContent;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  function showCopyButton() {
    const btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.textContent = 'Copy';
    btn.onclick = () => {
      navigator.clipboard.writeText('@botrobo022-a');
      btn.textContent = 'Copied!';
      setTimeout(() => {
        btn.textContent = 'Copy';
      }, 1500);
    };
    const wrapper = document.createElement('div');
    wrapper.className = 'message bot';
    wrapper.appendChild(btn);
    chatBox.appendChild(wrapper);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  //


  document.addEventListener("DOMContentLoaded", function () {
    const byut = document.querySelectorAll("#byut");
    const boty = document.getElementById("boty");

    byut.forEach(btn => {
        btn.addEventListener("click", () => {
            boty.style.display = "block";
        });
    });
});