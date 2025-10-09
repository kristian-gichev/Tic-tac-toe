import { useState } from "react";
import Cell from "./Cell";
import { PLAYERS } from "../data";

function checkLongestSequenceAllDirections(b) {
    const boardSize = b.length;
    let maxSequence = 0;
    const directions = [
        { dr: 0, dc: 1 },   // Horizontal
        { dr: 1, dc: 0 },   // Vertical
        { dr: 1, dc: 1 },   // Diagonal /
        { dr: 1, dc: -1 }   // Diagonal \
    ];

    for (let r = 0; r < boardSize; r++) {
        for (let c = 0; c < boardSize; c++) {
            if (b[r][c] === currentPlayer.symbol) {
                for (let { dr, dc } of directions) {
                    let length = 1;
                    let nr = r + dr;
                    let nc = c + dc;
                    while (nr >= 0 && nr < boardSize && nc >= 0 && nc < boardSize && b[nr][nc] === currentPlayer.symbol) {
                        length++;
                        nr += dr;
                        nc += dc;
                    }
                    maxSequence = Math.max(maxSequence, length);
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
    const neededToWin = 3 + Math.floor((boardSize - 3) / 2);
    const emptyBoard = Array(boardSize).fill(Array(boardSize).fill(null));
    const [board, setBoard] = useState(emptyBoard);
    const [currentPlayer, setCurrentPlayer] = useState(PLAYERS.player1);

    function changePlayer() {
        setCurrentPlayer(currentPlayer === PLAYERS.player1 ? PLAYERS.player2 : PLAYERS.player1);
    }



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
        if (board[rowIndex][cellIndex] !== null) {
            alert("Cell already occupied");
            return;
        }

        const newBoard = updateBoard(rowIndex, cellIndex);

        if (checkWinner(newBoard)) {
            alert(`${currentPlayer.name} wins!`);
            setBoard(emptyBoard);
            changePlayer();
            return;
        }

        changePlayer();
    }

    return (
        <>
            <input type="number" min="3" max="8" value={boardSize} onChange={(e) => {
                const newSize = Math.max(3, Math.min(8, parseInt(e.target.value) || 3));
                setBoardSize(newSize);
                setBoard(Array(newSize).fill(Array(newSize).fill(null)));
                setCurrentPlayer(PLAYERS.player1);
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