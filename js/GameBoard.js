import Events from "./events.js";
import GameState from './GameState.js';

const CLEAR_BOARD = [
    ['','',''],
    ['','',''],
    ['','',''],
];

const GameBoard = (() => {
    let board = [ ...CLEAR_BOARD ];
    let counters = {
        X: 0,
        O: 0
    };

    const getBoard = () => {
        return board;
    }

    const updateCell = (cellObj) => {
        const { value, rowIndex, colIndex } = cellObj;

        if (board[rowIndex][colIndex] == '') {
            board[rowIndex][colIndex] = value;
            counters[value]++;

            Events.emit('cellUpdated', cellObj);
        }
    }

    const checkForWin = (cellObj) => {
        let { value, rowIndex, colIndex } = cellObj;

        if (counters[value] >= 3) {
            if (checkRow(value, rowIndex) || checkCol(value, colIndex)) {
                console.log('winner!');
            }
        }
    }

    const checkRow = (val, row) => {
        return board[row].every(item => item === val);
    }

    const checkCol = (val, col) => {
        return board.every(row => row[col] === val);
    }

    const checkDiagonal = (val) => {
        let leftRight = () => board.every((row, index) => row[index] == val);
        
    }

    const clearBoard = () => {
        board = CLEAR_BOARD;
    }

    Events.on('updateCell', updateCell);
    Events.on('updateCell', checkForWin);

    return {
        getBoard,
        updateCell
    }
})();

export default GameBoard;