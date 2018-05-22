import React from 'react';

import { Square } from './square.js';

class Board extends React.Component {
  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0,0)}
          {this.renderSquare(0,1)}
          {this.renderSquare(0,2)}
        </div>
        <div className="board-row">
          {this.renderSquare(1,0)}
          {this.renderSquare(1,1)}
          {this.renderSquare(1,2)}
        </div>
        <div className="board-row">
          {this.renderSquare(2,0)}
          {this.renderSquare(2,1)}
          {this.renderSquare(2,2)}
        </div>
      </div>
    );
  }

  renderSquare(i,j) {
    return (
        <Square
          value={this.props.squares[i][j]}
          onClick={() => this.props.onClick(i,j)}
        />
    );
  }
}

export { Board };
