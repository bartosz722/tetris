// Used modules: tetris.

'use strict'

const canvas = document.querySelector('#canvas1')
canvas.width = fieldColumns * 20
canvas.height = fieldRows * 20

const ctx = canvas.getContext('2d')

const pixPerBlockX = canvas.width / fieldColumns
const pixPerBlockY = canvas.height / fieldRows
const lineWidthFactor = 0.1

function clearView() {
    ctx.reset()
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function redrawField() {
    clearView()
    for (let ri = 0; ri < fieldRows; ri++) {
        const fullLine = isFullLineInRow(ri)
        const borderColor = fullLine ? 'green' : 'black'
        for (let ci = 0; ci < fieldColumns; ci++) {
            const fillColor = fullLine ? 'white' : getFieldColor(ri, ci)
            if (fillColor)
                paintBlock(ri, ci, fillColor, borderColor)
        }
    }

    // Draw a vertical line in the field center.
    // ctx.beginPath()
    // ctx.strokeStyle = 'grey';
    // ctx.moveTo(canvas.width / 2, 0)
    // ctx.lineTo(canvas.width / 2, canvas.height)
    // ctx.stroke()
}

function paintBlock(row, col, fillColor, borderColor) {
    ctx.beginPath()
    ctx.fillStyle = fillColor
    ctx.lineWidth = 2
    ctx.strokeStyle = borderColor;
    ctx.rect(col * pixPerBlockX, row * pixPerBlockY, pixPerBlockX, pixPerBlockY)
    ctx.fill()
    ctx.stroke()
}
