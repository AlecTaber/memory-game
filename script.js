const timerEl = document.getElementById('countdown');
const mainEl = document.getElementById('main');

function countdown() {
    let timeLeft = 5;
    let message = "Time's Up";

    const timeInterval = setInterval(function () {

      if (timeLeft > 1) {
        timerEl.textContent = timeLeft
        timeLeft--;

      } else {
        timerEl.textContent = '';
        clearInterval(timeInterval);
        displayMessage();
      }
    }, 1000);
  }