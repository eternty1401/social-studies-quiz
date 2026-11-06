function submitScoreToTelegram(score, correctCount) {
    // پیدا کردن نام دانش‌آموز از فیلد ورودی
    let studentName = "ناشناس";
    const nameInput = document.getElementById('student-name') || document.getElementById('studentName');
    if (nameInput && nameInput.value.trim() !== "") {
        studentName = nameInput.value.trim();
    }
    
    // گرفتن نام آزمون از عنوان صفحه
    const examName = document.title; 

    // 👇 توکن و آیدی چت تو
    const botToken = "9142270513:AAEvR5jPojPtQ4WOJ9aIDFzJFebUeTYJXlo";
    const chatId = "7129110141";

    // متن پیامی که قراره به تلگرامت بیاد
    const message = `📝 نتیجه یک آزمون جدید!\n\n👤 نام دانش‌آموز: ${studentName}\n📚 آزمون: ${examName}\n🎯 نمره: ${score}٪\n✅ تعداد درست: ${correctCount}`;

    // 👇 آدرس اسکریپت گوگل خودت (واسط برای دور زدن فیلترینگ)
    const proxyUrl = "https://script.google.com/macros/s/AKfycby3JTbfX1T03L1yYIn9GZ4cz5MpD-AYuVk14YhnHZKiMX2zpWWomHtKNCt-Mro9SVBuuw/exec";

    // ارسال پیام به واسط گوگل
    fetch(proxyUrl, {
        method: "POST",
        mode: "no-cors", // برای جلوگیری از خطای CORS
        headers: { "Content-Type": "text/plain" }, 
        body: JSON.stringify({ 
            token: botToken, 
            chatId: chatId, 
            message: message 
        })
    })
    .then(() => { 
        console.log("✅ درخواست به سرور گوگل ارسال شد."); 
    })
    .catch(error => console.error("❌ خطای ارسال:", error));
}
