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
    const symbols = [PLAYERS.player1.symbol, PLAYERS.player2.symbol];
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

export default function GameBoard() {
    const [boardSize, setBoardSize] = useState(3); // Default board size is 3x3
    const emptyBoard = Array(boardSize).fill(Array(boardSize).fill(null));
    const [board, setBoard] = useState(emptyBoard); // Create 2D array for the board
    const [currentPlayer, setCurrentPlayer] = useState(PLAYERS.player1); // Manage turns. Player 1 starts the first game.
    
    // Alternates state between players
    function changePlayer() {
        setCurrentPlayer(currentPlayer === PLAYERS.player1 ? PLAYERS.player2 : PLAYERS.player1);
    }
    
    // Updates the board state immutably
    function updateBoard(r, c) {
        const newBoard = board.map((row, rIdx) =>
            row.map((cell, cIdx) => {
                if (rIdx === r && cIdx === c) {
                    return currentPlayer.symbol;
                }
                return cell;
            })
        );
        setBoard(newBoard);
        return newBoard;
    }

    function handleCellClick(rowIndex, cellIndex) {
        // Ignore clicks on occupied cells
        if (board[rowIndex][cellIndex] !== null) {
            alert("Cell already occupied");
            return;
        }

        // Compute the new board state
        const newBoard = updateBoard(rowIndex, cellIndex);

        // Check for a winner
        if (checkWinner(newBoard)) {
            alert(`${currentPlayer.name} wins!`); // Announce the winner
            setBoard(emptyBoard); // Reset the board
            changePlayer(); // Loser starts next game
            return;
        }

        // Pass the turn to the other player
        changePlayer(); 
    }

    return (
        <>
            <label id="board-size-label" htmlFor="board-size-input">Board Size (3-8): </label>
            <input id="board-size-input"  type="number" min="3" max="8" value={boardSize} onChange={(e) => {
                const newSize = Math.max(3, Math.min(8, parseInt(e.target.value) || 3));
                setBoardSize(newSize); // Update state with new size
                setBoard(Array(newSize).fill(Array(newSize).fill(null))); // Reset board
                setCurrentPlayer(PLAYERS.player1); // Player 1 starts after board size change
            }} />
            <ol id="game-board">
                {board.map((row, rowIndex) => (
                    <ol key={rowIndex} className="board-row">
                        {row.map((cell, cellIndex) => (
                            <Cell key={cellIndex} value={cell} clickHandler={() => handleCellClick(rowIndex, cellIndex)} />
                        ))}
                    </ol>
                ))}
            </ol>
        </>
    );
}