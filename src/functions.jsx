import { PLAYERS } from "./data";

export function deriveCurrentPlayerIndex(turnLog) {
    let playerIndex = 0;
    const lastTurn = turnLog[0];
    if (lastTurn) {
        playerIndex = lastTurn.playerIndex ? 0 : 1
    }
    return playerIndex
}

export function deriveWinner(b, turnLog) {
    const boardSize = b.length;
    const neededToWin = 3 + Math.floor((boardSize - 3) / 2);

    if (checkLongestSequenceAllDirections(b) >= neededToWin) {
        return deriveCurrentPlayerIndex(turnLog.slice(1));
    }
    if (b.forEach((r) => r.forEach((c) => c !== null))) {
        return -1
    }
    return null;
}

export function deriveBoard(turnLog, boardSize, playerData) {
    const board = Array(boardSize).fill(null);
    board.forEach((a, i) => {
        board[i] = new Array(boardSize).fill(null)
    })

    turnLog.forEach((turn, index) => {
        board[turn.cell.rowIndex][turn.cell.colIndex] = playerData[turn.playerIndex].symbol;
    })

    return board
}


export function checkLongestSequenceAllDirections(b) {
    const boardSize = b.length;
    const neededToWin = 3 + Math.floor((boardSize - 3) / 2);
    let maxSequence = 0;
    const directions = [
        { dr: 0, dc: 1 },   // Horizontal
        { dr: 1, dc: 0 },   // Vertical
        { dr: 1, dc: 1 },   // Diagonal /
        { dr: 1, dc: -1 }   // Diagonal \
    ];
    const symbols = PLAYERS.map(player => player.symbol);
    for (let symbol of symbols) {
        for (let r = 0; r < boardSize; r++) {
            for (let c = 0; c < boardSize; c++) {
                if (b[r][c] === symbol) {
                    for (let { dr, dc } of directions) {
                        let length = 1;
                        let nr = r + dr;
                        let nc = c + dc;
                        while (length < neededToWin && nr >= 0 && nr < boardSize && nc >= 0 && nc < boardSize && b[nr][nc] === symbol) {
                            length++;
                            nr += dr;
                            nc += dc;
                        }
                        maxSequence = Math.max(maxSequence, length);
                    }
                }
            }
        }
    }
    return maxSequence;
}