import { useState } from "react";

export default function PlayerData({ player }) {
    const [name, setName] = useState(player.name);
    const [isEditing, setIsEditing] = useState(false);

    return (
        <>
            <span className="player">
                <span className="player-name">{isEditing ? (
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                ) : name}</span>
                <span className="player-symbol">{player.symbol}</span>
            </span>
            <button onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? "Save" : "Edit"}
            </button>
        </>
    );
}
