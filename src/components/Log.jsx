import {use} from "react";
import {StateContext} from "../store/state-context";

export default function Log() {
    const { turnLog, playerData } = use(StateContext);
    return (
        <ol id="log">
            {turnLog.map((turn, index) => <li key={index}>#{turnLog.length - index}. {playerData[turn.playerIndex].name} selected cell ({turn.cell.rowIndex}, {turn.cell.colIndex})</li>)}
        </ol>
    )
}