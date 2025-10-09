import PlayerData from "./PlayerData";

export default function PlayerList({ WrapperElement="ol", InnerElement="li", players, ...props }) {
  return (
    <WrapperElement {...props}>
      {Object.values(players).map((player) => (
        <InnerElement key={player.index}>
          <PlayerData player={player} />
        </InnerElement>
      ))}
    </WrapperElement>
  );
}
