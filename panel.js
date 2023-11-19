// Used modules: tetris.

'use strict'

const lineCounterElement = document.getElementById('line-counter')
const gameOverElement = document.getElementById('game-over')

function refreshPanel() {
    lineCounterElement.textContent = fullLinesCount
    if (gameOver) {
        gameOverElement.removeAttribute('hidden')
    }
}
