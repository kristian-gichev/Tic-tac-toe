export default function Log({turnLog, playerData}){
    return (
        <ol id="log">
            {turnLog.forEach((turn, index) => {
                return <li>#{index}. Cell:({turn.cell.rowIndex}, {turn.cell.colIndex}), Player:{playerData[turn.playerIndex].name}</li>
            })}
        </ol>
    )
}