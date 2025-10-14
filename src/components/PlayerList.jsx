import PlayerData from "./PlayerData";

export default function PlayerList({ turnLog, playerData, deriveCurrentPlayerIndex, changePlayerName, WrapperElement = "ol", InnerElement = "li", ...props }) {
  return (
    <WrapperElement {...props}>
      {playerData.map((player, index) => {
        return (
          <InnerElement className={deriveCurrentPlayerIndex(turnLog) === index ? "active" : undefined} key={index}>
            <PlayerData playerData={playerData} index={index} changePlayerName={changePlayerName} />
          </InnerElement>)
      })}
    </WrapperElement>
  );
}
