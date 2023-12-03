// Used modules: tetris.

'use strict'

const lineCounterElement = document.getElementById('line-counter')
const levelElement = document.getElementById('level')
const gameOverElement = document.getElementById('game-over')

function refreshPanel() {
    lineCounterElement.textContent = fullLinesCount
    levelElement.textContent = getLevel()
    if (gameOver) {
        gameOverElement.style.visibility = 'visible'
    }
}
