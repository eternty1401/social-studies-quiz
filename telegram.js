function submitScoreToTelegram(score, correctCount) {
    let studentName = "ناشناس";
    const nameInput = document.getElementById('student-name') || document.getElementById('studentName');
    if (nameInput && nameInput.value.trim() !== "") {
        studentName = nameInput.value.trim();
    }
    
    const examName = document.title; 
    const today = new Date().toLocaleDateString('fa-IR');

    // 👇 آدرس موقت هاست پارس‌پک
    const apiUrl = "http://45.139.11.210/~motada/save_grade.php"; 

    fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            student_name: studentName,
            exam_name: examName,
            score: score,
            correct_count: correctCount,
            exam_date: today
        })
    })
    .then(response => response.json())
    .then(data => {
        if(data.status === 'success') {
            console.log("✅ نمره در دیتابیس هاست ذخیره شد.");
            alert("✅ نمره شما در دیتابیس ثبت شد.");
        } else {
            console.error("❌ خطای دیتابیس:", data.message);
        }
    })
    .catch(error => {
        console.error("❌ خطای شبکه:", error);
        alert("❌ خطا در ارتباط با سرور هاست.");
    });
}
