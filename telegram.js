// پارامتر سوم (examType) مشخص می‌کنه آزمون تستیه یا تشریحی
function submitScoreToTelegram(score, correctCount, examType = "testi") {
    let studentName = localStorage.getItem('student_name');
    let schoolName = localStorage.getItem('school_name');
    
    if (!studentName || !schoolName) {
        alert("⚠️ لطفاً ابتدا از منوی سایت وارد حساب کاربری خود شوید.");
        return;
    }

    const examName = document.title; 
    
    // 👇 تغییر در این بخش: گرفتن تاریخ و ساعت دقیق
    const now = new Date();
    const datePart = now.toLocaleDateString('fa-IR');
    const timePart = now.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' });
    const today = datePart + ' - ساعت ' + timePart;
    // 👆 پایان تغییر

    const apiUrl = "https://api.motadars.ir/save_grade.php"; 

    fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            student_name: studentName,
            school_name: schoolName,
            exam_name: examName,
            exam_type: examType, // 👈 ارسال نوع آزمون (testi یا tashrihi)
            score: score,
            correct_count: correctCount,
            exam_date: today // 👈 اینجا حالا شامل تاریخ و ساعت هست
        })
    })
    .then(response => response.json())
    .then(data => {
        if(data.status === 'success') {
            alert("✅ نمره شما با موفقیت ثبت شد.");
        } else {
            alert("❌ خطای دیتابیس: " + data.message);
        }
    })
    .catch(error => {
        alert("❌ خطا در ارتباط با سرور.");
    });
}
