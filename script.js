const timerEl = document.getElementById('countdown');
const mainEl = document.getElementById('main');
const cardsData = placeCards();
const cards = document.querySelectorAll("#card1, #card2, #card3, #card4, #card5, #card6, #card7, #card8, #card9, #card10, #card11, #card12");
const cardParentEl = document.querySelector(".cards");
const isRevealed = [];

let inPlay = false;
let timeLeft = 5;
let currentMatches = 0;

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
    inPlay = true;
    for (let i = 0; i < cards.length; i++) {
        if (timerEl.textContent != "Match!") {
            cards[i].src = cardsData[i].image;
            let cardType = cardsData[i].image.split("/")[1].split(".")[0];
            console.log(cardType)
            cards[i].setAttribute("data-card-type", cardType)
            cards[i].setAttribute("data-front", cardsData[i].image)
            cards[i].setAttribute("data-state", "visible")
        } else {
            cards[i].src = 'images/card-back.jpg';
            cards[i].setAttribute("data-state", "hidden")
        }
    }
}

function checkMatches () {
    //iterate through array "isRevealed" and compare values, and see if length = 4
    //if length = 4, add point, dump array
    //if they don't match execute reset game
    for (let i = 0; i < isRevealed.length; i++) {
       if (i === isRevealed[0] && isRevealed.length === 4) { //idk what to do here with the data-card type to get them to compare
            currentMatches++;
            isRevealed = [];
        } else if (i === isRevealed[0] && isRevealed.length <4) {
            return;
        } else if (i != isRevealed[0]) {
            resetGame();
            console.log("It's working")
         }
    }
}

function resetGame () {
    //reshuffle cards
    //gameScore = 0
    //timeLeft = 5
    //timerElement.textcontent = 5
    //if they want to play again, call count down. If not, return (will this allow them to click the play button to play again?)
    //just trying to think what we will do if they don't want to play again. Just leave the page as is?
}

function flipping (e) {
    if (!inPlay || e.target.getAttribute("data-state") === "visible") {
        return;
    } else {
        console.log(e.target);
        e.target.setAttribute("data-state", "visible")
        e.target.setAttribute("src", e.target.getAttribute("data-front"))
        isRevealed.push(e.target.getAttribute("data-card-type"))
        checkMatches();
    }
}


console.log(placeCards);
console.log(showCards);

const playButton = document.querySelector('.btn-primary.click');
playButton.addEventListener('click', countdown);

cardParentEl.addEventListener('click', flipping);