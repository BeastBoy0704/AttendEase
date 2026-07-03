function calculateAttendance() {
console.log(document.getElementById("progressCircle"));
console.log(document.getElementById("progressText"));
console.log(document.getElementById("result"));
    let attended = Number(document.getElementById("attended").value);

    let total = Number(document.getElementById("total").value);

    let target = Number(document.getElementById("target").value);

    let result = document.getElementById("result");

    let bunkResult = document.getElementById("bunkResult");

    let needResult = document.getElementById("needResult");


    if (attended <= 0 || total <= 0) {

    result.innerHTML = `
<div class="error-box">
❌ Please enter valid numbers.
</div>`;

    bunkResult.innerHTML = "";

    needResult.innerHTML = "";


    return;
}

    if (attended > total) {

    result.innerHTML = `
<div class="error-box">
❌ Attended classes cannot be greater than total classes.
</div>`;

    bunkResult.innerHTML = "";

    needResult.innerHTML = "";

    const circle = document.getElementById("progressCircle");
const text = document.getElementById("progressText");

const radius = 70;
const circumference = 2 * Math.PI * radius;

circle.style.strokeDasharray = circumference;
circle.style.strokeDashoffset = circumference;
text.innerHTML = "0%";

    return;
}

    let percentage = (attended / total) * 100;
    const circle = document.getElementById("progressCircle");
const text = document.getElementById("progressText");

const radius = 70;
const circumference = 2 * Math.PI * radius;

circle.style.strokeDasharray = circumference;
circle.style.strokeDashoffset =
    circumference - (percentage / 100) * circumference;

text.innerHTML = percentage.toFixed(1) + "%";

if (percentage < 75) {

    circle.style.stroke = "#ef4444";

}
else if (percentage < 90) {

    circle.style.stroke = "#facc15";

}
else {

    circle.style.stroke = "#22c55e";

}
    let message = "";

    if (percentage >= 90) {
        message = "🟢 Excellent Attendance";
    }
    else if (percentage >= 75) {
        message = "🟡 Good Attendance";
    }
    else {
        message = "🔴 Low Attendance";
    }

    result.innerHTML = `
<div class="result-title">📊 Attendance</div>

<div class="result-percentage">
${percentage.toFixed(2)}%
</div>

<div class="result-message">
${message}
</div>
`;

    let bunk = 0;

    while ((attended / (total + bunk)) * 100 >= target) {
        bunk++;
    }

    bunk--;

    if (bunk < 0) {
        bunk = 0;
    }

    bunkResult.innerHTML = `
<div class="result-title">😎 Can Bunk</div>

<div class="result-percentage">
${bunk}
</div>

<div class="result-message">
More Classes
</div>
`;

let need = 0;

// Calculate how many more classes are needed
while (((attended + need) / (total + need)) * 100 < target) {
    need++;
}

if (need === 0) {

    needResult.innerHTML = `
    <div class="result-title">📚 Need to Attend</div>

    <div class="result-percentage">
    0
    </div>

    <div class="result-message">
    🎉 Target Already Achieved
    </div>
    `;

}
else{

    needResult.innerHTML = `
    <div class="result-title">📚 Need to Attend</div>

    <div class="result-percentage">
    ${need}
    </div>

    <div class="result-message">
    More Classes
    </div>
    `;

}   
// ==========================
// Save Attendance History
// ==========================

const historyList = document.getElementById("historyList");

let history = JSON.parse(localStorage.getItem("attendanceHistory")) || [];
console.log("Saving history...");   
history.unshift({
    date: new Date().toLocaleString(),
    percentage: percentage.toFixed(2),
    bunk: bunk,
    need: need
});

// Keep only latest 5 records
history = history.slice(0, 5);

localStorage.setItem("attendanceHistory", JSON.stringify(history));
console.log(localStorage.getItem("attendanceHistory"));

loadHistory();
}
function resetForm(){

    document.getElementById("attended").value = "";

    document.getElementById("total").value = "";

    document.getElementById("target").value = "75";

    document.getElementById("result").innerHTML = "Your Result Appears Here";

    document.getElementById("bunkResult").innerHTML = "";

    document.getElementById("needResult").innerHTML = "";

    const circle = document.getElementById("progressCircle");
const text = document.getElementById("progressText");

const radius = 70;
const circumference = 2 * Math.PI * radius;

circle.style.strokeDasharray = circumference;
circle.style.strokeDashoffset = circumference;
text.innerHTML = "0%";

}
let deferredPrompt;

const installBtn = document.getElementById("installBtn");

window.addEventListener("beforeinstallprompt", (e) => {

    e.preventDefault();

    deferredPrompt = e;

    installBtn.style.display = "block";

});

installBtn.addEventListener("click", async () => {

    installBtn.style.display = "none";

    deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;

    console.log(outcome);

    deferredPrompt = null;

});
window.addEventListener("appinstalled", () => {

    installBtn.style.display = "none";

    console.log("🎉 AttendEase Installed Successfully");

});
// ==========================
// Theme Toggle
// ==========================

// ==========================
// Theme Toggle + Save Theme
// ==========================

const themeBtn = document.getElementById("themeBtn");

// Load saved theme
if(localStorage.getItem("theme") === "dark"){

    document.body.classList.add("dark-mode");

    themeBtn.textContent = "☀️";

}

// Toggle Theme
themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    if(document.body.classList.contains("dark-mode")){

        themeBtn.textContent = "☀️";

        localStorage.setItem("theme","dark");

    }else{

        themeBtn.textContent = "🌙";

        localStorage.setItem("theme","light");

    }

});
function loadHistory(){

    const historyList = document.getElementById("historyList");

    const history =
        JSON.parse(localStorage.getItem("attendanceHistory")) || [];

    if(history.length === 0){

        historyList.innerHTML = "No History Yet";

        return;

    }
   

    historyList.innerHTML = "";

    history.forEach(item => {

        historyList.innerHTML += `
        <div class="history-item">

            <strong>${item.date}</strong><br>

            📊 Attendance : ${item.percentage}%<br>

            😎 Can Bunk : ${item.bunk}<br>

            📚 Need : ${item.need}

        </div>
        `;

    });

}

// Load history when page opens
loadHistory();

// Clear History Button
const clearBtn = document.getElementById("clearHistoryBtn");

if (clearBtn) {

    clearBtn.addEventListener("click", () => {

        if (confirm("Clear all attendance history?")) {

            localStorage.removeItem("attendanceHistory");

            loadHistory();

        }

    });

}