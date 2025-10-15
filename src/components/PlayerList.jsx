import {StateContext} from "../store/state-context";
import PlayerData from "./PlayerData";
import {use} from "react";

export default function PlayerList({ WrapperElement = "ol", InnerElement = "li", ...props }) {
  const { playerData, currentPlayerIndex } = use(StateContext)
  return (
    <WrapperElement {...props}>
      {playerData.map((player, index) => {
        return (
          <InnerElement className={currentPlayerIndex === index ? "active" : undefined} key={index}>
            <PlayerData index={index}/>
          </InnerElement>)
      })}
    </WrapperElement>
  );
}
