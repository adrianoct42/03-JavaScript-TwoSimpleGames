"use strict";

/*
Podemos usar o document.querySelector para pegar uma classe do HTML ou CSS.
Se quisermos selecionar uma classe, usamos . e se for id usamos #
Abaixo, estamos selecionando a classe message e usamos .textContent para exibir o texto.

console.log(document.querySelector(".message").textContent);

Para SETAR um texto, podemos usar:
document.querySelector(".message").textContent = "Value Changed! 🎉";
console.log(document.querySelector(".message").textContent);
Isso é DOM Manipulation!

document.querySelector(".number").textContent = 13;
document.querySelector(".score").textContent = 10;
document.querySelector(".guess").valeu = 25; // .value é usado quando o campo é um INPUT!
^ Estamos definindo essas classes em específico com os valores atribuidos!
*/

// HANDLING CLICKING EVENTS:
// addEventListener vai ouvir um evento.
// Esse evento é do tipo "click".
// O segundo argumento é a reação, o eventHandler!

let secretNumber = Math.trunc(Math.random() * 30) + 1;
let score = 30;
let highScore = 0;
// ---------------------------------
// REFACTORING THE CODE:
const displayMessage = message => {
  document.querySelector(".message").textContent = message;
};
const displayNumber = number => {
  document.querySelector(".number").textContent = number;
};
// ---------------------------------

document.querySelector(".check").addEventListener("click", function () {
  // .value é usado quando o campo é um INPUT!
  const guess = Number(document.querySelector(".guess").value);
  console.log(guess, typeof guess);

  if (!guess) {
    // When the player hasn't typed anything:
    displayMessage("⛔️ No number!");
  } else if (guess !== secretNumber && score > 0) {
    // When guess is wrong:
    score--;
    document.querySelector(".score").textContent = score;
    displayMessage(guess > secretNumber ? "Too High!" : "Too Low!");
  } else if (guess === secretNumber && score > 0) {
    // When the player wins:
    displayNumber(secretNumber);
    displayMessage("You Win! 🎉");
    document.querySelector("body").style.backgroundColor = "#60b347"; // Green Color in HEXADECIMAL.
    document.querySelector(".number").style.width = "30rem";
    if (score > highScore) {
      highScore = score;
      document.querySelector(".highscore").textContent = highScore;
    }
  } else {
    // When the player loses:
    displayMessage("You lost the game! 💥");
  }
});

document.querySelector(".again").addEventListener("click", function () {
  score = 30;
  secretNumber = Math.trunc(Math.random() * 50) + 1;
  displayMessage("Start guessing again...");
  document.querySelector(".score").textContent = score;
  displayNumber("?");
  document.querySelector(".guess").value = "";
  document.querySelector("body").style.backgroundColor = "#222";
  document.querySelector(".number").style.width = "15rem";
});
