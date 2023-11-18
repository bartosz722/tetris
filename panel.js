const lineCounterElement = document.getElementById('line-counter')

function positionControlPanel() {
    const shiftPx = 20
    const ml = canvas.width / 2
    const cp = document.getElementById('control-panel')
    cp.style.marginLeft = shiftPx + ml + 'px'
}

function refreshPanel() {
    lineCounterElement.textContent = fullLinesCount
}
