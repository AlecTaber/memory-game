const timerEl = document.getElementById('countdown');
const mainEl = document.getElementById('main');
const cardsData = placeCards();

let timeLeft = 5;
let isRevealed = false;

function countdown() {
    const timeInterval = setInterval(function () {
        placeCards();
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
    const jack = { name: "Jack", image: "images/Jack.jpg" };
    const queen = { name: "Queen", image: "images/Queen.jpg" };
    const king = { name: "King", image: "images/King.jpg" };
    
    const cardsArray = [
        jack, jack, jack, jack,  // Four Jacks
        queen, queen, queen, queen,  // Four Queens
        king, king, king, king  // Four Kings
    ];
    
    return shuffle(cardsArray);
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function showCards() {
    const cards = document.querySelectorAll("#card1, #card2, #card3, #card4, #card5, #card6, #card7, #card8, #card9, #card10, #card11, #card12");

    for (let i = 0; i < cards.length; i++) {
        if (timerEl.textContent != "Match!") {
            isRevealed = true;
            cards[i].src = cardsData[i].image;
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