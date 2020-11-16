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
            let player1Obj = {
                sym: event.target.value,
                name: 'Player 1'
            }

            let player2Obj = {
                sym: player1Obj.sym === 'X' ? 'O' : 'X',
                name: 'Player 2'
            }
            Events.emit('setPlayers', { player1Obj, player2Obj });
        }));
    }

    const renderGamegrid = () => {
        gameWrapper.innerHTML = '';
        gameWrapper.appendChild(gameGrid);
        GameBoard.getBoard().forEach((row, rowIndex) => {
            row.forEach((value, colIndex) => {
                gameGrid.appendChild(initGridCell({ value, rowIndex, colIndex }));
            });
        });
    }

    const initGridCell = (cellObj) => {
        const { value, rowIndex, colIndex } = cellObj;
        let cell = document.createElement('div');
        let text = document.createElement('h3');

        text.innerText = value;
        cell.className = 'grid-cell';
        cell.setAttribute('data-row', rowIndex);
        cell.setAttribute('data-col', colIndex);
        cell.appendChild(text);

        cell.addEventListener('click', (event) => handleCellClick(event, cellObj));

        return cell;
    }

    const handleCellClick = (event, cellObj) => {
        const symbol = GameState.getCurrentPlayerSymbol();

        Events.emit('updateCell', { ...cellObj, value: symbol });
    }

    const updateGridCell = (cellObj) => {
        let { value, rowIndex, colIndex } = cellObj;
        let oldCell = document.querySelector(`[data-row="${rowIndex}"][data-col="${colIndex}"]`);
        let newCell = oldCell.cloneNode(true);

        newCell.querySelector('h3').innerText = value;
        oldCell.parentNode.replaceChild(newCell, oldCell);
    }

    const renderWinner = (winner) => {
        const winnerText = `${winner.name} is the winner!`;

        gameWrapper.prepend(renderHeading(winnerText));
        document.querySelectorAll('.grid-cell').forEach(cell => {
            let newCell = cell.cloneNode(true);
            cell.parentNode.replaceChild(newCell, cell);
        });
    }

    const renderTie = () => {
        const text = 'Tie Game!';
        gameWrapper.prepend(renderHeading(text));
    }

    const renderHeading = (text) => {
        const heading = document.createElement('h2');
        
        heading.className = 'game-heading';
        heading.innerText = text;

        return heading;
    }

    Events.on('newGameChanged', renderModeSelection);
    Events.on('modeChanged', renderSymSelection);
    Events.on('playersSet', renderGamegrid);
    Events.on('cellUpdated', updateGridCell);
    Events.on('winnerSet', renderWinner);
    Events.on('gameTie', renderTie);
})();


export default displayController;