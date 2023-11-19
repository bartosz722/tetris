// Used modules: all may be used.

'use strict'

function refreshView() {
    requestAnimationFrame(refreshViewHandler)
}

function refreshViewHandler() {
    redrawField()
    refreshPanel()
}

function positionControlPanel() {
    const shiftPx = 20
    const ml = canvas.width / 2
    const cp = document.getElementById('control-panel')
    cp.style.marginLeft = shiftPx + ml + 'px'
}

positionControlPanel()
refreshViewCallback = refreshView
startTetris()

/* TODO:
- restart interval after dropping
- przyciski start, restart
- pokazywanie ułożonej linii (np. miganie)
- probability of pieces
- more pieces
*/
