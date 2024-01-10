import React from "react";

class OmokBoard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            board: this.initializeBoard(15,15),
            currentPlayer:'X',
            winner:null,
        };
    }

    initializeBoard(rows, cols) {
        const board = [];
        for (let i = 0; i < rows; i++) {
            const row = [];
            for (let j = 0; j < cols; j++) {
                row.push(null);
            }
            board.push(row);
        }
        return board;
    }

    handleClick(rowIndex, colIndex) {
        if(this.state.board[rowIndex][colIndex] === null && !this.state.winner) {
            const updatedBoard = [...this.state.board];
            updatedBoard[rowIndex, colIndex] = this.state.currentPlayer;
            this.setState({
                board: updatedBoard,
                currentPlayer: this.state.currentPlayer === 'X' ? 'O' : 'X'
            });
            this.checkWinner(rowIndex, colIndex);
        }
    }

    checkWinner(row, col) {
        const directions = [
            [-1,0], // Up
            [1, 0], // Down
            [0,-1], // Left
            [0, 1], // Right
            [1,-1], // Diagonal Up-Right
            [-1, -1], // Diagonal Up-Left
            [1,1], // Diagonal Down-Right
            [-1,1], // Diagonal Down-Left
        ]

        for (const [dx, dy] of directions) {
            let count = 1;
            count += this.countInDirection(row, col, dx, dy);
            count += this.countInDirection(row, col, -dx, -dy);

            if (count >= 5) {
                this.setState({winner: this.state.currentPlayer});
                return;
            }
        }
    }

    countInDirection(row, col, dx, dy) {
        const player = this.state.currentPlayer;
        let count = 0;
        let x = row + dx;
        let y = col + dy;

        // increment if piece is within board and the current position's token is the current players
        while (x >= 0 && x < 15 && y >= 0 && y <= 15 && this.state.board[x][y] === player) {
            count++;
            x += dx;
            y += dy;
        }

        return count;
    }

    render () {
        return (
            <div className="board">
                {this.state.board.map((row, rowIndex) => (
                    <div key={rowIndex} className="row">
                        {row.map((cell, colIndex) => (
                            <div 
                                key={colIndex} 
                                className="cell" 
                                onClick={() => this.handleClick(rowIndex, colIndex)}
                            >
                                {cell}
                            </div>
                        ))}
                    </div>
                ))}
                
            </div>    
        );
    }
}

export default OmokBoard;