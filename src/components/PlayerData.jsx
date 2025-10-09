import { useState } from "react";

export default function PlayerData({ player }) {
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(player.name);
    let editableName = isEditing ? (
        <input
            type="text"
            onChange={(e) => (setPlayerName(e.target.value))}
            required value={playerName}
            autoFocus={true}
        />
    ) : <span className="player-name">{playerName}</span>;

    let buttonText = isEditing ? "Save" : "Edit"

    return (
        <>
            <span className="player">
                {editableName}
                <span className="player-symbol">{player.symbol}</span>
            </span>
            <button onClick={() => setIsEditing((prev) => !prev)}>
                {buttonText}
            </button>
        </>
    );
}
