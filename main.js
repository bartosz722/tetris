'use strict'

function positionControlPanel() {
    const shiftPx = 20
    const ml = canvas.width / 2
    const cp = document.getElementById('control-panel')
    cp.style.marginLeft = shiftPx + ml + 'px'
}

positionControlPanel()
startTetris()

/* TODO:
- pokaż punkty
- przyciski start, restart
- pokazywanie ułożonej linii (np. miganie)
- new piece: skip empty pixels in the starting definition when centering
- new piece: random rotation?
- game-over: show the last piece (partially cut off) instead of deleting it
- probability of pieces
*/
