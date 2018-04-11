class TicTacToe {
  constructor() {
    this.board = this.createBoard();
    this.turnX = true;
    this.cells = {
      1: [0,0],
      2: [0,1],
      3: [0,2],
      4: [1,0],
      5: [1,1],
      6: [1,2],
      7: [2,0],
      8: [2,1],
      9: [2,2],
    }
  }

  createBoard() {
    const board = [];
    for (var i = 0; i < 3; i++) {
      board.push(Array(3).fill(" "));
    }
    console.log(board);
    return board;
  }

  handleTurn(num) {
    const coors = this.cells[num];
    let chosenCell = this.board[coors[0]][coors[1]];
    const player = this.turnX ? 'X' : 'O'

    if (this.board[coors[0]][coors[1]] === ' ') {
      this.board[coors[0]][coors[1]] = player;
      this.turnX = !this.turnX;
      console.log(this.board);
    } else {
      console.log('That spot is already taken! Try another');
    }
  }
}

const game = new TicTacToe();
game.handleTurn(3);
game.handleTurn(4);
game.handleTurn(4);