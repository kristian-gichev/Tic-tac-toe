import { useState } from "react";
import PlayerList from "./components/PlayerList";
import GameBoard from "./components/GameBoard";
import { PLAYERS } from "./data";

export default function App() {
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(1); // Manage turns. Player 1 starts the first game.
  const [playerData, setPlayerData] = useState(PLAYERS);
  const currentPlayer = playerData[currentPlayerIndex];

  // Alternates state between players
  function changePlayer() {
    setCurrentPlayerIndex((currentPlayerIndex) => currentPlayerIndex === 0 ? 1 : 0);
  };

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
           currentPlayerIndex={currentPlayerIndex}
           changePlayerName={changePlayerName}></PlayerList>
          <GameBoard 
          changePlayer={changePlayer} 
          currentPlayer={currentPlayer}
          setCurrentPlayerIndex={setCurrentPlayerIndex}></GameBoard>
        </div>
      </main>
      Move list
    </>
  )
};