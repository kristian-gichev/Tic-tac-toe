import { useState, createContext } from "react"
import { PLAYERS } from "../data.js"
import { deriveBoard, deriveCurrentPlayerIndex, deriveWinner } from "../functions";

export const StateContext = createContext(
    {
        turnLog: [],
        undoTurn: () => {},
        addTurn: () => {},
        resetTurnLog: () => {},
        boardSize: 0,
        setBoardSize: () => {},
        playerData: [],
        board: [],
        winnerIndex: null,
        currentPlayerIndex: 0,
        handleRestart: () => {},
        changePlayerName: () => {},
    }
);


export function StateContextProvider({ children }) {
    // States
    const [turnLog, setTurnLog] = useState([]); // turnLog = [{playerIndex: 0-1, cell:{r: 0-2, c: 0-2}}]
    const [playerData, setPlayerData] = useState(PLAYERS);
    const [boardSize, setBoardSize] = useState(3); // Default board size is 3x3

    // State management funtions
    function addTurn(rowIndex, colIndex) {
        setTurnLog((prevLog) => {
            const cell = { rowIndex: rowIndex, colIndex: colIndex };
            let playerIndex = 0;
            const lastTurn = prevLog[0];
            if (lastTurn) {
                playerIndex = lastTurn.playerIndex ? 0 : 1
            }
            const newTurn = { playerIndex: playerIndex, cell: cell };
            const newLog = [newTurn, ...prevLog];
            return newLog;
        })
    }

    function undoTurn() {
        setTurnLog((prevLog) => {
            return prevLog.slice(1)
        })
    }

    function resetTurnLog() {
        setTurnLog([]);
    }

    function changePlayerName(index, newName) {
        function newData(prevData) {
            const newData = [...prevData]
            newData[index].name = newName;
            return newData
        }
        setPlayerData((prevData) => newData(prevData));
    };

    function handleRestart() {
        resetTurnLog();
    }

    // Derive all pseudo-states
    const board = deriveBoard(turnLog, boardSize, playerData)
    const winnerIndex = deriveWinner(board, turnLog);
    const currentPlayerIndex = deriveCurrentPlayerIndex(turnLog);

    // Create context that refreshes the whole app.
    const context = {
        turnLog,
        undoTurn,
        addTurn,
        resetTurnLog,
        boardSize,
        setBoardSize,
        playerData,
        board,
        winnerIndex,
        currentPlayerIndex,
        handleRestart,
        changePlayerName
    }
    return (
        <StateContext.Provider value={context}>
            {children}
        </StateContext.Provider>
    )
}