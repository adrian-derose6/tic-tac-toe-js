import Events from "./events.js";
import GameState from './GameState.js';

const CLEAR_BOARD = [
    ['','',''],
    ['','',''],
    ['','',''],
];

const GameBoard = (() => {
    let board = [ ...CLEAR_BOARD ];

    const getBoard = () => {
        return board;
    }

    const updateCell = (cellObj) => {
        const { value, rowIndex, colIndex } = cellObj;

        if (board[rowIndex][colIndex] == '') {
            board[rowIndex][colIndex] = value;
            Events.emit('cellUpdated', cellObj);
        }
    }

    const clearBoard = () => {
        board = CLEAR_BOARD;
    }

    Events.on('updateCell', updateCell);

    return {
        getBoard,
        updateCell
    }
})();

export default GameBoard;