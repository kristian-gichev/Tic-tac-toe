import PlayerList from "./components/PlayerList";
import { PLAYERS } from "./data";

export default function App() {
  return (
    <>
      <main>
        <div id="game-container">
          <PlayerList id="players" players={PLAYERS}></PlayerList>
          Game board
        </div>
      </main>
      Move list
    </>
  )
};