'use strict'

const canvas = document.querySelector('#canvas1')
canvas.width = fieldColumns * 20
canvas.height = fieldRows * 20

const ctx = canvas.getContext('2d')

const pixPerBlockX = canvas.width / fieldColumns
const pixPerBlockY = canvas.height / fieldRows

function clearView() {
    ctx.reset()
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function refreshView() {
    console.log('refreshView')
    clearView()
    for (let ri = 0; ri < fieldRows; ri++) {
        for (let ci = 0; ci < fieldColumns; ci++) {
            const color = getFieldColor(ri, ci)
            if (color)
                paintBlock(ri, ci, color)
        }
    }
}

function paintBlock(row, col, color) {
    ctx.fillStyle = color
    ctx.strokeStyle = 'black';
    ctx.rect(col * pixPerBlockX, row * pixPerBlockY, pixPerBlockX, pixPerBlockY)
    ctx.fill()
    ctx.stroke()
}