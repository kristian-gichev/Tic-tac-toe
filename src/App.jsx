import { useState } from "react";
import PlayerList from "./components/PlayerList";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log"
import { PLAYERS } from "./data";

export default function App() {
  const [turnLog, setTurnLog] = useState([]); // turnLog = [{playerIndex: 0-1, cell:{r: 0-2, c: 0-2}}]
  const [playerData, setPlayerData] = useState(PLAYERS);

  function addTurn(rowIndex, colIndex){
    setTurnLog((prevLog) => {
      const cell = {rowIndex: rowIndex, colIndex: colIndex};
      let playerIndex = 0;
      const lastTurn = prevLog[0];
      if (lastTurn){
        playerIndex = lastTurn.playerIndex ? 0 : 1
      }
      const newTurn = {playerIndex: playerIndex, cell: cell};
      const newLog = [newTurn, ...prevLog];
      return newLog;
    })
  }

  function undoTurn(turnLog){
    setTurnLog((prevLog) => {
      return prevLog.slice(1)
    })
  }

  function resetTurnLog(){
    setTurnLog([])
  }

  function getCurrentPlayerIndex(turnLog){
    let playerIndex = 0;
    const lastTurn = turnLog[0];
    if (lastTurn){
      playerIndex = lastTurn.playerIndex ? 0 : 1
    }
    return playerIndex
  }



  function changePlayerName(index, newName){
    function newData(prevData){
      const newData = [...prevData]
      newData[index].name = newName;
      return newData
    }
    setPlayerData((prevData) => newData(prevData));
  };

  return (
    <>
      <main>
        <div id="game-container">
          <PlayerList id="players" className="highlight-player"
            playerData={playerData}
            turnLog={turnLog}
            getCurrentPlayerIndex={getCurrentPlayerIndex}
            changePlayerName={changePlayerName}></PlayerList>
          <GameBoard 
            playerData={playerData}
            turnLog={turnLog}
            addTurn={addTurn}
            undoTurn={undoTurn}
            resetTurnLog={resetTurnLog}
            getCurrentPlayerIndex={getCurrentPlayerIndex}></GameBoard>
        </div>
      </main>
      <Log 
        turnLog={turnLog}
        playerData={playerData}></Log>
    </>
  )
};