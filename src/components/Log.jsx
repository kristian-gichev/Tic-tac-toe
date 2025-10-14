export default function Log({ turnLog, playerData }) {
    return (
        <ol id="log">
            {turnLog.map((turn, index) => <li key={index}>#{turnLog.length - index}. {playerData[turn.playerIndex].name} selected cell ({turn.cell.rowIndex}, {turn.cell.colIndex})</li>)}
        </ol>
    )
}