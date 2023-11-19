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
- przyciski start, restart
- pokazywanie ułożonej linii (np. miganie)
- new piece: skip empty pixels in the starting definition when centering
- new piece: random rotation?
- game-over: show the last piece (partially cut off) instead of deleting it
- probability of pieces
*/
