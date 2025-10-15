import { useState } from "react";
import PlayerList from "./components/PlayerList";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log"
import GameOver from "./components/GameOver";
import { PLAYERS } from "./data";
import { deriveBoard, deriveCurrentPlayerIndex, deriveWinner } from "./functions";


export default function App() {
  const [turnLog, setTurnLog] = useState([]); // turnLog = [{playerIndex: 0-1, cell:{r: 0-2, c: 0-2}}]
  const [playerData, setPlayerData] = useState(PLAYERS);
  const [boardSize, setBoardSize] = useState(3); // Default board size is 3x3


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

  function handleRestart(){
    resetTurnLog();
  }

  // Code executed on every turn:
  // Derive all pseudo-states
  const board = deriveBoard(turnLog, boardSize, playerData)
  const winnerIndex = deriveWinner(board, turnLog);
  const currentPlayerIndex = deriveCurrentPlayerIndex(turnLog);


  return (
    <>
      <main>
        <div id="game-container">
          <PlayerList id="players" className="highlight-player"
            playerData={playerData}
            currentPlayerIndex={currentPlayerIndex}
            changePlayerName={changePlayerName}></PlayerList>
          <GameBoard
            boardSize={boardSize}
            setBoardSize={setBoardSize}
            board={board}
            addTurn={addTurn}
            undoTurn={undoTurn}
            resetTurnLog={resetTurnLog}></GameBoard>
          {winnerIndex!==null ? 
          <GameOver
          winnerIndex={winnerIndex}
          playerData={playerData}
          handleRestart={handleRestart}
          ></GameOver> : undefined }
        </div>
      </main>
      <Log
        turnLog={turnLog}
        playerData={playerData}></Log>
    </>
  )
};