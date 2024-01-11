import React from 'react'

const OmokBoard = () => {
   
    const numRows = 15;
    const numCols = 15;
    const initializeBoard = () => {
        const board = [];
        for (let row = 0; row < numRows; row++) {
            const rowArr = [];
            for (let col = 0; col < numCols; col++) {
                rowArr.push(false);
            }
            board.push(rowArr);
        }
        return board;
    }
 
    const omokBoard = initializeBoard();

    return (
        <div className="grid-container">
      {omokBoard.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, colIndex) => (
            <div key={colIndex} className="cell"></div>
          ))}
        </div>
      ))}
    </div>
    )
}

export default OmokBoard