let score = JSON.parse( localStorage.getItem('score'));
    if (!score) {
      score = {
        wins:0,
        losses: 0,
        ties: 0
      }
    }

    updateScore();

    let isAutoPlaying = false;
    let intervalId;

    function autoPlay() {
      if (!isAutoPlaying) {
        intervalId = setInterval(function () {
        const playerMove = pickComputerMove();
        playGame(playerMove);
      }, 1000)
      isAutoPlaying = true;
      } else{
        clearInterval(intervalId);
        isAutoPlaying = false;
      }
      
    }

    function playGame(playerMove)  {
      const computerMove = pickComputerMove();
      let result = '';
    
      if (playerMove === 'Scissors') {
        if (computerMove === 'rock') {
          result = 'You Lose.';
        } else if (computerMove === 'Paper') {
          result = 'You Win.';
        } else if (computerMove === 'Scissors') {
          result = 'Tie.';
        }
    
      } else if (playerMove === 'Paper') {
        if (computerMove === 'rock') {
          result = 'You Win.';
        } else if (computerMove === 'Paper') {
          result = 'Tie.';
        } else if (computerMove === 'Scissors') {
          result = 'You Lose.';
        }
    
      } else if (playerMove === 'rock') {
        if (computerMove === 'rock') {
          result = 'Tie.';
        } else if (computerMove === 'Paper') {
          result = 'You Lose.';
        } else if (computerMove === 'Scissors') {
          result = 'You Win.';
        }
      }
      if (result === 'You Win.') {
        score.wins += 1;
      } else if (result === 'You Lose.') {
        score.losses +=1;
      } else if (result === 'Tie.') {
        score.ties +=1;
      }  
      
      localStorage.setItem('score',JSON.stringify(score))

      updateScore();
      
      const jsresult = document.querySelector('#js-result');
      jsresult.innerHTML = result;

      const jsmoves = document.querySelector('#js-moves');
      jsmoves.innerHTML = ` You
    <img src="${playerMove}-emoji.png" class="icon" >
    <img src="${computerMove}-emoji.png"class="icon">
    Computer`

    }

    function updateScore() {
      const jsScore = document.querySelector('#js-score');
      jsScore.innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
    }
    
    function pickComputerMove() {
      const randomNumber = Math.random();
      let computerMove = '';
      if (randomNumber >= 0 && randomNumber < 1/3) {
        computerMove = 'rock';
      } else if  (randomNumber >= 1/3 && randomNumber < 2/3) {
        computerMove = 'Paper';
      } else if (randomNumber >= 2/3 && randomNumber < 1){
        computerMove = 'Scissors';
      }
      return computerMove;
    }