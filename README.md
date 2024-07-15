# memory-game

Memory game is a webpage that challenges the player to memorize three sets of four cards in five seconds.  When the timer runs out, the cards will be hidden and the player must click to uncover the same type of card consecutively until the set of four has been correctly revealed.  The real challenge and twist we put on this game is that the player can only mess up once.  If they get a set wrong, it's an immediate game over.  The replayability comes from the players stats which constantly track and update their game play including how many wins, losses, win/loss percentage, win streak, and more.


## Getting Started

Right click on the index.html file and open the webpage up in a new browser.
From there, you will be able to play the game.
Here is the webpage link, you can also use this to open the page.  https://alectaber.github.io/memory-game/ 


### Built with

HTML
CSS
Javascript
Bootstrap

### Code Snippets

```html 
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <link rel="stylesheet" href="style.css" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <script defer src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"
        integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r"
        crossorigin="anonymous"></script>
    <script defer src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js"
        integrity="sha384-0pUGZvbkm6XF6gxjEnlmuGrJXVbNuzT9qBBavbLwCsOGabYfZo0T0to5eqruptLy"
        crossorigin="anonymous"></script>
    <title>Memory Game</title>
</head>
```

```html
<aside class="stats">
    <h3>Statistics</h3>
    <li class="wins">Wins:</li>
    <li class="loss">Losses:</li>
    <li class="longestStreak">Longest Streak:</li>
    <li class="currentStreak">Current Streak:</li>
    <li class="percentage">Win Percentage:</li>
    <li class="current">Current Matches:</li>
    <li class="total">Total Matches:</li>
</aside>
```

```Javascript
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
```

```Javascript
const cards = document.querySelectorAll("#card1, #card2, #card3, #card4, #card5, #card6, #card7, #card8, #card9, #card10, #card11, #card12");


function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
```


### Deployed Link

https://alectaber.github.io/memory-game/ 


## Authors

**Alec Taber**
**Ashlin Lee**
**Joseph Norris**

[Link to Git Hub for Alec Taber](https://github.com/AlecTaber)
[Link to Git Hub for Ashlin Lee]()
[Link to Git Hub for Joseph Norris](https://github.com/yoseph1618)

[Link to LinkedIn for Alec Taber](https://www.linkedin.com/in/alec-taber-11b963311)
[Link to LinkedIn for Ashlin Lee]()
[Link to LinkedIn for Joseph Norris](www.linkedin.com/in/joseph-norris-a9a491229)


## License

This project is licensed under the MIT License


## Achnowledgments

Special thanks to everyone's computers that were destroyed in the process of making this.
Shout out to Ashlin's work for letting her focus on this project full time!
Thank you Jerome for literally doing nothing to help us at all on this project.(We seriously had zero help from Jerome.)
Praise be to Alec Taber for being inspired with the game concept and getting his inspiration from the basketball games he saw.  Without Alec, none of this would be possible.
Special thanks to Joseph.
Thank you to all the friends and family members who believed in us and supported us through this long and difficult journey.