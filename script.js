const timerEl = document.getElementById('countdown');
const mainEl = document.getElementById('main');
function countdown() {
    let timeLeft = 5;
    const timeInterval = setInterval(function () {
        if (timeLeft > 0) {
            timerEl.textContent = timeLeft;
            timeLeft--;
        } else {
            timerEl.textContent = "Match!";
            clearInterval(timeInterval);
            // We'll add more code here to handle what happens when the timer reaches 0
        }
    }, 1000);
}
const playButton = document.querySelector('.btn-primary.click');
playButton.addEventListener('click', countdown);
