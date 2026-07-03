function calculateAttendance() {

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


let history = JSON.parse(localStorage.getItem("attendanceHistory")) || []; 
history.unshift({
    date: new Date().toLocaleString(),
    percentage: percentage.toFixed(2),
    bunk: bunk,
    need: need
});

// Keep only latest 5 records
history = history.slice(0, 5);

localStorage.setItem("attendanceHistory", JSON.stringify(history));

loadHistory();
// ==========================
// Goal Tracker (ADD HERE)
// ==========================

document.getElementById("goalTarget").textContent = target + "%";

document.getElementById("goalCurrent").textContent =
    percentage.toFixed(2) + "%";

const goalProgress = document.getElementById("goalProgress");
const goalMessage = document.getElementById("goalMessage");

let progressPercent = (percentage / target) * 100;

if (progressPercent > 100) progressPercent = 100;

goalProgress.style.width = progressPercent + "%";

let diff = (target - percentage).toFixed(2);

if (percentage >= target) {

    goalMessage.textContent = "🎉 Goal Achieved!";

    goalProgress.style.background = "#22c55e";

} else {

    goalMessage.textContent = diff + "% Away From Goal";

    if (diff <= 5) {
        goalProgress.style.background = "#facc15";
    } else {
        goalProgress.style.background = "#ef4444";
    }
}
// ==========================
// Analytics Dashboard
// ==========================

document.getElementById("totalClasses").textContent = total;

document.getElementById("attendedClasses").textContent = attended;

document.getElementById("missedClasses").textContent = total - attended;

document.getElementById("attendancePercent").textContent =
    percentage.toFixed(2) + "%";
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
document.getElementById("goalTarget").textContent = "0%";
document.getElementById("goalCurrent").textContent = "0%";
document.getElementById("goalProgress").style.width = "0%";
document.getElementById("goalMessage").textContent = "Set your target";

document.getElementById("totalClasses").textContent = "0";

document.getElementById("attendedClasses").textContent = "0";

document.getElementById("missedClasses").textContent = "0";

document.getElementById("attendancePercent").textContent = "0%";

}
// ==========================
// Install App
// ==========================

const installBtn = document.getElementById("installBtn");

if (installBtn) {

    let deferredPrompt;

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
}

// ==========================
// Theme Toggle
// ==========================

const themeBtn = document.getElementById("themeBtn");

if (themeBtn) {

    // Load Saved Theme
    if (localStorage.getItem("theme") === "dark") {

        document.body.classList.add("dark-mode");
        themeBtn.textContent = "☀️";

    }

    // Toggle Theme
    themeBtn.addEventListener("click", () => {

        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {

            themeBtn.textContent = "☀️";
            localStorage.setItem("theme", "dark");

        } else {

            themeBtn.textContent = "🌙";
            localStorage.setItem("theme", "light");

        }

    });

}
function loadHistory(){

    const historyList = document.getElementById("historyList");

    if(!historyList){
        return;
    }

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
// ==========================
// Premium Loader
// ==========================

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    const app = document.querySelector(".container");

    // Hide app initially
    app.style.opacity = "0";

    setTimeout(() => {

        loader.classList.add("hide");

        app.style.transition = "opacity .8s ease";

        app.style.opacity = "1";

    }, 2000);

});
function $(id) {
    return document.getElementById(id);
}

function calculateBunk(){

    let attended = Number(document.getElementById("attended").value);

let total = Number(document.getElementById("total").value);

let target = Number(document.getElementById("target").value);

let result = document.getElementById("result");

let bunkResult = document.getElementById("bunkResult");

if(attended <= 0 || total <= 0){

    result.innerHTML = "❌ Enter valid numbers.";

    bunkResult.innerHTML = "";

    return;

}

if(attended > total){

    result.innerHTML = "❌ Attended cannot be greater than Total.";

    bunkResult.innerHTML = "";

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

result.innerHTML = `
<h3>📊 Current Attendance</h3>
<h2>${percentage.toFixed(2)}%</h2>
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
<h3>😎 You Can Bunk</h3>
<h2>${bunk} Classes</h2>
`;

}