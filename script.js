const timerEl = document.getElementById('countdown');
const mainEl = document.getElementById('main');
const cards = document.querySelectorAll("#card1, #card2, #card3, #card4, #card5, #card6, #card7, #card8, #card9, #card10, #card11, #card12");
const cardParentEl = document.querySelector(".cards");
const isRevealed = [];
const statCurrent = document.querySelector(".stats .current");
const youWinModal = document.getElementById("you-win");
const yesButton = document.querySelector('.modal-footer .btn-primary');

let cardsData = placeCards();
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

function checkMatches() {
    //iterate through array "isRevealed" and compare values, see if length = 4
    //if length = 4, add point to currentMatches, dump array
    //if they don't match, execute resetGame
    
    //This code checks matches as cards are clicked
    if (isRevealed.length >= 2) {
        const lastCard = isRevealed[isRevealed.length - 1];
        const secondLastCard = isRevealed[isRevealed.length - 2];
        if (lastCard !== secondLastCard) {
          console.log("Mismatch - Calling resetGame()");
          resetGame();
          return; // Exit the function after resetGame
        }
      }

    //This code checks for completed sets of matches
    if (isRevealed.length === 4) {
        const firstCardType = isRevealed[0];
        const allMatch = isRevealed.every(cardType => cardType === firstCardType);

        if (allMatch) {
            currentMatches++;
            console.log(currentMatches);
            console.log("Set Matched!");
            isRevealed.length = 0; // Clear revealed types after a match
            statCurrent.textContent = `Current Matches: ${currentMatches}`;
            if (currentMatches === 3) { // Assuming 3 matches complete the game
                $('#youWinModal').modal('show');
        }
    }

}}

function resetGame() {
    //reshuffle cards
    //currentMatches = 0
    //timeLeft = 5
    //timerElement.textcontent = 5
    cards.forEach(card => {
        card.src = 'images/card-back.jpg';
        card.setAttribute("data-state", "hidden");
    });
    isRevealed.length = 0;
    cardsData = placeCards();
    timeLeft = 5;
    timerEl.textContent = timeLeft;
    currentMatches = 0;
    statCurrent.textContent = `Current Matches: ${currentMatches}`;
}

function flipping(e) {
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

// Event listener for the "Play Again" button in the modal
playAgainButton.addEventListener('click', () => {
    resetGame();
    $('#youWinModal').modal('hide');
});