import Events from "./events.js";
import GameState from './GameState.js';

const GameBoard = (() => {
    let board = [];
    let counters = {
        X: 0,
        O: 0
    };

    const getBoard = () => {
        return board;
    }

    const updateCell = (cellObj) => {
        const { value, rowIndex, colIndex } = cellObj;

        if (board[rowIndex][colIndex] === '') {
            board[rowIndex][colIndex] = value;
            counters[value]++;

            Events.emit('cellUpdated', cellObj);
        }
    }

    const checkForWin = (cellObj) => {
        const { value, rowIndex, colIndex } = cellObj;

        if (counters[value] >= 3) {
            if (checkRow(value, rowIndex) || checkCol(value, colIndex) || checkDiagonal(value, rowIndex, colIndex)) {
                Events.emit('playerWon');
            }
            else if (checkForTie()) {
                Events.emit('gameTie');
            }
        }

        Events.emit('changeTurn');
    }

    const checkRow = (val, row) => {
        return board[row].every(item => item == val);
    }

    const checkCol = (val, col) => {
        return board.every(row => row[col] == val);
    }

    const checkDiagonal = (val, row, col) => {
        const leftRight = () => board.every((row, index) => row[index] == val);
        const rightLeft = () => board[0][2] == board[1][1] && 
                                board[0][2] == board[2][0] &&
                                board[1][1] == board[2][0];

        if (row == col && row == 1 && col == 1) {
            return leftRight() || rightLeft();
        }
        else if (row == col) {
            return leftRight();
        }
        else if (Math.abs(row - col) == 2){
            return rightLeft();
        }
        else return false;
    }

    const checkForTie = () => {
        return counters.X + counters.O == 9 && GameState.getWinner() === '';
    }

    const clearBoard = () => {
        board = new Array(3).fill('').map(() => new Array(3).fill(''));
        counters = { X: 0, Y: 0};

        Events.emit('boardCleared');
    }

    Events.on('updateCell', updateCell);
    Events.on('updateCell', checkForWin);
    Events.on('updateCell', checkForTie);
    Events.on('newGameSet', clearBoard);
    Events.on('gameReset', clearBoard);

    return {
        getBoard,
        updateCell
    }
})();

export default GameBoard;