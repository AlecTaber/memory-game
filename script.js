const timerEl = document.getElementById('countdown');
const mainEl = document.getElementById('main');

let timeLeft = 5;
let isRevealed = false;

function countdown() {
    const timeInterval = setInterval(function () {
        if (timeLeft > 0) {
            timerEl.textContent = timeLeft;
            timeLeft--;
            showCards();
        } else {
            timerEl.textContent = "Match!";
            clearInterval(timeInterval);
            showCards();
            // We'll add more code here to handle what happens when the timer reaches 0
        }

    }, 1000);
}

function placeCards() {
    const jack = {
        name: "Jack",
        image: "images/Jack.jpg",
    }
    const queen = {
        name: "Queen",
        image: "images/Queen.jpg",
    }
    const king = {
        name: "King",
        image: "images/King.jpg",
}
    const cardsArray=[]

    cardsArray.push(jack);
    cardsArray.push(queen);
    cardsArray.push(king);
    
    return cardsArray;
}

function showCards() {
    const cards = document.querySelectorAll("#card1, #card2, #card3, #card4, #card5, #card6, #card7, #card8, #card9, #card10, #card11, #card12");

    function getRandomNum() {
        return Math.floor(Math.random *3);
    }

    for (let i = 0; i < cards.length; i++) {
        getRandomNum();

        if (timerEl.textContent != "Match!") {
            isRevealed = true;
        } else {
            isRevealed = false;
            cards[i].src = 'images/card-back.jpg';
        }
    }
  // isRevealed = !isRevealed; // Flip the boolean value
}

console.log(placeCards);
console.log(showCards);

const playButton = document.querySelector('.btn-primary.click');
playButton.addEventListener('click', countdown);
