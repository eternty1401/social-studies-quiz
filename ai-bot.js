// ==========================================
// اسکریپت دستیار هوشمند چند شخصیتی و خلاصه‌ساز
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
    height: 480px; background: #fff; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    display: none; flex-direction: column; z-index: 10000; overflow: hidden; border: 1px solid #eee;
    font-family: 'Vazirmatn', Tahoma, sans-serif;
  }
  .ai-chat-header { 
    background: #00acc1; color: white; padding: 15px; font-weight: 900; 
    display: flex; justify-content: space-between; align-items: center; font-size: 1rem;
  }
  
  /* بخش انتخاب لحن هوش مصنوعی */
  .ai-tone-selector-container {
    padding: 10px;
    background: #f0f4f5;
    border-bottom: 1px solid #ddd;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .ai-tone-selector-container label {
    font-size: 0.8rem;
    color: #333;
    font-weight: bold;
    white-space: nowrap;
  }
  .ai-tone-select {
    flex: 1;
    padding: 6px 10px;
    border-radius: 8px;
    border: 1px solid #ccc;
    font-family: inherit;
    font-size: 0.85rem;
    color: #333;
    outline: none;
    background: #fff;
  }

  .ai-chat-messages { flex: 1; padding: 15px; overflow-y: auto; background: #f9f9f9; display: flex; flex-direction: column; gap: 10px; font-size: 0.9rem; }
  .ai-msg { padding: 10px 15px; border-radius: 10px; max-width: 85%; line-height: 1.6; white-space: pre-wrap; }
  .ai-msg.user { background: #e0f7fa; color: #006064; align-self: flex-start; }
  .ai-msg.bot { background: #fff; color: #333; align-self: flex-end; border: 1px solid #eee; }
  
  .ai-chat-input-area { display: flex; padding: 10px; background: #fff; border-top: 1px solid #eee; }
  .ai-chat-input-area input { flex: 1; padding: 10px; border: 1px solid #ddd; border-radius: 20px; outline: none; font-family: inherit; font-size: 0.9rem; }
  .ai-chat-input-area button { background: #00acc1; color: white; border: none; border-radius: 50%; width: 40px; height: 40px; margin-right: 10px; cursor: pointer; font-size: 1.2rem; display: flex; justify-content: center; align-items: center; }

  /* دکمه خلاصه ساز */
  .ai-summarize-btn {
    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    background: #f39c12; color: white; border: none; padding: 10px 20px;
    border-radius: 30px; font-family: inherit; font-weight: bold; font-size: 0.9rem;
    cursor: pointer; box-shadow: 0 4px 10px rgba(243, 156, 18, 0.3);
    transition: 0.3s; margin: 15px auto;
  }
  .ai-summarize-btn:hover { background: #d68910; transform: translateY(-2px); }
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = aiBotStyles;
document.head.appendChild(styleSheet);

const botHTML = `
  <button class="ai-chat-btn" onclick="toggleChat()">🥷</button>
  <div class="ai-chat-window" id="aiChatWindow">
    <div class="ai-chat-header">
      <span>دستیار هوشمند</span>
      <span style="cursor:pointer; font-size:1.2rem;" onclick="toggleChat()">✖</span>
    </div>
    
    <!-- بخش انتخاب لحن -->
    <div class="ai-tone-selector-container">
      <label>لحن ربات:</label>
      <select id="ai-tone-select" class="ai-tone-select" onchange="changeBotTone()">
        <option value="normal">معلم جدی (عادی)</option>
        <option value="child">مثل یک بچه ۷ ساله</option>
        <option value="story">داستان‌سرا و هیجان‌انگیز</option>
        <option value="football">با مثال‌های فوتبالی/ورزشی</option>
      </select>
    </div>

    <div class="ai-chat-messages" id="chatMessages">
      <div class="ai-msg bot">سلام! من دستیار هوشمند درس مطالعات اجتماعی هستم. می‌تونی از منوی بالا لحن من رو عوض کنی! 😊</div>
    </div>
    <div class="ai-chat-input-area">
      <input type="text" id="chatInput" placeholder="سوال خود را بنویسید..." onkeypress="handleChatEnter(event)">
      <button onclick="sendChatMessage()">➤</button>
    </div>
  </div>
`;

document.addEventListener('DOMContentLoaded', () => {
    document.body.insertAdjacentHTML('beforeend', botHTML);
    
    // اگر در صفحه درسنامه هستیم، دکمه خلاصه ساز را زیر کادر سبز اضافه کن
    if (window.location.pathname.includes('-note.html')) {
        const targetBox = document.querySelector('.highlight-box, .goal-box, .intro-box, .info-box') || document.querySelector('.container > div:nth-child(3)');
        
        const summarizeBtn = document.createElement('button');
        summarizeBtn.className = 'ai-summarize-btn';
        summarizeBtn.innerHTML = '✨ خلاصه کن';
        summarizeBtn.onclick = summarizeText;

        if (targetBox) {
            targetBox.parentNode.insertBefore(summarizeBtn, targetBox.nextSibling);
        } else {
            const header = document.querySelector('h1') || document.querySelector('.header');
            if(header) header.parentNode.insertBefore(summarizeBtn, header.nextSibling);
        }
    }
});

function toggleChat() {
  const chatWindow = document.getElementById('aiChatWindow');
  chatWindow.style.display = chatWindow.style.display === 'flex' ? 'none' : 'flex';
}

function changeBotTone() {
    const tone = document.getElementById('ai-tone-select').value;
    const messages = document.getElementById('chatMessages');
    let toneMsg = "";
    
    if (tone === 'child') toneMsg = "باشه! از این به بعد مثل یک بچه ۷ ساله خیلی ساده و بامزه توضیح می‌دم. 🧒";
    else if (tone === 'story') toneMsg = "عالیه! از این به بعد درس رو برات مثل یک داستان هیجان‌انگیز تعریف می‌کنم. 📖✨";
    else if (tone === 'football') toneMsg = "چه انتخاب باحالی! از این به بعد با مثال‌های فوتبالی و ورزشی توضیح می‌دم. ⚽🏆";
    else toneMsg = "بسیار خب! به حالت معلم جدی و رسمی برگشتم. 👨‍🏫";

    messages.innerHTML += `<div class="ai-msg bot" style="background:#e8f8f5; color:#27ae60;">${toneMsg}</div>`;
    messages.scrollTop = messages.scrollHeight;
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

  // خواندن لحن انتخاب شده
  const selectedTone = document.getElementById('ai-tone-select').value;
  let systemPrompt = "";

  // تنظیم دستور سیستم بر اساس لحن
  if (selectedTone === 'child') {
      systemPrompt = "شما یک معلم هستید که باید مفاهیم مطالعات اجتماعی را برای یک کودک ۷ ساله توضیح دهید. از کلمات بسیار ساده، جذاب و مثال‌های کودکانه استفاده کنید. پاسخ‌ها باید کوتاه باشند.";
  } else if (selectedTone === 'story') {
      systemPrompt = "شما یک داستان‌سرای جذاب هستید. باید مفاهیم مطالعات اجتماعی را در قالب یک داستان هیجان‌انگیز، با شخصیت‌پردازی و جذابیت بالا تعریف کنید.";
  } else if (selectedTone === 'football') {
      systemPrompt = "شما یک معلم هستید که عاشق فوتبال و ورزش است. باید مفاهیم مطالعات اجتماعی را با استفاده از مثال‌های فوتبالی، ورزشی یا بازی‌های کامپیوتری برای دانش‌آموز توضیح دهید.";
  } else {
      systemPrompt = "شما یک معلم دلسوز و متخصص مطالعات اجتماعی هستید. به فارسی، کوتاه و ساده پاسخ دهید.";
  }

  try {
    const payload = {
      // 👈 فیلد model حذف شد تا خود ورکر تصمیم بگیرد
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: text }
      ]
    };

    // 👈 آدرس جدید دامنه اختصاصی (که به زودی در کلادفلر می‌سازیم)
    const response = await fetch("https://ai.motadars.ir", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    document.getElementById(loadingId).remove();
    
    if (data.error) throw new Error(data.error.message);
    
    messages.innerHTML += `<div class="ai-msg bot">${data.choices[0].message.content}</div>`;
    messages.scrollTop = messages.scrollHeight;
  } catch (error) {
    document.getElementById(loadingId).remove();
    messages.innerHTML += `<div class="ai-msg bot" style="color:red;">❌ خطا: ${error.message}</div>`;
  }
}

// تابع خلاصه کردن متن درسنامه
async function summarizeText() {
  let lessonText = document.body.innerText;
  lessonText = lessonText.substring(0, 3000); 

  const chatWindow = document.getElementById('aiChatWindow');
  chatWindow.style.display = 'flex';
  const messages = document.getElementById('chatMessages');
  
  messages.innerHTML += `<div class="ai-msg user">✨ لطفاً این درس را برای من خلاصه کن.</div>`;
  messages.scrollTop = messages.scrollHeight;

  const loadingId = 'loading-' + Date.now();
  messages.innerHTML += `<div class="ai-msg bot" id="${loadingId}">در حال مطالعه و خلاصه کردن... ⏳</div>`;
  messages.scrollTop = messages.scrollHeight;

  try {
    const payload = {
      messages: [
        { role: "system", content: "شما یک معلم مطالعات اجتماعی هستید. متن زیر را به صورت بسیار ساده، کوتاه و به شکل چند نکته کلیدی (Bullet point) برای دانش‌آموز خلاصه کن." },
        { role: "user", content: lessonText }
      ]
    };

    // 👈 آدرس جدید دامنه اختصاصی
    const response = await fetch("https://ai.motadars.ir", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    document.getElementById(loadingId).remove();
    
    if (data.error) throw new Error(data.error.message);
    
    messages.innerHTML += `<div class="ai-msg bot">${data.choices[0].message.content}</div>`;
    messages.scrollTop = messages.scrollHeight;
  } catch (error) {
    document.getElementById(loadingId).remove();
    messages.innerHTML += `<div class="ai-msg bot" style="color:red;">❌ خطا: ${error.message}</div>`;
  }
}
