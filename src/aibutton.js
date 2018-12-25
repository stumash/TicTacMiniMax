import React from 'react';

import { deepCopy } from './utils.js'

export function AiButton(props) {
  return (
    <button onClick={() => props.clickSquare(
      ...bestMove( props.currentSqaures(), props.isTurnX() )
    )}>
      Do Best Next Move
    </button>
  );
}

/**
 *
 * ALL THINGS MINIMAX BELOW
 *
 */


function bestMove(squares, isTurnX) {
  // what to do? what to do? lel
}

function possibleBoards(squares, isTurnX) {
  const retval = [];
  squares.forEach((row,i) => {
    row.forEach((square,j) => {
      if (square !== 'X' && square !== 'O') {
        const copySquares = deepCopy(squares);
        if (isTurnX) {
          copySquares[i][j] = 'X';
          retval.push(copySquares);
        } else {
          copySquares[i][j] = 'O';
          retval.push(copySquares);
        }
      }
    });
  });
  return retval;
}

// map integer representation of board state to win 1, loss -1, or draw 0 for X
const m = new Map();

function detectWinner(squares) {
  let winner;
  for (let line of boardLines) {
    let xs_and_os = line.map(pos => squares[pos[0]][pos[1]]);

    if (xs_and_os.every(x_or_o => x_or_o === 'X')) {
      winner = 'X'; break;
    }
    else if (xs_and_os.every(x_or_o => x_or_o === 'O')) {
      winner = 'O'; break;
    }
  }

  return winner;
}

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

function equivalentBoardsAsInts(squares, isTurnX) {
    return equivalentBoards(squares).map((equivSquares) => {
        squaresToInt(equivSquares,isTurnX)
    });
}

// squares (board state) to 'base4' int representation for faster lookup in Map
function squaresToInt(squares, isTurnX) {
  const nineSquares = [].concat(...squares);
  let intRepresentation = 0;

  // each of the 9 squares get two bits in the int representation
  nineSquares.forEach((s, i) => {
    const shift = i*2;
    if (s === 'X') {
      intRepresentation |= 1 << shift;
    } else if (s === 'O') {
      intRepresentation |= 2 << shift;
    }
  });

  if (isTurnX) {
    intRepresentation |= 1 << 19 // 19 = 2*9 + 1
  }

  return intRepresentation;
}

// all 8 equivalent board states by symmetry and rotation
function equivalentBoards(squares) {
  const s_orig = squares
  const s_flip = [
    [ s_orig[2][0], s_orig[2][1], s_orig[2][2] ], // a a a
    [ s_orig[1][0], s_orig[1][1], s_orig[1][2] ], // - - -
    [ s_orig[0][0], s_orig[0][1], s_orig[0][2] ], // b b b
  ];

  const s_orig_rot90 = [
    [ s_orig[0][0], s_orig[1][0], s_orig[2][0] ], // a a b
    [ s_orig[0][1], s_orig[1][1], s_orig[2][1] ], // * * b
    [ s_orig[0][2], s_orig[1][2], s_orig[2][2] ], // * * *
  ];
  const s_orig_rot180 = [
    [ s_orig[0][0], s_orig[1][0], s_orig[2][0] ], // a a *
    [ s_orig[0][1], s_orig[1][1], s_orig[2][1] ], // * * *
    [ s_orig[0][2], s_orig[1][2], s_orig[2][2] ], // * b b
  ];
  const s_orig_rot270 = [
    [ s_orig[0][0], s_orig[1][0], s_orig[2][0] ], // a a *
    [ s_orig[0][1], s_orig[1][1], s_orig[2][1] ], // b * *
    [ s_orig[0][2], s_orig[1][2], s_orig[2][2] ], // b * *
  ];

  const s_flip_rot90 = [
    [ s_flip[0][0], s_flip[1][0], s_flip[2][0] ], // a a b
    [ s_flip[0][1], s_flip[1][1], s_flip[2][1] ], // * * b
    [ s_flip[0][2], s_flip[1][2], s_flip[2][2] ], // * * *
  ];
  const s_flip_rot180 = [
    [ s_flip[0][0], s_flip[1][0], s_flip[2][0] ], // a a *
    [ s_flip[0][1], s_flip[1][1], s_flip[2][1] ], // * * *
    [ s_flip[0][2], s_flip[1][2], s_flip[2][2] ], // * b b
  ];
  const s_flip_rot270 = [
    [ s_flip[0][0], s_flip[1][0], s_flip[2][0] ], // a a *
    [ s_flip[0][1], s_flip[1][1], s_flip[2][1] ], // b * *
    [ s_flip[0][2], s_flip[1][2], s_flip[2][2] ], // b * *
  ];

  return [
    s_orig, s_orig_rot90, s_orig_rot180, s_orig_rot270,
    s_flip, s_flip_rot90, s_flip_rot180, s_flip_rot270,
  ];
}
