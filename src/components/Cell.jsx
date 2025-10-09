
export default function Cell({value, clickHandler}){
    return <button className="board-cell" onClick={clickHandler}>{value}</button>;
}