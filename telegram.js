function submitScoreToTelegram(score, correctCount) {
    // گرفتن نام دانش‌آموز و مدرسه از فرم‌های موجود در صفحه
    const nameInput = document.getElementById('student-name') || document.getElementById('studentName');
    const schoolSelect = document.getElementById('school-select');
    
    let studentName = "ناشناس";
    if (nameInput && nameInput.value.trim() !== "") {
        studentName = nameInput.value.trim();
    }
    
    let schoolName = "متفرقه";
    if (schoolSelect && schoolSelect.value) {
        schoolName = schoolSelect.value;
    }

    const examName = document.title; 
    const today = new Date().toLocaleDateString('fa-IR');

    const apiUrl = "https://api.motadars.ir/save_grade.php"; 

    fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            student_name: studentName,
            school_name: schoolName, // 👈 ارسال نام مدرسه
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
            alert("✅ نمره شما با موفقیت ثبت شد.");
        } else {
            console.error("❌ خطای دیتابیس:", data.message);
            alert("❌ خطای دیتابیس: " + data.message);
        }
    })
    .catch(error => {
        console.error("❌ خطای شبکه:", error);
        alert("❌ خطا در ارتباط با سرور. لطفا اینترنت خود را بررسی کنید.");
    });
}
