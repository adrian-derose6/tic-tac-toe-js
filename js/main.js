import GameBoard from './GameBoard.js'
import GameState from './GameState.js';
import displayController from './DisplayController.js';
import Player from './Player.js';
import Events from './events.js';


function initGame() {
    if (GameState.isNewGame()) {
        Events.emit('newGameSet');
    }
}

initGame();