import Events from './events.js';

const NEW_GAME = {
    winner: '',
    mode: '',
    score: 0,
    isNewGame: true,
    currentPlayer: 'player1',
    player1: {},
    player2: {}
};

const GameState = (() => {
    let state = { ...NEW_GAME };

    const setMode = (mode) => {
        state = { ...state, mode, isNewGame: false };
        Events.emit('modeChanged', state.mode);
    }

    const resetGame = () => {
        state = { ...state, currentPlayer: 'player1', winner: '' };
        Events.emit('gameReset')
    }

    const setNewGame = () => {
        state = { ...NEW_GAME };
        Events.emit('newGameSet');
    }

    const isNewGame = () => {
        return state.isNewGame;   
    }
    
    const setPlayers = (playersObj) => {
        const { player1Obj, player2Obj } = playersObj;

        state = { 
            ...state,  
            player1: { ...player1Obj },
            player2: { ...player2Obj }
        };

        Events.emit('playersSet');
    }

    const changeTurn = () => {
        let newPlayer = state.currentPlayer === 'player1' ? 'player2' : 'player1';

        state = { ...state, currentPlayer: newPlayer }
    }

    const setWinner = () => {
        state.winner = state.currentPlayer;

        Events.emit('winnerSet', state[state.winner]);
    }
    
    const getWinner = () => {
        return state.winner;
    }

    const getCurrentPlayer = () => state[state.currentPlayer];

    const getCurrentPlayerSymbol = () => state[state.currentPlayer].sym;

    Events.on('setNewGame', setNewGame);
    Events.on('setMode', setMode);
    Events.on('resetGame', resetGame);
    Events.on('setPlayers', setPlayers);
    Events.on('changeTurn', changeTurn);
    Events.on('playerWon', setWinner);

    return {
        getCurrentPlayer,
        getCurrentPlayerSymbol,
        getWinner,
        isNewGame,
        setNewGame,
        resetGame,
    }
})();

export default GameState;