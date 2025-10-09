import PlayerList from "./components/PlayerList";
import GameBoard from "./components/GameBoard";
import { PLAYERS } from "./data";

export default function App() {
  return (
    <>
      <main>
        <div id="game-container">
          <PlayerList id="players" players={PLAYERS}></PlayerList>
          <GameBoard></GameBoard>
        </div>
      </main>
      Move list
    </>
  )
};