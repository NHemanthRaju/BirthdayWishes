const countdownEl = document.getElementById("countdown");

// Target date
const TARGET_MONTH = 0; // January (0-based)
const TARGET_DAY = 25;  // 25th

const REDIRECT_URL = "test1.html";

function getNextTargetDate() {
  const now = new Date();
  let target = new Date(now.getFullYear(), TARGET_MONTH, TARGET_DAY, 0, 0, 0);

  if (now > target) {
    target.setFullYear(now.getFullYear() + 1);
  }

  return target;
}

let targetDate = getNextTargetDate();

setInterval(() => {
  const now = new Date();
  const month = now.getMonth();
  const day = now.getDate();

  // 🎯 Redirect on birthday
  if (month === TARGET_MONTH && day === TARGET_DAY) {
    window.location.href = REDIRECT_URL;
    return;
  }

  // ⏳ Countdown
  const distance = targetDate - now;
  if (distance <= 0) {
    targetDate = getNextTargetDate();
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // 📝 Bottom message
  let statusMessage = "";

  if (month === TARGET_MONTH) {
    if (day < TARGET_DAY) {
      statusMessage = "UNTIL THEN ADVANCE HAPPY BIRTHDAY TO YOU";
    } else if (day > TARGET_DAY) {
      statusMessage = "UNTIL THEN BELATED HAPPY BIRTHDAY TO YOU";
    }
  }

  // 🖥️ FINAL OUTPUT (ORDERED)
  countdownEl.innerHTML = `
    <div class="top-text">
      LET'S WAIT TOGETHER UNTIL YOUR NEXT BIRTHDAY
    </div>

    <div class="timer">
      ${days}d ${hours}h ${minutes}m ${seconds}s
    </div>

    <div class="bottom-text">
      ${statusMessage}
    </div>
  `;
}, 1000);

