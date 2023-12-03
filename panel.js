// Used modules: tetris.

'use strict'

const startButton = document.getElementById('start-button')
const pauseButton = document.getElementById('pause-button')
const lineCounterElement = document.getElementById('line-counter')
const levelElement = document.getElementById('level')
const gameOverElement = document.getElementById('game-over')

function refreshPanel() {
    if (gameStarted || gameOver) {
        startButton.textContent = 'Restart'
    }
    lineCounterElement.textContent = fullLinesCount
    levelElement.textContent = getLevel()
    gameOverElement.style.visibility = gameOver ? 'visible' : 'hidden'
}

function startOrRestart() {
    startTetris()
    startButton.blur()
}
