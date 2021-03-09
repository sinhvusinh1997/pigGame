let score, roundScore, activePlayer, gamePlaying;

// Function 
const nextPlayer = () => {

  roundScore = 0;
  document.querySelector(`#current-${activePlayer}`).textContent = 0;
  document.querySelectorAll(`#dice-1, #dice-2`).forEach(cur => cur.style.display = 'none');
  document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');

  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  document.querySelector(`.player-${activePlayer}-panel`).classList.add('active');
};

const init = () => {
  score = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  document.querySelectorAll(`#score-0, #score-1, #current-0, #current-1`).forEach(cur => cur.textContent = 0);
  document.querySelectorAll('.dices').forEach(cur => cur.style.display = 'none');
  document.querySelectorAll(`.player-0-panel, .player-1-panel`).forEach(cur => {
    cur.classList.remove('winner');
    cur.classList.remove('active');
  });
  document.querySelector('.player-0-panel').classList.add('active');
};

document.querySelector('.btn-roll').addEventListener('click', () => {
  if (gamePlaying) {
    console.log(activePlayer);

    let dice1, dice2;

    dice1 = Math.ceil(Math.random() * 6);
    dice2 = Math.ceil(Math.random() * 6);

    if (dice1 !== 1 && dice2 !== 1) {

      roundScore += dice1 + dice2;
      document.querySelectorAll(`.dices`).forEach(cur => cur.style.display = 'block');

      document.getElementById('dice-1').src = `/assets/img/dice-${dice1}.png`;
      document.getElementById('dice-2').src = `/assets/img/dice-${dice2}.png`;

      document.getElementById(`current-${activePlayer}`).textContent = roundScore;
    } else {
      nextPlayer();
    };
  };
});

document.querySelector('.btn-hold').addEventListener('click', () => {

  if (gamePlaying) {

    let winScore = parseInt(document.querySelector('.final-score').value) || 100;
    score[activePlayer] += roundScore;
    document.getElementById(`score-${activePlayer}`).textContent = score[activePlayer];
    roundScore = 0;

    if (score[activePlayer] >= winScore) {

      document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
      document.querySelectorAll(`#dice-1, #dice-2`).forEach(cur => cur.style.display = 'none');
      gamePlaying = false;
      

    } else {
      nextPlayer();
    }
  };
});

document.querySelector('.btn-new').addEventListener('click', init);

init();