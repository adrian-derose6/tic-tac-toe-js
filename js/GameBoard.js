const CLEAR_BOARD = [
    ['','',''],
    ['','',''],
    ['','',''],
];

const GameBoard = (() => {
    let board = [
        ['X','X','O'],
        ['X','X','O'],
        ['X','X','O']
    ];

    const getBoard = () => {
        return board;
    }

    const setBoard = (row, col, val) => {
        board[row][col] = val;
    }

    const clearBoard = () => {
        board = CLEAR_BOARD;
    }

    return {
        getBoard,
        setBoard
    }
})();

export default GameBoard;