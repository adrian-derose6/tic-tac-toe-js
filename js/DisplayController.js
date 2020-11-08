import Events from './events.js';
import GameState from './GameState.js';
import GameBoard from './GameBoard.js';

const displayController = (() => {
    const gameWrapper = document.querySelector('.game-wrapper');
    const modeSelection = document.getElementById('mode-selection-wrapper');
    const symSelection = document.getElementById('sym-selection-wrapper');
    const symButtons = [...document.getElementsByClassName('sym-button')];
    const gameGrid = document.getElementById('game-grid');

    const renderModeSelection = () => {
        gameWrapper.innerHTML = '';
        gameWrapper.appendChild(modeSelection);
        modeSelection.querySelectorAll('button').forEach(button => {
            button.addEventListener('click', (event) => {
                Events.emit('setMode', event.target.dataset.mode);
            }); 
        });
    }

    const renderSymSelection = () => {
        gameWrapper.innerHTML = '';
        gameWrapper.appendChild(symSelection);
        symButtons.forEach((button) => button.addEventListener('click', (event) => {
            let player1 = event.target.value;
            let player2 = player1 === 'X' ? 'O' : 'X';

            Events.emit('setPlayers', { player1, player2 });
        }));
    }

    const renderGamegrid = () => {
        gameWrapper.innerHTML = '';
        gameWrapper.appendChild(gameGrid);
    }

    Events.on('newGameChanged', renderModeSelection);
    Events.on('modeChanged', renderSymSelection);
    Events.on('playersSet', renderGamegrid);
})();


export default displayController;