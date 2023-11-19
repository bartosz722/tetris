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
        for (let ci = 0; ci < fieldColumns; ci++) {
            const color = getFieldColor(ri, ci)
            if (color)
                paintBlock1(ri, ci, color)
        }
    }
}

function paintBlock1(row, col, color) {
    ctx.beginPath()
    ctx.fillStyle = color
    ctx.lineWidth = 2
    ctx.strokeStyle = 'black';
    ctx.rect(col * pixPerBlockX, row * pixPerBlockY, pixPerBlockX, pixPerBlockY)
    ctx.fill()
    ctx.stroke()
}

function paintBlock2(row, col, color) {
    ctx.beginPath()
    ctx.fillStyle = 'black'
    ctx.rect(
        col * pixPerBlockX, 
        row * pixPerBlockY, 
        pixPerBlockX, 
        pixPerBlockY)
    ctx.fill()

    const shiftX = pixPerBlockX * lineWidthFactor
    const shiftY = pixPerBlockY * lineWidthFactor
    ctx.beginPath()
    ctx.fillStyle = color
    ctx.rect(
        col * pixPerBlockX + shiftX, 
        row * pixPerBlockY + shiftY, 
        pixPerBlockX - 2 * shiftX, 
        pixPerBlockY - 2 * shiftY)
    ctx.fill()
}