import Events from './events.js';

const NEW_GAME = {
    winner: null,
    mode: '',
    score: 0,
    isNewGame: true,
    players: {
        currentPlayer: '',
        player1: '',
        player2: ''
    }
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
        state = { ...state, players: { ...playerObj }};
        Events.emit('playersSet', state.players);
    }

    const setCurrentPlayer = (player) => {
        state = { ...state, players: { ...state.players, currentPlayer: player }};
    }

    const getCurrentPlayer = () => state.players.currentPlayer;

    const getCurrentPlayerSymbol = () => state.players[state.players.currentPlayer];

    Events.on('setNewGame', setNewGame);
    Events.on('setMode', setMode);
    Events.on('resetGame', resetGame);
    Events.on('setCurrentPlayer', setCurrentPlayer);
    Events.on('setPlayers', setPlayers);

    return {
        getCurrentPlayer,
        setCurrentPlayer,
        getCurrentPlayerSymbol,
        isNewGame,
        setNewGame,
        resetGame,
    }
})();

export default GameState;