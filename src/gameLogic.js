const prompt = require('prompt');

const mainBoard = {
  1: ' ',
  2: ' ',
  3: ' ',
  4: ' ',
  5: ' ',
  6: ' ',
  7: ' ',
  8: ' ',
  9: ' ',
};

const gameData = {
  'nameX': '',
  'nameO': '',
  'turn': 'X',
  'count': 0,
};

const winCombos = [ [1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6 ,9], [1, 5, 9], [3, 5, 7]];

const checkWin = (player) => {
  const board = mainBoard;
  for(var i = 0; i < winCombos.length; i++) {
    const cellOne = board[winCombos[i][0]];
    const cellTwo = board[winCombos[i][1]];
    const cellThree = board[winCombos[i][2]];
    if (cellOne === player && cellTwo === player && cellThree === player) {
      return true;
    }
  }
  return false;
}

const generateBoard = (type) => {
  let board = mainBoard;
  if (type) {
    board = guideBoard();
  }
  const currBoard = [
    `\n ${board[1]} | ${board[2]} | ${board[3]}\n ---------\n`,
    ` ${board[4]} | ${board[5]} | ${board[6]}\n ---------\n`,
    ` ${board[7]} | ${board[8]} | ${board[9]}\n`
  ];
  console.log(currBoard.join(''));
};

const guideBoard = () => {
  const guide = {};
  for (let key in mainBoard) {
    guide[key] = key;
  }
  return guide;
};

const playerTurn = (player) => {
  const board = mainBoard;
  let name = player === 'X' ? gameData.nameX : gameData.nameO;
  console.log(`${name}, it's your turn. Choose a position (e.g. 1 or 2 ...9)`);
  prompt.get(['position'], (err, res) => {
    const cellRef = res['position'];
    if (board[cellRef] === ' ') {
      board[cellRef] = player;
      gameData.count++;
      if (checkWin(player)) {
        generateBoard();
        console.log(`**** WINNER WINNER, CHICKEN DINNER! Congrats ****\n`)
      } else if (!checkWin(player) && gameData.count === 9) {
          generateBoard();
          console.log('**** Tie game! Run the program again to start a new game. ****\n\n');
      } else {
        gameData.turn = gameData.turn === 'X' ? 'O' : 'X';
        generateBoard();
        playerTurn(gameData.turn);
      }
    } else {
      console.log('Invalid position... try again');
      generateBoard();
      playerTurn(gameData.turn);
    }
  });
};

const runGame = () => {
  prompt.start();
  prompt.get(['Player X name: ', 'Player O name: '], (err, res) => {
    gameData.nameX = res['Player X name: '];
    gameData.nameO = res['Player O name: '];
    console.log('\nLet\'s play!\n');
    console.log('\nHere is the guide board: \n\n')
    generateBoard('guide');
    console.log('\nAs you can see, the cells on the top row of the grid are numbered 1, 2, and 3\nthe middle are numbered 4, 5, and 6\nthe bottom row are numbered 7, 8, and 9\n===> use these numbers to select the position of your nex play token (e.g. "X" or "O"): \n\n\n')
    playerTurn(gameData.turn);
  })
}

runGame();
