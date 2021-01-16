"use strict";

var player1 = {};

var player2 = {};

var dice = {};

var currentPlayer;

var playing = true;

const newGameButton = document.querySelector(".btn--new");
const holdButton = document.querySelector(".btn--hold");
const diceImage = document.querySelector(".dice");
const rollDiceButton = document.querySelector(".btn--roll");

window.onload = startNewGame;

newGameButton.addEventListener("click", startNewGame);

rollDiceButton.addEventListener("click", rollDice);

holdButton.addEventListener("click", hold);

function render() {
    // render player1 score
    document.querySelector("#score--0").textContent = player1.score;
    document.querySelector("#score--1").textContent = player2.score;
    // render player2 score
    document.querySelector("#current--0").textContent = player1.currentScore;
    document.querySelector("#current--1").textContent = player2.currentScore;
    // render player--active class
    player1.active
        ? document.querySelector(".player--0").classList.add("player--active")
        : document
              .querySelector(".player--0")
              .classList.remove("player--active");
    player2.active
        ? document.querySelector(".player--1").classList.add("player--active")
        : document
              .querySelector(".player--1")
              .classList.remove("player--active");
    // render player--winner class
    player1.win
        ? document.querySelector(".player--0").classList.add("player--winner")
        : document
              .querySelector(".player--0")
              .classList.remove("player--winner");
    player2.win
        ? document.querySelector(".player--1").classList.add("player--winner")
        : document
              .querySelector(".player--1")
              .classList.remove("player--winner");
    // render dice
    if (dice.number) {
        document.querySelector(".dice").classList.remove("hidden");
        document.querySelector(".dice").src = `dice-${dice.number}.png`;
    } else {
        document.querySelector(".dice").classList.add("hidden");
    }
    // update playing status
    if (playing) {
        holdButton.disabled = false;
        rollDiceButton.disabled = false;
    } else {
        holdButton.disabled = true;
        rollDiceButton.disabled = true;
    }
}

function startNewGame() {
    playing = true;
    dice = {};
    // initial state
    player1 = {
        active: true,
        score: 0,
        currentScore: 0,
        win: false,
    };
    player2 = {
        active: false,
        score: 0,
        currentScore: 0,
        win: false,
    };

    currentPlayer = player1;

    render();
}

function rollDice() {
    dice.number = Math.trunc(Math.random() * 6) + 1;
    // render dice image
    diceImage.src = `dice-${dice.number}.png`;
    diceImage.classList.remove("hidden");
    //
    if (dice.number === 1) {
        currentPlayer.currentScore = 0;
        switchPlayer();
    } else {
        currentPlayer.currentScore += dice.number;
    }

    render();
}

function switchPlayer() {
    currentPlayer === player1
        ? (currentPlayer = player2)
        : (currentPlayer = player1);

    player1.active = !player1.active;
    player2.active = !player2.active;

    render();
}

function hold() {
    currentPlayer.score += currentPlayer.currentScore;
    currentPlayer.currentScore = 0;
    if (currentPlayer.score >= 100) {
        currentPlayer.win = true;
        playing = false;
    } else {
        switchPlayer();
    }
    render();
}
