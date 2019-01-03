const deepCopy = (x) => {
  return JSON.parse(JSON.stringify(x));
};

const X = 'X';
const O = 'O';

const detectWinner = (squares) => {
  let winner;
  for (let line of boardLines) {
    let xs_and_os = line.map(pos => squares[pos[0]][pos[1]]);

    if (xs_and_os.every(x_or_o => x_or_o === X)) {
      winner = X; break;
    }
    else if (xs_and_os.every(x_or_o => x_or_o === O)) {
      winner = O; break;
    }
  }
  return winner;
};

const boardLines = [
  // horizontal lines
  [ [0,0], [0,1], [0,2] ],
  [ [1,0], [1,1], [1,2] ],
  [ [2,0], [2,1], [2,2] ],
  // vertical lines
  [ [0,0], [1,0], [2,0] ],
  [ [0,1], [1,1], [2,1] ],
  [ [0,2], [1,2], [2,2] ],
  // diagonal lines
  [ [0,0], [1,1], [2,2] ],
  [ [2,0], [1,1], [0,2] ],
];

export {
    X, O,
    deepCopy,
};
