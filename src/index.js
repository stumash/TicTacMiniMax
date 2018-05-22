import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import { deepCopy } from './utils.js';
import { Board } from './board.js';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        [ [null, null, null], [null, null, null], [null, null, null] ]
      ],
      xIsNext: true
    };
  }

  render() {
    const history = this.state.history;
    const currentSquares = history[history.length - 1];
    const winner = this.detectWinner(currentSquares);

    const moves = history.map((move, moveNumber) => {
      const desc = moveNumber ?
        'Go to move #' + moveNumber :
        'Go to game start';
      return (
        <li>
          <button onClick={() => this.jumpTo(moveNumber)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
        <Board
          squares={currentSquares}
          onClick={(i,j) => this.handleClick(i,j)}
        />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }

  handleClick(i,j) {
    const history = this.state.history;
    const currentSquares = deepCopy(history[history.length - 1]);
    if (currentSquares[i][j] || this.detectWinner(currentSquares)) {
      return;
    }

    currentSquares[i][j] = this.state.xIsNext? 'X': 'O';
    this.setState({ // causes re-render
      history: [...history, currentSquares],
      xIsNext: !this.state.xIsNext,
    });
  }

  detectWinner(squares) {
    const lines = [
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

    let winner;
    for (let line of lines) {
      let xs_and_os = line.map(pos => squares[pos[0]][pos[1]])
      if (xs_and_os.every(x_or_o => x_or_o === 'X')) {
        winner = 'X'; break;
      }
      else if (xs_and_os.every(x_or_o => x_or_o === 'O')) {
        winner = 'O'; break;
      }
    }

    return winner;
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);


