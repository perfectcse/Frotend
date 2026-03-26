const timeElement = document.getElementById("time");
const dateElement = document.getElementById("date");
const toggleBtn = document.getElementById("toggleFormat");

let is24Hour = true;

function updateClock() {
  const now = new Date();

  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  let ampm = "";

  if (!is24Hour) {
    ampm = hours >= 12 ? " PM" : " AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
  }

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  timeElement.innerText = `${hours}:${minutes}:${seconds}${ampm}`;

  // Date
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  dateElement.innerText = now.toLocaleDateString(undefined, options);
}

// Toggle 12/24
toggleBtn.addEventListener("click", () => {
  is24Hour = !is24Hour;
  updateClock();
});

setInterval(updateClock, 1000);
updateClock();