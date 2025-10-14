import { useState } from "react";
import Cell from "./Cell";
import { PLAYERS } from "../data";

function checkLongestSequenceAllDirections(b) {
    const boardSize = b.length;
    const neededToWin = 3 + Math.floor((boardSize - 3) / 2);
    let maxSequence = 0;
    const directions = [
        { dr: 0, dc: 1 },   // Horizontal
        { dr: 1, dc: 0 },   // Vertical
        { dr: 1, dc: 1 },   // Diagonal /
        { dr: 1, dc: -1 }   // Diagonal \
    ];
    const symbols = PLAYERS.map(player => player.symbol);
    for (let symbol of symbols) {
        for (let r = 0; r < boardSize; r++) {
            for (let c = 0; c < boardSize; c++) {
                if (b[r][c] === symbol) {
                    for (let { dr, dc } of directions) {
                        let length = 1;
                        let nr = r + dr;
                        let nc = c + dc;
                        while (length < neededToWin && nr >= 0 && nr < boardSize && nc >= 0 && nc < boardSize && b[nr][nc] === symbol) {
                            length++;
                            nr += dr;
                            nc += dc;
                        }
                        maxSequence = Math.max(maxSequence, length);
                    }
                }
            }
        }
    }
    return maxSequence;
}

function checkWinner(b) {
    const boardSize = b.length;
    const neededToWin = 3 + Math.floor((boardSize - 3) / 2);

    if (checkLongestSequenceAllDirections(b) >= neededToWin) {
        return true;
    }
    return false;
}


export default function GameBoard({ playerData, turnLog, addTurn, undoTurn, resetTurnLog, getCurrentPlayerIndex }) {
    const [boardSize, setBoardSize] = useState(3); // Default board size is 3x3
    // const [board, setBoard] = useState(emptyBoard); // Create 2D array for the board
    
    function constructBoard(){
        const board = Array(boardSize).fill(null);
        board.forEach((a, i) =>{
            board[i] = new Array(boardSize).fill(null)
        })

        turnLog.forEach((turn, index) => {
            board[turn.cell.rowIndex][turn.cell.colIndex] = playerData[turn.playerIndex].symbol;
        })

        // Check for a winner
        return board
    }

    // Construct state (board position from turnLog)
    const board = constructBoard(turnLog, boardSize, playerData);

    function handleCellClick(rowIndex, colIndex, turnLog) {
        // Ignore clicks on occupied cells
        if (board[rowIndex][colIndex] !== null) {
            alert("Cell already occupied");
            return;
        }
        board[rowIndex][colIndex] = playerData[getCurrentPlayerIndex(turnLog)].symbol
        if (checkWinner(board)) {
            alert(`${playerData[getCurrentPlayerIndex(turnLog)].name} wins!`); // Announce the winner
            resetTurnLog(); // Reset the board
            return;
        }

        // Compute the new board state
        addTurn(rowIndex, colIndex);
    }

    

    return (
        <>
            <label id="board-size-label" htmlFor="board-size-input">Board Size (3-8): </label>
            <input id="board-size-input"  type="number" min="3" max="8" value={boardSize} onChange={(e) => {
                const newSize = Math.max(3, Math.min(8, parseInt(e.target.value) || 3));
                setBoardSize(newSize); // Update state with new size
                resetTurnLog(); // Reset board
            }} />
            <ol id="game-board">
                {board.map((row, rowIndex) => (
                    <ol key={rowIndex} className="board-row">
                        {row.map((cell, cellIndex) => (
                            <Cell key={cellIndex} value={cell} clickHandler={() => handleCellClick(rowIndex, cellIndex, turnLog)} />
                        ))}
                    </ol>
                ))}
            </ol>
            <button id="undo-button" onClick={(turnLog) => undoTurn(turnLog)}>Undo turn</button>
        </>
    );
}