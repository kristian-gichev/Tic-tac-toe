export default function PlayerData({ player }) {
    return (
        <>
            <span className="player">
                <span className="player-name">{player.name}</span>
                <span className="player-symbol">{player.symbol}</span>
            </span>
            <button>Edit</button>
        </>
    );
}
