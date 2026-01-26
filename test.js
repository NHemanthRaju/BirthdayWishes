

const countdownEl = document.getElementById("countdown");

// - Target day (Month 0 = Jan)
const TARGET_MONTH = 0; // January
const TARGET_DAY = 27;  // 26th 

const REDIRECT_URL = "test1.html"; 

function getNextTargetDate() {
  const now = new Date();
  let target = new Date(now.getFullYear(), TARGET_MONTH, TARGET_DAY, 0, 0, 0);

  // If today is after this year's target date → next year
  if (now > target) {
    target.setFullYear(now.getFullYear() + 1);
  }

  return target;
}

let targetDate = getNextTargetDate();

setInterval(() => {
  const now = new Date();

  // 🎉 Check if today IS the target date (ignore year)
  if (now.getMonth() === TARGET_MONTH && now.getDate() === TARGET_DAY) {
	window.location.href = REDIRECT_URL;
    return;
	
    //countdownEl.innerHTML = " Today is the day!";
    //return; // skip countdown
  }

  // Countdown before target date
  const distance = targetDate - now;

  if (distance <= 0) {
    targetDate = getNextTargetDate(); // reset for next year
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  countdownEl.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}, 1000);
