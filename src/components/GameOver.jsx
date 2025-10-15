export default function GameOver({winnerIndex, playerData, handleRestart}) {
    return <div id="game-over">
        <h2>Game over!</h2>
        <p>{playerData[winnerIndex].name} wins</p>
        <button onClick={() => handleRestart()}>Rematch</button>
    </div>
}