import {StateContext} from "../store/state-context";
import Cell from "./Cell";
import { use } from "react"


export default function GameBoard() {
    const {boardSize, setBoardSize, board, addTurn, resetTurnLog, undoTurn} = use(StateContext);
    function handleCellClick(rowIndex, colIndex) {
        // Schedule a compute of the new board state immutably
        addTurn(rowIndex, colIndex);
    }

    return (
        <>
            <label id="board-size-label" htmlFor="board-size-input">Board Size (3-7): </label>
            <input id="board-size-input" type="number" min="3" max="7" step="2" value={boardSize} onChange={(e) => {
                const newSize = Math.max(3, Math.min(7, parseInt(e.target.value) || 3));
                setBoardSize(newSize); // Update state with new size
                resetTurnLog(); // Reset board
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
            <button id="undo-button" onClick={() => undoTurn()}>Undo turn</button>
        </>
    );
}