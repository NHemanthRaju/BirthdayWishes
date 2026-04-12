const TARGET_MONTH = 3; // April
const TARGET_DAY = 13;
const REDIRECT_URL = "pop.html";

function getNextTargetDate() {
  const now = new Date();
  let target = new Date(now.getFullYear(), TARGET_MONTH, TARGET_DAY);
  if (now > target) target.setFullYear(now.getFullYear() + 1);
  return target;
}

let targetDate = getNextTargetDate();
let redirected = false;

const elements = {
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds")
};

let prev = {
  days: "00",
  hours: "00",
  minutes: "00",
  seconds: "00"
};

function rotateFlip(el, newValue) {
  el.style.transition = "transform 0.3s ease-in";
  el.style.transform = "rotateX(90deg)";

  setTimeout(() => {
    el.textContent = newValue;

    el.style.transition = "none";
    el.style.transform = "rotateX(-90deg)";

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.transition = "transform 0.3s ease-out";
        el.style.transform = "rotateX(0deg)";
      });
    });
  }, 300);
}

function updateCountdown() {
  const now = new Date();
  const month = now.getMonth();
  const day = now.getDate();

  // 🎯 Redirect (only once)
  if (!redirected && month === TARGET_MONTH && day === TARGET_DAY) {
    redirected = true;
    window.location.href = REDIRECT_URL;
    return;
  }

  const distance = targetDate - now;

  if (distance <= 0) {
    targetDate = getNextTargetDate();
    return;
  }

  const days = String(Math.floor(distance / (1000*60*60*24))).padStart(2,'0');
  const hours = String(Math.floor((distance % (1000*60*60*24)) / (1000*60*60))).padStart(2,'0');
  const minutes = String(Math.floor((distance % (1000*60*60)) / (1000*60))).padStart(2,'0');
  const seconds = String(Math.floor((distance % (1000*60)) / 1000)).padStart(2,'0');

  if (prev.days !== days) rotateFlip(elements.days, days);
  if (prev.hours !== hours) rotateFlip(elements.hours, hours);
  if (prev.minutes !== minutes) rotateFlip(elements.minutes, minutes);
  if (prev.seconds !== seconds) rotateFlip(elements.seconds, seconds);

  prev = { days, hours, minutes, seconds };

  // 📝 Status Message
  let statusMessage = "";

  if (month === TARGET_MONTH) {
    if (day < TARGET_DAY) {
      statusMessage = "UNTIL THEN ADVANCE HAPPY BIRTHDAY TO YOU";
    } else if (day > TARGET_DAY) {
      statusMessage = "UNTIL THEN BELATED HAPPY BIRTHDAY TO YOU";
    } else {
      statusMessage = " HAPPY BIRTHDAY! ";
    }
  } else {
    statusMessage = " WAITING FOR YOUR SPECIAL DAY...";
  }

  // 👇 update UI
  document.getElementById("statusMessage").textContent = statusMessage;

  setTimeout(updateCountdown, 1000);
}

updateCountdown();
