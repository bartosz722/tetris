'use strict'

function refreshView() {
    requestAnimationFrame(refreshViewHandler)
}

function refreshViewHandler() {
    redrawField()
    refreshPanel()
}

positionControlPanel()
startTetris()

/* TODO:
- przyciski start, restart
- pokazywanie ułożonej linii (np. miganie)
- new piece: skip empty pixels in the starting definition when centering
- new piece: random rotation?
- game-over: show the last piece (partially cut off) instead of deleting it
- probability of pieces
*/
