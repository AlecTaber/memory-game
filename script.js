const timerEl = document.getElementById('countdown');
const mainEl = document.getElementById('main');
const cards = document.querySelectorAll("#card1, #card2, #card3, #card4, #card5, #card6, #card7, #card8, #card9, #card10, #card11, #card12");
const cardParentEl = document.querySelector(".cards");
const isRevealed = [];
const statCurrent = document.querySelector(".stats .current");
const youWinModal = document.getElementById("you-win");
const youLoseModal = document.getElementById('youLoseModal');
//const yesButton = document.querySelector('#youWinModal .modal-footer .btn-primary');
//const modalMessage = document.getElementById('modalMessage');
const statWins = document.querySelector(".stats .wins");
const statStreak = document.querySelector(".stats .longestStreak");
const statCurrentStreak = document.querySelector(".stats .currentStreak");
const statTotalMatches = document.querySelector(".stats .total");
const statPercentage = document.querySelector(".stats .percentage");
const statLosses = document.querySelector(".stats .loss");

let cardsData = placeCards();
let inPlay = false;
let timeLeft = 5;
let currentMatches = 0;
let winCounter = 0;
let lossCounter = 0;
let totalMatches = 0;
let winStreak = 0;
let highestWinStreak = 0;
let currentStreak  = 0;

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
        jack, jack, jack, jack, 
        queen, queen, queen, queen, 
        king, king, king, king 
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
    if (isRevealed.length >= 2) {
        const lastCard = isRevealed[isRevealed.length - 1];
        const secondLastCard = isRevealed[isRevealed.length - 2];
        if (lastCard !== secondLastCard) {
          console.log("Mismatch - Calling You Lose Modal");
          $('#youLoseModal').modal('show');
          lossCounter++;
          winStreak = 0;
          currentStreak = 0;
          statLosses.textContent = `Losses: ${lossCounter}`;
          statCurrentStreak.textContent = `Current Streak: ${currentStreak}`;
          winPercentage();
          calcWinStreak();
          updateStats();
          return;
        }
      }

    if (isRevealed.length === 4) {
        const firstCardType = isRevealed[0];
        const allMatch = isRevealed.every(cardType => cardType === firstCardType);

        if (allMatch) {
            currentMatches++;
            totalMatches++;
            console.log(currentMatches);
            console.log("Set Matched!");
            isRevealed.length = 0;
            statCurrent.textContent = `Current Matches: ${currentMatches}`;
            statTotalMatches.textContent = `Total Matches: ${totalMatches}`;
            if (currentMatches === 3) {
                $('#youWinModal').modal('show');
                winCounter++;
                winStreak++;
                currentStreak++;
                statWins.textContent = `Wins: ${winCounter}`;
                statCurrentStreak.textContent = `Current Streak: ${currentStreak}`;
                winPercentage();
                calcWinStreak();
        }
        updateStats();
    }
}}

function resetGame() {
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
    updateStats();
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

function winPercentage() {
    const totalGames = winCounter + lossCounter;
    if (totalGames === 0) {
        return 0;
    } 
    const calculateWinPercentage = (winCounter/totalGames) * 100;
    statPercentage.textContent = `Win Percentage: ${calculateWinPercentage.toFixed(2)}`;
    return calculateWinPercentage.toFixed(2);
}

function calcWinStreak() {
    if (winStreak > highestWinStreak) {
        highestWinStreak = winStreak;
    }
    statStreak.textContent = `Streak: ${highestWinStreak}`;
    updateStats();
}


console.log(placeCards);
console.log(showCards);

const playButton = document.querySelector('.btn-primary.click');
playButton.addEventListener('click', countdown);

cardParentEl.addEventListener('click', flipping);

document.querySelector('#playAgainButtonWin').addEventListener('click', () => {
    resetGame();
    $('#youWinModal').modal('hide');
});

//close you win modal when user clicks "No"
$('#youWinModal .btn-secondary').on('click', function() {
    $('#youWinModal').modal('hide');
});

document.querySelector('#playAgainButtonLose').addEventListener('click', () => {
    resetGame();
    $('#youLoseModal').modal('hide');
});

//close you lose modal when user clicks "No"
$('#youLoseModal .btn-secondary').on('click', function() {
    $('#youLoseModal').modal('hide');
});

function updateStats() {
    localStorage.setItem('winCounter', winCounter);
    localStorage.setItem('lossCounter', lossCounter);
    localStorage.setItem('totalMatches', totalMatches);
    localStorage.setItem('highestWinStreak', highestWinStreak);
    localStorage.setItem('currentStreak', currentStreak);
    localStorage.setItem('winPercentage', winPercentage());
}

function loadStats() {
    winCounter = localStorage.getItem('winCounter') ? parseInt(localStorage.getItem('winCounter')) : 0;
    lossCounter = localStorage.getItem('lossCounter') ? parseInt(localStorage.getItem('lossCounter')) : 0;
    totalMatches = localStorage.getItem('totalMatches') ? parseInt(localStorage.getItem('totalMatches')) : 0;
    highestWinStreak = localStorage.getItem('highestWinStreak') ? parseInt(localStorage.getItem('highestWinStreak')) : 0;
    currentStreak = localStorage.getItem('currentStreak') ? parseInt(localStorage.getItem('currentStreak')) : 0;

    statWins.textContent = `Wins: ${winCounter}`;
    statLosses.textContent = `Losses: ${lossCounter}`;
    statTotalMatches.textContent = `Total Matches: ${totalMatches}`;
    statStreak.textContent = `Streak: ${highestWinStreak}`;
    statCurrentStreak.textContent = `Current Streak: ${currentStreak}`;
    winPercentage();
}

document.addEventListener('DOMContentLoaded', loadStats);