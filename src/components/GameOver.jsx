import {use} from "react";
import {StateContext} from "../store/state-context";

export default function GameOver() {
    const {winnerIndex, playerData, handleRestart} = use(StateContext);
    return <div id="game-over">
        <h2>Game over!</h2>
        <p>{playerData[winnerIndex].name} wins</p>
        <button onClick={() => handleRestart()}>Rematch</button>
    </div>
}