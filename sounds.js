// ==========================================
// سیستم افکت صوتی با Web Audio API
// ==========================================

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// تابع تولید صدا
function playTone(freq, type, duration, volume = 0.1) {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    oscillator.type = type;
    oscillator.frequency.value = freq;
    
    gainNode.gain.setValueAtTime(volume, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + duration);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + duration);
}

// ۱. صدای کلیک (برای انتخاب گزینه‌ها)
function playClick() {
    playTone(800, 'sine', 0.1, 0.05);
}

// ۲. صدای پاسخ درست (شاد)
function playCorrect() {
    playTone(523.25, 'sine', 0.15, 0.1); // Do
    setTimeout(() => playTone(659.25, 'sine', 0.3, 0.1), 150); // Mi
}

// ۳. صدای پاسخ غلط (غمگین)
function playWrong() {
    playTone(150, 'sawtooth', 0.3, 0.1);
}

// ۴. صدای پایان آزمون (جشن)
function playFinish() {
    playTone(523.25, 'triangle', 0.15, 0.1); 
    setTimeout(() => playTone(659.25, 'triangle', 0.15, 0.1), 150); 
    setTimeout(() => playTone(783.99, 'triangle', 0.15, 0.1), 300); 
    setTimeout(() => playTone(1046.50, 'triangle', 0.5, 0.1), 450); 
}
