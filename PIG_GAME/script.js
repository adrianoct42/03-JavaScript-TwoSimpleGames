'use strict';

// Explicação das constantes:
/*
scoreEl --> Pontos totais acumulados.
currentEl --> Pontos do jogador atual da partida.
playerEl --> Usado para aplicar o efeito de toggle() da mudança de player.
diceEl --> Elemento que mostra o dado rodado na tela.
btnNew, Roll, Hold, Reset --> Elemento desses botões específicos.
*/

// # é para selecionar ID
// . é para selecionar CLASSES
// Aqui selecionamos os scores em variáveis, para refatorar o uso excessivo de querySelector no código.
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1'); // <-- Podemos selecionar assim também!
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;
// scores --> Scores finais acumulados de cada jogador, 0 e 1!
// currentScore --> Pontuação da rodada daquele player.
// activePlayer --> Jogador 0 ou Jogador 1 ativos.
// playing --> Ela detectará se o jogo terá terminado!

const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  // Se o activePlayer for 0, troque para 1. Do contrário, se for 1 troque para 0.
  // toggle() adiciona OU remove uma classe, de acordo com a existência dela no elemento.
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Starting Condintions!
const initializationState = () => {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden'); // No início do código, o Dice está ESCONDIDO!
  player0El.classList.remove(`player--winner`);
  player1El.classList.remove(`player--winner`);
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

// Assim que a página carrega, vamos iniciar com as condições iniciais a partir de:
initializationState();

// Rolling the dice functionaluty:
btnRoll.addEventListener('click', function () {
  if (playing === true) {
    // 1. Generating a random dice roll:
    // Math.random() cria algo entre 0 e 0.99 --> Estamos então usando trunc para criar um numero de 0 a 5, e adicionando 1 para que o valor 6 também esteja possível dentre as rolls!
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display the dice:
    diceEl.classList.remove('hidden');
    // Vamos acessar a propriedade src para usar TEMPLATE LITERAL e colocar dinamicamente qual dado irá aparecer na tela! :)
    diceEl.src = `dice-${dice}.png`;

    // 3. Rolled 1? Switch to next player! Else add number to score!
    if (dice !== 1) {
      currentScore = currentScore + dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing === true) {
    // 1. Add current score to active player's score.
    scores[activePlayer] += currentScore; // scores[activePlayer] = scores[activePlayer] + currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >= 64. If TRUE player wins, If FALSE switch players!
    if (scores[activePlayer] >= 64) {
      diceEl.classList.add('hidden');
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(`player--active`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', initializationState);
