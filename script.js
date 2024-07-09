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

function placeCards() {
    const Jack = {
        name: "Jack",
        image: "images/Jack.jpg",
    }
    const Queen = {
        name: "Queen",
        image: "images/Queen.jpg",
    }
    const King = {
        name: "King",
        image: "images/King.jpg",
}
    const cardsArray=[]

    cardsArray.push(Jack);
    cardsArray.push(Queen);
    cardsArray.push(King);
    
    return cardsArray;
}

console.log(placeCards);

const playButton = document.querySelector('.btn-primary.click');
playButton.addEventListener('click', countdown);
