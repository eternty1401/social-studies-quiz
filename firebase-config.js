import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAo0zfeqp_BfJEqAHLir6xiYD0N9NqQcvE",
  authDomain: "social-studies-app-6b600.firebaseapp.com",
  projectId: "social-studies-app-6b600",
  storageBucket: "social-studies-app-6b600.firebasestorage.app",
  messagingSenderId: "887286568529",
  appId: "1:887286568529:web:151feabe0c5c3c42a00a70",
  measurementId: "G-2ZZLN7ZB9N"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

window.saveGradeToFirebase = async function(studentName, examName, score, correctCount) {
  try {
    await addDoc(collection(db, "grades"), {
      name: studentName,
      exam: examName,
      score: score,
      correct: correctCount,
      date: new Date().toLocaleDateString('fa-IR'),
      timestamp: Date.now()
    });
    console.log("نمره ذخیره شد.");
  } catch (e) {
    console.error("خطای دیتابیس: ", e);
  }
};