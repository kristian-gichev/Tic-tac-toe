import { useState } from "react";

export default function PlayerData({ index, playerData, changePlayerName }) {
    const [isEditing, setIsEditing] = useState(false);
    let editableName = isEditing ? (
        <input
            type="text"
            onChange={(e) => (changePlayerName(index, e.target.value))}
            required value={playerData[index].name}
            autoFocus={true}
        />
    ) : <span className="player-name">{playerData[index].name}</span>;

    let buttonText = isEditing ? "Save" : "Edit";

    return (
        <>
            <span className="player">
                {editableName}
                <span className="player-symbol">{playerData[index].symbol}</span>
            </span>
            <button onClick={() => setIsEditing((prev) => !prev)}>
                {buttonText}
            </button>
        </>
    );
}
