import Events from './events.js';

const NEW_GAME = {
    currentPlayer: null,
    winner: null,
    mode: '',
    score: 0,
    isNewGame: true,
    players: {}
};

const GameState = (() => {
    let state = { ...NEW_GAME };

    const setMode = (mode) => {
        state = { ...state, mode, isNewGame: false };
        Events.emit('modeChanged', state.mode);
    }

    const resetGame = () => {
        state = { ...state, currentPlayer: null, winner: null };
    }

    const setNewGame = () => {
        state = { ...NEW_GAME };
        Events.emit('newGameChanged');
    }

    const isNewGame = () => {
        return state.isNewGame;   
    }
    
    const setPlayers = (playerObj) => {
        state = { ...state, currentPlayer: 'player1', players: playerObj };
        console.log(state)
        Events.emit('playersSet');
    }

    const setCurrentPlayer = (player) => {
        state = { ...state, currentPlayer: player };
    }

    const getCurrentPlayer = () => state.currentPlayer;

    Events.on('setNewGame', setNewGame);
    Events.on('setMode', setMode);
    Events.on('resetGame', resetGame);
    Events.on('setCurrentPlayer', setCurrentPlayer);
    Events.on('setPlayers', setPlayers);

    return {
        getCurrentPlayer,
        setCurrentPlayer,
        isNewGame,
        setNewGame,
        resetGame,
    }
})();

export default GameState;