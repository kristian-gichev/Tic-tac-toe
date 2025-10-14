
export default function Cell({value, clickHandler}){
    return <button disabled={value ? true : false} className="board-cell" onClick={clickHandler}>{value}</button>;
}