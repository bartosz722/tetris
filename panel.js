// Used modules: tetris.

'use strict'

const startButton = document.getElementById('start-button')
const pauseButton = document.getElementById('pause-button')
const pausedTextElement = document.getElementById('paused-text')
const lineCounterElement = document.getElementById('line-counter')
const levelElement = document.getElementById('level')
const gameOverElement = document.getElementById('game-over')

function refreshPanel() {
    if (gameStarted || gameOver) {
        startButton.textContent = 'Restart'
    }

    pauseButton.disabled = !gameStarted
    pauseButton.textContent = gamePaused ? "Resume" : "Pause"
    pausedTextElement.hidden = !gamePaused

    lineCounterElement.textContent = fullLinesCount
    levelElement.textContent = getLevel()
    gameOverElement.style.visibility = gameOver ? 'visible' : 'hidden'
}

function startButtonClicked() {
    startTetris()
    startButton.blur()
}

function pauseButtonClicked() {
    togglePauseTetris()
    pauseButton.blur()
}
