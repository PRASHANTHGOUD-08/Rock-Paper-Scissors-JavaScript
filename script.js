let scores = JSON.parse(localStorage.getItem("Score"));

if (scores === null) {
    scores = {
        wins: 0,
        loses: 0,
        ties: 0
    };
}

function updateScores() {
    document.querySelector(".js-scores").innerHTML = `
        Wins: ${scores.wins}<br>
        Ties: ${scores.ties}<br>
        Loses: ${scores.loses}
    `;
}

updateScores();

function computerGuess() {

    const random = Math.random();

    if (random < 1 / 3) {
        return "rock";
    }
    else if (random < 2 / 3) {
        return "paper";
    }
    else {
        return "scissors";
    }
}

function playerGuess(guess) {

    let comGuess = computerGuess();
    let res = "";

    if (guess === comGuess) {
        res = 0;
        scores.ties++;
    }
    else if (
        (guess === "rock" && comGuess === "scissors") ||
        (guess === "scissors" && comGuess === "paper") ||
        (guess === "paper" && comGuess === "rock")
    ) {
        res = 1;
        scores.wins++;
    }
    else {
        res = -1;
        scores.loses++;
    }

    let result = "";

    if (res === 0) {
        result = "<b>Tie!</b> Try again";
    }
    else if (res === 1) {
        result = "<b>You Won! 🏆</b>";
    }
    else {
        result = "<b>You Lose!</b> Try again";
    }

    localStorage.setItem("Score", JSON.stringify(scores));

    updateScores();

    document.querySelector(".js-result").innerHTML = result;

    document.querySelector(".js-moves").innerHTML =
        `You chose ${guess}. Computer chose ${comGuess}`;
}

function resetScore() {

    scores.wins = 0;
    scores.ties = 0;
    scores.loses = 0;

    localStorage.removeItem("Score");

    updateScores();

    document.querySelector(".js-result").innerHTML = "";
    document.querySelector(".js-moves").innerHTML = "";
}