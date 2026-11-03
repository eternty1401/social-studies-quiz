// ==========================================
// اسکریپت دستیار هوشمند و خلاصه‌ساز
// ==========================================

const aiBotStyles = `
  .ai-chat-btn {
    position: fixed; bottom: 20px; right: 20px; width: 60px; height: 60px; border-radius: 50%;
    background: linear-gradient(135deg, #00acc1, #00838f); color: white; font-size: 30px;
    border: none; cursor: pointer; box-shadow: 0 4px 15px rgba(0,0,0,0.3); z-index: 10000;
    display: flex; justify-content: center; align-items: center; transition: 0.3s;
  }
  .ai-chat-btn:hover { transform: scale(1.1); }
  
  .ai-chat-window {
    position: fixed; bottom: 90px; right: 20px; width: 350px; max-width: calc(100vw - 40px);
    height: 450px; background: #fff; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    display: none; flex-direction: column; z-index: 10000; overflow: hidden; border: 1px solid #eee;
    font-family: 'Vazirmatn', Tahoma, sans-serif;
  }
  .ai-chat-header { background: #00acc1; color: white; padding: 15px; font-weight: 900; display: flex; justify-content: space-between; align-items: center; }
  .ai-chat-messages { flex: 1; padding: 15px; overflow-y: auto; background: #f9f9f9; display: flex; flex-direction: column; gap: 10px; font-size: 0.9rem; }
  .ai-msg { padding: 10px 15px; border-radius: 10px; max-width: 85%; line-height: 1.6; white-space: pre-wrap; }
  .ai-msg.user { background: #e0f7fa; color: #006064; align-self: flex-start; }
  .ai-msg.bot { background: #fff; color: #333; align-self: flex-end; border: 1px solid #eee; }
  .ai-chat-input-area { display: flex; padding: 10px; background: #fff; border-top: 1px solid #eee; }
  .ai-chat-input-area input { flex: 1; padding: 10px; border: 1px solid #ddd; border-radius: 20px; outline: none; font-family: inherit; font-size: 0.9rem; }
  .ai-chat-input-area button { background: #00acc1; color: white; border: none; border-radius: 50%; width: 40px; height: 40px; margin-right: 10px; cursor: pointer; font-size: 1.2rem; display: flex; justify-content: center; align-items: center; }

  /* دکمه شناور خلاصه ساز */
  .ai-summarize-btn {
    position: fixed; bottom: 90px; right: 20px; width: 50px; height: 50px; border-radius: 50%;
    background: #f39c12; color: white; font-size: 1.2rem; border: none; cursor: pointer;
    box-shadow: 0 4px 15px rgba(0,0,0,0.3); z-index: 9999; display: none; 
    justify-content: center; align-items: center; transition: 0.3s;
  }
  .ai-summarize-btn:hover { transform: scale(1.1); }
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = aiBotStyles;
document.head.appendChild(styleSheet);

const botHTML = `
  <button class="ai-chat-btn" onclick="toggleChat()">🤖</button>
  <div class="ai-chat-window" id="aiChatWindow">
    <div class="ai-chat-header">
      <span>دستیار هوشمند</span>
      <span style="cursor:pointer; font-size:1.2rem;" onclick="toggleChat()">✖</span>
    </div>
    <div class="ai-chat-messages" id="chatMessages">
      <div class="ai-msg bot">سلام! من دستیار هوشمند درس مطالعات اجتماعی هستم. هر سوالی داری بپرس! 😊</div>
    </div>
    <div class="ai-chat-input-area">
      <input type="text" id="chatInput" placeholder="سوال خود را بنویسید..." onkeypress="handleChatEnter(event)">
      <button onclick="sendChatMessage()">➤</button>
    </div>
  </div>
  <button class="ai-summarize-btn" id="summarizeBtn" onclick="summarizeText()">✨ خلاصه کن</button>
`;

document.addEventListener('DOMContentLoaded', () => {
    document.body.insertAdjacentHTML('beforeend', botHTML);
    // اگر در صفحه درسنامه هستیم، دکمه خلاصه ساز را نشان بده
    if (window.location.pathname.includes('-note.html')) {
        document.getElementById('summarizeBtn').style.display = 'flex';
    }
});

function toggleChat() {
  const chatWindow = document.getElementById('aiChatWindow');
  chatWindow.style.display = chatWindow.style.display === 'flex' ? 'none' : 'flex';
}

function handleChatEnter(event) {
  if (event.key === 'Enter') sendChatMessage();
}

async function sendChatMessage() {
  const input = document.getElementById('chatInput');
  const messages = document.getElementById('chatMessages');
  const text = input.value.trim();
  if (!text) return;

  messages.innerHTML += `<div class="ai-msg user">${text}</div>`;
  input.value = '';
  messages.scrollTop = messages.scrollHeight;

  const loadingId = 'loading-' + Date.now();
  messages.innerHTML += `<div class="ai-msg bot" id="${loadingId}">در حال فکر کردن... ⏳</div>`;
  messages.scrollTop = messages.scrollHeight;

  const GROQ_API_KEY = "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";

  try {
    const payload = {
      model: "openai/gpt-oss-120b",
      messages: [
        { role: "system", content: "شما یک معلم دلسوز و متخصص مطالعات اجتماعی هستید. به فارسی، کوتاه و ساده پاسخ دهید." },
        { role: "user", content: text }
      ]
    };

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Authorization": `Bearer ${GROQ_API_KEY}` },
      body: new Blob([JSON.stringify(payload)], { type: 'application/json' })
    });

    const data = await response.json();
    document.getElementById(loadingId).remove();
    
    if (data.error) throw new Error(data.error.message);
    
    messages.innerHTML += `<div class="ai-msg bot">${data.choices[0].message.content}</div>`;
    messages.scrollTop = messages.scrollHeight;
  } catch (error) {
    document.getElementById(loadingId).remove();
    messages.innerHTML += `<div class="ai-msg bot" style="color:red;">❌ خطا در ارتباط. لطفاً از فیلترشکن استفاده کنید.</div>`;
  }
}

// تابع خلاصه کردن متن درسنامه
async function summarizeText() {
  // پیدا کردن محتوای اصلی درسنامه (تگ body یا کانتینر اصلی)
  let lessonText = document.body.innerText;
  
  // جلوگیری از ارسال کل کدها (فقط متن خالص)
  lessonText = lessonText.substring(0, 3000); // محدودیت کاراکتر برای جلوگیری از خطا

  const chatWindow = document.getElementById('aiChatWindow');
  chatWindow.style.display = 'flex';
  const messages = document.getElementById('chatMessages');
  
  messages.innerHTML += `<div class="ai-msg user">✨ لطفاً این درس را برای من خلاصه کن.</div>`;
  messages.scrollTop = messages.scrollHeight;

  const loadingId = 'loading-' + Date.now();
  messages.innerHTML += `<div class="ai-msg bot" id="${loadingId}">در حال مطالعه و خلاصه کردن... ⏳</div>`;
  messages.scrollTop = messages.scrollHeight;

  const GROQ_API_KEY = "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";

  try {
    const payload = {
      model: "openai/gpt-oss-120b",
      messages: [
        { role: "system", content: "شما یک معلم مطالعات اجتماعی هستید. متن زیر را به صورت بسیار ساده، کوتاه و به شکل چند نکته کلیدی (Bullet point) برای دانش‌آموز خلاصه کن." },
        { role: "user", content: lessonText }
      ]
    };

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Authorization": `Bearer ${GROQ_API_KEY}` },
      body: new Blob([JSON.stringify(payload)], { type: 'application/json' })
    });

    const data = await response.json();
    document.getElementById(loadingId).remove();
    
    if (data.error) throw new Error(data.error.message);
    
    messages.innerHTML += `<div class="ai-msg bot">${data.choices[0].message.content}</div>`;
    messages.scrollTop = messages.scrollHeight;
  } catch (error) {
    document.getElementById(loadingId).remove();
    messages.innerHTML += `<div class="ai-msg bot" style="color:red;">❌ خطا در خلاصه کردن. لطفاً فیلترشکن را روشن کنید.</div>`;
  }
}
