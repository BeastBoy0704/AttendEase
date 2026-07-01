function calculateAttendance() {

    let attended = Number(document.getElementById("attended").value);

    let total = Number(document.getElementById("total").value);

    let target = Number(document.getElementById("target").value);

    let result = document.getElementById("result");

    let bunkResult = document.getElementById("bunkResult");

    let needResult = document.getElementById("needResult");

    let progressBar = document.getElementById("progressBar");

    if (attended <= 0 || total <= 0) {

    result.innerHTML = `
<div class="error-box">
❌ Please enter valid numbers.
</div>`;

    bunkResult.innerHTML = "";

    needResult.innerHTML = "";

    progressBar.style.width = "0%";

    progressBar.style.background =
    "linear-gradient(90deg,#22c55e,#3b82f6)";

    return;
}

    if (attended > total) {

    result.innerHTML = `
<div class="error-box">
❌ Attended classes cannot be greater than total classes.
</div>`;

    bunkResult.innerHTML = "";

    needResult.innerHTML = "";

    progressBar.style.width = "0%";

    progressBar.style.background =
    "linear-gradient(90deg,#22c55e,#3b82f6)";

    return;
}

    let percentage = (attended / total) * 100;

progressBar.style.width = percentage + "%";
if (percentage < 75) {

    progressBar.style.background =
    "linear-gradient(90deg,#ef4444,#dc2626)";

}
else if (percentage < 90) {

    progressBar.style.background =
    "linear-gradient(90deg,#facc15,#f59e0b)";

}
else {

    progressBar.style.background =
    "linear-gradient(90deg,#22c55e,#16a34a)";

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
}
function resetForm(){

    document.getElementById("attended").value = "";

    document.getElementById("total").value = "";

    document.getElementById("target").value = "75";

    document.getElementById("result").innerHTML = "Your Result Appears Here";

    document.getElementById("bunkResult").innerHTML = "";

    document.getElementById("needResult").innerHTML = "";

    let progressBar = document.getElementById("progressBar");

    progressBar.style.width = "0%";

    progressBar.style.background =
    "linear-gradient(90deg,#22c55e,#3b82f6)";

}