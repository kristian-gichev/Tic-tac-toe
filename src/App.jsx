import PlayerList from "./components/PlayerList";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log"
import GameOver from "./components/GameOver";
import {StateContext, StateContextProvider} from "./store/state-context";
import {use} from "react";

export default function App() {
  const {winnerIndex} = use(StateContext);
  return (
    <>
      <main>
        <div id="game-container">
          <PlayerList id="players" className="highlight-player" />
          <GameBoard />
          { winnerIndex !== null ? <GameOver/> : undefined}
        </div>
      </main>
      <Log/>
    </>
  )
};