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
        if (timeLeft <= 0) {
            showCards();
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

    cardsArray.push(Jack);
    cardsArray.push(Queen);
    cardsArray.push(King);
    
    return cardsArray;
}

function showCards() {
    const cards = document.getElementsByClassName("card");
    for (let i = 0; i < cards.length; i++) {
        // Set the new image URL for the card
        cards[i].src = 'images/King.jpg'; // Replace with your new image URL
}
}
console.log(placeCards);
console.log(showCards);

const playButton = document.querySelector('.btn-primary.click');
playButton.addEventListener('click', countdown);
