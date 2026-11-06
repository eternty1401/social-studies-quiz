function submitScoreToTelegram(score, correctCount) {
    // پیدا کردن نام دانش‌آموز از فیلد ورودی
    let studentName = "ناشناس";
    const nameInput = document.getElementById('student-name') || document.getElementById('studentName');
    if (nameInput && nameInput.value.trim() !== "") {
        studentName = nameInput.value.trim();
    }
    
    // گرفتن نام آزمون از عنوان صفحه
    const examName = document.title; 

    // 👇👇 این دو خط رو با اطلاعات خودت پر کن 👇👇
    const botToken = "9142270513:AAEvR5jPojPtQ4WOJ9aIDFzJFebUeTYJXlo";
    const chatId = "7129110141";

    // متن پیامی که قراره به تلگرامت بیاد
    const message = `📝 نتیجه یک آزمون جدید!\n\n👤 نام دانش‌آموز: ${studentName}\n📚 آزمون: ${examName}\n🎯 نمره: ${score}٪\n✅ تعداد درست: ${correctCount}`;

    // اتصال به تلگرام
    const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;

    // ارسال پیام
    fetch(url)
    .then(response => response.json())
    .then(data => { 
        if(data.ok) console.log("نمره به تلگرام ارسال شد!"); 
    })
    .catch(error => console.error("خطای ارسال:", error));
}
