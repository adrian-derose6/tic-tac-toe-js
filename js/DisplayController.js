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

            Events.emit('setPlayers', { currentPlayer: 'player1', player1, player2 });
        }));
    }

    const renderGamegrid = () => {
        gameWrapper.innerHTML = '';
        gameWrapper.appendChild(gameGrid);
        GameBoard.getBoard().forEach((row, rowIndex) => {
            row.forEach((value, colIndex) => {
                gameGrid.appendChild(initializeGridCell(value, rowIndex, colIndex));
            });
        });
    }

    const initializeGridCell = (value, rowIndex, colIndex) => {
        let cell = document.createElement('div');
        let text = document.createElement('h3');

        text.innerText = value;
        cell.className = 'grid-cell';
        cell.setAttribute('data-row', rowIndex);
        cell.setAttribute('data-col', colIndex);
        cell.appendChild(text);
        
        let handleCellClick = event => {
            let value = GameState.getCurrentPlayerSymbol();

            Events.emit('updateCell', { value, rowIndex, colIndex });
            Events.emit('changeTurn');
        }

        cell.addEventListener('click', handleCellClick);

        return cell;
    }

    const updateCell = (cellObj) => {
        let { value, rowIndex, colIndex } = cellObj;
        let oldCell = document.querySelector(`[data-row="${rowIndex}"][data-col="${colIndex}"]`);
        let newCell = oldCell.cloneNode(true);

        newCell.querySelector('h3').innerText = value;
        oldCell.parentNode.replaceChild(newCell, oldCell);
    }

    Events.on('newGameChanged', renderModeSelection);
    Events.on('modeChanged', renderSymSelection);
    Events.on('playersSet', renderGamegrid);
    Events.on('cellUpdated', updateCell);
})();


export default displayController;