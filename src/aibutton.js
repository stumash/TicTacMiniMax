import React from 'react';

export function AiButton(props) {
  return (
    <button onClick={() => props.clickSquare(
      ...bestMove( props.currentSqaures(), props.isTurnX() )
    )}>
      Do Best Next Move
    </button>
  );
}

// All things MiniMax


// map integer representation of board state to win 1 or loss 0 for player X
const boardWins = new Map()

function bestMove(squares, isTurnX) {
  return [0,0];
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
