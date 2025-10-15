import { useState } from "react";

export default function PlayerData({ index, playerData, changePlayerName }) {
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
