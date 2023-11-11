'use strict'

const fieldRows = 20
const fieldColumns = 15
const moveDownInterval = 1000 // ms

let gameRunning = false
let points = 0
let field // Array of arrays with color name or null.
let currPiece
let pieceCount = 0

const colors = ['red', 'green', 'yellow', 'lightblue']

const pieceDefs = [
    {
        color: colors[0],
        blocks: [
            [
                [0, 0, 0],
                [1, 1, 1],
                [0, 1, 0],
            ],
            [
                [0, 1, 0],
                [1, 1, 0],
                [0, 1, 0],
            ],
            [
                [0, 1, 0],
                [1, 1, 1],
                [0, 0, 0],
            ],
            [
                [0, 1, 0],
                [0, 1, 1],
                [0, 1, 0],
            ],
        ],
    },
    {
        color: colors[1],
        blocks: [
            [
                [1, 1, 0],
                [0, 1, 1],
                [0, 0, 0],
            ],
            [
                [0, 1, 0],
                [1, 1, 0],
                [1, 0, 0],
            ],
        ],
    },
    {
        color: colors[2],
        blocks: [
            [
                [0, 0, 0, 0],
                [1, 1, 1, 1],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ],
            [
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0],
            ],
        ],
    },
]

// Check if the piece collides with the dropped ones or moves out of field.
// moreShiftRow, moreShiftCol - number (0 - no shift)
// newRotateIdx - wanted index or undefined
function pieceCollides(piece, moreShiftRow, moreShiftCol, newRotateIdx) {
    const rotateIdx = newRotateIdx ?? piece.rotateIdx
    const rows = piece.def.blocks[rotateIdx]
    for (let rowIdx = 0; rowIdx < rows.length; rowIdx++ ) {
        const row = rows[rowIdx]
        for (let colIdx = 0; colIdx < row.length; colIdx++) {
            const pix = row[colIdx]
            if (pix) {
                const rowPos = rowIdx + piece.shiftRow + moreShiftRow
                const colPos = colIdx + piece.shiftCol + moreShiftCol
                if (rowPos < 0 || rowPos >= fieldRows || colPos < 0 || colPos >= fieldColumns) {
                    console.log('Piece outside field')
                    return true // Outside field.
                }
                if (field[rowPos][colPos]) {
                    console.log('Piece collides with dropped ones')
                    return true // Collision with the dropped pieces.
                }
            }
        }
    }
    return false
}

function startTetris() {
    points = 0
    clearField()
    putNewPiece()
    gameRunning = true
    refreshView()
    setInterval(movePieceDown, moveDownInterval)
}

function clearField() {
    field = []
    for (let r = 0; r < fieldRows; r++) {
        const row = []
        field.push(row)
        for (let c = 0; c < fieldColumns; c++) {
            row.push(null)
        }
    }
}

function putNewPiece() {
    const defIdx = getRandomInt(pieceDefs.length)
    currPiece = { // TODO position top center, random rotation?
        def: pieceDefs[defIdx],
        shiftRow: 0,
        shiftCol: 0,
        rotateIdx: 0,
    }
    pieceCount += 1
    console.log(`New piece: count ${pieceCount}, defIdx ${defIdx}`)
}

function setupKeyEvents() {
    document.addEventListener("keydown", handleKeyDown);
}

function handleKeyDown(e) {
    console.log(e.code)
    if (e.code == 'ArrowRight') {
        tryMovePieceOnSide(true)
    }
    else if (e.code == 'ArrowLeft') {
        tryMovePieceOnSide(false)
    }
    else if (e.code == 'ArrowUp') {
        tryRotatePiece(true)
    }
    else if (e.code == 'ArrowDown') {
        movePieceDown()
    }
    else if (e.code == 'Space') {
        dropPiece()
    }
}

// Move the piece if possible
function tryMovePieceOnSide(right) {
    const shift = right ? 1 : -1
    if (gameRunning && !pieceCollides(currPiece, 0, shift)) {
        currPiece.shiftCol += shift
        refreshView()        
    }
}

function tryRotatePiece(right) {
    if (gameRunning) {
        const newRotateIdx = getNextRotateIdx(currPiece, right)
        if (!pieceCollides(currPiece, 0, 0, newRotateIdx)) {
            currPiece.rotateIdx = newRotateIdx
            refreshView()        
        }
    }
}

function getNextRotateIdx(piece, right) {
    let nextIdx = piece.rotateIdx + (right ? 1 : -1)
    const len = piece.def.blocks.length
    if (nextIdx >= len) {
        nextIdx = 0
    }
    else if (nextIdx < 0) {
        nextIdx = len - 1
    }
    return nextIdx
}

function movePieceDown() {
    if (gameRunning) {
        if (pieceCollides(currPiece, 1, 0)) {
            settlePiece()
            putNewPiece()
        }
        else {
            currPiece.shiftRow += 1
        }
        refreshView()
    }
}

function dropPiece() {
    if (gameRunning) {
        for (let shift = 1; shift <= fieldRows; shift++) {
            if (pieceCollides(currPiece, shift, 0)) {
                currPiece.shiftRow += shift - 1
                settlePiece()
                putNewPiece()
                refreshView()
                return
            }
        }
        throw 'Piece not settled'
    }
}

function settlePiece() {
    const rows = currPiece.def.blocks[currPiece.rotateIdx]
    for (let rowIdx = 0; rowIdx < rows.length; rowIdx++) {
        const row = rows[rowIdx]
        for (let colIdx = 0; colIdx < row.length; colIdx++) {
            const pix = row[colIdx]
            if (pix) {
                const dstRow = rowIdx + currPiece.shiftRow
                const dstCol = colIdx + currPiece.shiftCol
                if (dstRow >= 0 && dstRow < fieldRows && dstCol >= 0 && dstCol < fieldColumns) {
                    field[dstRow][dstCol] = currPiece.def.color
                    console.log(`Settle color ${currPiece.def.color} in row ${dstRow} col ${dstCol}`)
                }
            }
        }
    }
}

// Get the color using the the current and dropped pieces.
// Returns string or null.
function getFieldColor(row, col) {
    if (row < 0 || row >= fieldRows) throw `Row out of range: ${row}`
    if (col < 0 || col >= fieldRows) throw `Column out of range: ${col}`
    
    const pRowIdx = row - currPiece.shiftRow
    const pieceRows = currPiece.def.blocks[currPiece.rotateIdx]
    if (pRowIdx >= 0 && pRowIdx < pieceRows.length) {
        const pieceCols = pieceRows[pRowIdx]
        const pColIdx = col - currPiece.shiftCol
        if (pColIdx >= 0 && pColIdx < pieceCols.length) {
            if (pieceCols[pColIdx]) {
                return currPiece.def.color
            }
        }
    }

    return field[row][col]
}

setupKeyEvents()
