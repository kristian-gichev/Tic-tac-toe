export default function GameOver({resetTurnLog, winnerIndex, setWinnerIndex, playerData, turnLog}) {
    return <div id="game-over">
        <h2>Game over!</h2>
        <p>{playerData[winnerIndex].name} wins</p>
        <button onClick={() => {
            setWinnerIndex(null);
            resetTurnLog();
            return;
        }}>Rematch</button>
    </div>
}