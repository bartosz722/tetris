'use strict'

const fieldRows = 20
const fieldColumns = 15
const moveDownInterval = 1000 // ms

let gameRunning = false
let points = 0
let field // Array of arrays with color name or null.
let currPiece

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

// Check if the piece collides with the dropped ones or moves out of field (excluding the top).
function pieceCollides(piece, moreShiftRow, moreShiftCol) {
    // TODO
    return piece.shiftRow >= fieldRows
}

function rotatePiece(piece, left) {
    len = piece.def.blocks.length
    if (left) {
        piece.rotateIdx--
        if (piece.rotateIdx < 0) {
            piece.rotateIdx = len - 1
        }
    }
    else {
        piece.rotateIdx++
        if (piece.rotateIdx >= len) {
            piece.rotateIdx = 0
        }
    }
}

function startTetris() {
    points = 0
    field = Array(fieldRows).fill(Array(fieldColumns).fill(null))
    putNewPiece()
    gameRunning = true
    refreshView()
    setInterval(movePieceDown, moveDownInterval)
}

function putNewPiece() {
    const defIdx = getRandomInt(pieceDefs.length)
    currPiece = { // TODO position top center, random rotation?
        def: pieceDefs[defIdx],
        shiftRow: 0,
        shiftCol: 0,
        rotateIdx: 0,
    }
    console.log('New piece: defIdx', defIdx)
}

function setupKeyEvents() {
    document.addEventListener("keydown", handleKeyDown);
}

function handleKeyDown(e) {
    console.log(e.code)
    if (e.code == 'ArrowRight') {
        movePieceOnSide(true)
    }
    else if (e.code == 'ArrowLeft') {
        movePieceOnSide(false)
    }
    else if (e.code == 'ArrowUp') {
        rotatePiece(true)
    }
    else if (e.code == 'ArrowDown') {
        movePieceDown()
    }
    else if (e.code == 'Space') {
    }
}

// Move the piece if possible
function movePieceOnSide(right) {
    const shift = right ? 1 : -1
    if (gameRunning && !pieceCollides(currPiece, 0, shift)) {
        currPiece.shiftCol += shift
        refreshView()        
    }
}

function rotatePiece(right) {
    if (gameRunning) {
        // TODO: check if collides, rotate
        refreshView()        
    }
}

function movePieceDown() {
    if (gameRunning) {
        if (pieceCollides(currPiece, 1, 0)) {
            // TODO: drop and create new piece
            putNewPiece()
        }
        else {
            currPiece.shiftRow += 1
        }
        refreshView()
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
