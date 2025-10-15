import { useState, use } from "react";
import {StateContext} from "../store/state-context";

export default function PlayerData({ index }) {
    const {playerData, changePlayerName} = use(StateContext);
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(playerData[index].name)

    function handleEditClick(){
        setIsEditing((prev) => !prev);
        if (isEditing){
            changePlayerName(index, playerName);
        }
    }

    let editableName = isEditing ? (
        <input
            type="text"
            onChange={(e) => (setPlayerName(e.target.value))}
            required value={playerName}
            autoFocus={true}
        />
    ) : <span className="player-name">{playerName}</span>;

    let buttonText = isEditing ? "Save" : "Edit";

    return (
        <>
            <span className="player">
                {editableName}
                <span className="player-symbol">{playerData[index].symbol}</span>
            </span>
            <button onClick={handleEditClick}>
                {buttonText}
            </button>
        </>
    );
}
