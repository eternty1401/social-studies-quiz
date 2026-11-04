// ==========================================
// اسکریپت دستیار هوشمند، خلاصه‌ساز و خواندن صوتی
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
  .ai-tools-container { display: flex; justify-content: center; gap: 10px; flex-wrap: wrap; margin: 15px auto; }
  .ai-summarize-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; background: #f39c12; color: white; border: none; padding: 10px 20px; border-radius: 30px; font-family: inherit; font-weight: bold; font-size: 0.9rem; cursor: pointer; box-shadow: 0 4px 10px rgba(243, 156, 18, 0.3); transition: 0.3s; }
  .ai-summarize-btn:hover { background: #d68910; transform: translateY(-2px); }
  .ai-tts-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; background: #2ecc71; color: white; border: none; padding: 10px 20px; border-radius: 30px; font-family: inherit; font-weight: bold; font-size: 0.9rem; cursor: pointer; box-shadow: 0 4px 10px rgba(46, 204, 113, 0.3); transition: 0.3s; }
  .ai-tts-btn:hover { background: #27ae60; transform: translateY(-2px); }
  .ai-tts-btn.speaking { background: #e74c3c; box-shadow: 0 4px 10px rgba(231, 76, 60, 0.3); }
  .ai-tts-btn.speaking:hover { background: #c0392b; }
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
    <div class="ai-chat-messages" id="chatMessages">
      <div class="ai-msg bot">سلام! من دستیار هوشمند درس مطالعات اجتماعی هستم. هر سوالی داری بپرس! 😊</div>
    </div>
    <div class="ai-chat-input-area">
      <input type="text" id="chatInput" placeholder="سوال خود را بنویسید..." onkeypress="handleChatEnter(event)">
      <button onclick="sendChatMessage()">➤</button>
    </div>
  </div>
`;

document.addEventListener('DOMContentLoaded', () => {
    document.body.insertAdjacentHTML('beforeend', botHTML);
    
    if (window.location.pathname.includes('-note.html')) {
        const targetBox = document.querySelector('.highlight-box, .goal-box, .intro-box, .info-box') || document.querySelector('.container > div:nth-child(3)');
        const toolsContainer = document.createElement('div');
        toolsContainer.className = 'ai-tools-container';

        const summarizeBtn = document.createElement('button');
        summarizeBtn.className = 'ai-summarize-btn';
        summarizeBtn.innerHTML = '✨ خلاصه کن';
        summarizeBtn.onclick = summarizeText;
        toolsContainer.appendChild(summarizeBtn);

        const ttsBtn = document.createElement('button');
        ttsBtn.className = 'ai-tts-btn';
        ttsBtn.id = 'ai-tts-btn';
        ttsBtn.innerHTML = '🔊 خواندن درس';
        ttsBtn.onclick = toggleTTS;
        toolsContainer.appendChild(ttsBtn);

        if (targetBox) {
            targetBox.parentNode.insertBefore(toolsContainer, targetBox.nextSibling);
        } else {
            const header = document.querySelector('h1') || document.querySelector('.header');
            if(header) header.parentNode.insertBefore(toolsContainer, header.nextSibling);
        }
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

// ==========================================
// توابع خواندن درس (اصلاح‌شده برای کروم)
// ==========================================
let isSpeaking = false;

function toggleTTS() {
    const btn = document.getElementById('ai-tts-btn');
    const synth = window.speechSynthesis;

    if (isSpeaking) {
        synth.cancel();
        isSpeaking = false;
        btn.innerHTML = '🔊 خواندن درس';
        btn.classList.remove('speaking');
        return;
    }

    let contentBox = document.querySelector('.container') || document.body;
    let clone = contentBox.cloneNode(true);
    const elementsToRemove = clone.querySelectorAll('.ai-tools-container, .ai-chat-window, .ai-chat-btn, button, script, style, .back-btn');
    elementsToRemove.forEach(el => el.remove());
    
    let textToRead = clone.innerText.trim();
    if (!textToRead) return;

    btn.innerHTML = '⏳ در حال آماده‌سازی...';

    // رفع باگ کروم: گاهی لیست صداها کمی دیر لود می‌شود
    let voices = synth.getVoices();
    if (voices.length === 0) {
        synth.onvoiceschanged = () => {
            voices = synth.getVoices();
            playTTS(textToRead, btn, voices);
        };
    } else {
        playTTS(textToRead, btn, voices);
    }
}

function playTTS(text, btn, voices) {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'fa-IR'; 
    utterance.rate = 0.9;

    // پیدا کردن صدای فارسی
    const faVoice = voices.find(v => v.lang.includes('fa'));
    if (faVoice) utterance.voice = faVoice;

    utterance.onend = () => {
        isSpeaking = false;
        btn.innerHTML = '🔊 خواندن درس';
        btn.classList.remove('speaking');
    };

    utterance.onerror = (e) => {
        isSpeaking = false;
        btn.innerHTML = '🔊 خواندن درس';
        btn.classList.remove('speaking');
        alert("⚠️ خواندن متن ممکن نشد. لطفاً لینک سایت را کپی کرده و مستقیماً در اپلیکیشن کروم (Chrome) باز کنید. مرورگرهای داخل تلگرام یا اینستاگرام این قابلیت را مسدود می‌کنند.");
    };

    synth.speak(utterance);
    isSpeaking = true;
    btn.innerHTML = '⏸️ توقف خواندن';
    btn.classList.add('speaking');
}
