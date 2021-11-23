  // Declare game variables
  let playerMove;
  let username = document.querySelector("#username");
  username.maxLength = "10";
  let resultText;
//-----------------------Game code-----------------------

// Initialise a score object to keep track of
//  - gamesPlayed
//  - wins
//  - draws
//  - losses
let score = {
  gamesPlayed: 0,
  wins: 0,
  draws: 0,
  losses: 0,
};

function getComputerMove() {
  // Get a random number between 0 and less than 1
  let randomNumber = Math.random();

  // If randomNumber is between 0 and 0.33 return rock
  if (randomNumber >= 0 && randomNumber < 0.33) {
    return "rock";
  }

  // If randomNumber is between 0.33 and 0.66 return rock
  if (randomNumber >= 0.33 && randomNumber < 0.66) {
    return "paper";
  }

  // If randomNumber is between 0.66 and 1 return rock
  if (randomNumber >= 0.66 && randomNumber < 1) {
    return "scissors";
  }
}

function getWinner(playerMove, computerMove) {
  // If both player and computer play the same move, return 0 for draw
  if (playerMove === computerMove) {
    return 0;
  }

  if (playerMove === "rock") {
    if (computerMove === "paper") {
      // player rock loses to computer paper, return -1 for player loss
      return -1;
    } else if (computerMove === "scissors") {
      // player rock beats computer scissors, return 1 for player win
      return 1;
    }
  } else if (playerMove === "paper") {
    if (computerMove === "rock") {
      // player paper beats computer rock, return 1 for player win
      return 1;
    } else if (computerMove === "scissors") {
      // player paper loses to computer scissors, return -1 for player loss
      return -1;
    }
  } else if (playerMove === "scissors") {
    if (computerMove === "rock") {
      // player scissors loses to computer rock, return -1 for player loss
      return -1;
    } else if (computerMove === "paper") {
      // player scissors beats computer paper, return 1 for player win
      return 1;
    }
  }
}

function updateScore(result) {
  score.gamesPlayed = score.gamesPlayed + 1;
  if (result === 1) {
    score.wins = score.wins + 1;
    resultText = "You win!"
  } else if (result === 0) {
    score.draws = score.draws + 1;
    resultText = "It's a draw!"
  } else if (result === -1) {
    score.losses = score.losses + 1;
    resultText = "You lose!"
  }
}

function displayScore() {
  // alert(
  //   `${username}, you have played ${score.gamesPlayed} game(s) so far. You are at ${score.wins} wins, ${score.losses} losses and ${score.draws} draws`
  // );
}

  // Get computer move from getComputerMove function
  let computerMove = getComputerMove();

  // Get the winner based on what playerMove and computerMove are
  // result is either 1 (player win), 0 (draw) or -1 (player loss)
  let result = getWinner(playerMove, computerMove);


//-----------------------Button handler code-----------------------

//Declare button handlers
let rock = document.querySelector("#rock-button")
let paper = document.querySelector("#paper-button")
let scissors = document.querySelector("#scissors-button")

//Add click event listeners to buttons
rock.addEventListener("click", playGame);
paper.addEventListener("click", playGame);
scissors.addEventListener("click", playGame);

function playGame(event) {
  if (username === "") {
    return;
  } else {
  playerMove = event.target.innerText.toLowerCase();
  computerMove = getComputerMove();
  result = getWinner(playerMove, computerMove);
  //Update your move, computer move
  document.querySelector("#your-move").innerText = `Your move: ${playerMove}`
  document.querySelector("#computer-move").innerText = `Computer move: ${computerMove}`
  //Update the scores with values from the updateScore function based on result
  updateScore(result);
  document.querySelector("#games-played").innerText = `Games played: ${score["gamesPlayed"]}`;
  document.querySelector("#wins").innerText = `Wins: ${score["wins"]}`;
  document.querySelector("#losses").innerText = `Losses: ${score["losses"]}`;
  document.querySelector("#drew").innerText = `Drew: ${score["draws"]}`;
  //Display result
  document.querySelector("#result").innerText = `Winner of round: ${username}, you played ${playerMove} and computer played ${computerMove}. ${resultText}`
}
}

//Add a username update listener
let userInputBox = document.querySelector("#username");
username.addEventListener("keyup", updateUsername)
const specialChars = /[^a-zA-Z0-9/-]+/g;

function updateUsername (event) {
  username = event.target.value;
  username = username.replace(/[^a-zA-Z0-9/-]+/, "")
    console.log("special chars input")
  document.querySelector("#welcome-username").innerText = `Welcome ${username}!`
}