'use strict'

const fieldRows = 20
const fieldColumns = 15
const moveDownInterval = 1000 // ms

let gameRunning = false
let field // Array of arrays with color name or null.
let currPiece
let pieceCount = 0
let fullLinesCount = 0

const colors = ['red', 'green', 'yellow', 'violet']

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
    {
        color: colors[3],
        blocks: [
            [
                [1, 1],
                [1, 1],
            ],
        ]
    },
]

function signalRefreshView() {
    refreshView()
}

// Check if the piece collides with the dropped ones or moves out of the field.
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
                    return true // Outside field.
                }
                if (field[rowPos][colPos]) {
                    return true // Collision with the dropped pieces.
                }
            }
        }
    }
    return false
}

function startTetris() {
    fullLinesCount = 0
    clearField()
    gameRunning = true
    putNewPiece()
    signalRefreshView()
    setInterval(movePieceDown, moveDownInterval)
}

function clearField() {
    field = []
    for (let r = 0; r < fieldRows; r++) {
        field.push(createArrayWithValues(fieldColumns))
    }
}

function putNewPiece() {
    const defIdx = getRandomInt(pieceDefs.length)
    currPiece = {
        def: pieceDefs[defIdx],
        shiftRow: 0,
        shiftCol: 0,
        rotateIdx: 0,
    }
    setShiftColForNewPiece()
    
    if (checkGameOver()) {
        return
    }

    pieceCount += 1
    console.log(`New piece: count ${pieceCount}, defIdx ${defIdx}`)
}

function setShiftColForNewPiece() {
    const blocks = getCurrPieceBlocks()
    const cols = blocks[0].length
    const shift = Math.floor((fieldColumns - cols) / 2)
    currPiece.shiftCol = shift
}

function getCurrPieceBlocks() {
    return currPiece.def.blocks[currPiece.rotateIdx]
}

function checkGameOver() {
    if (pieceCollides(currPiece, 0, 0)) {
        gameRunning = false
        currPiece = null
        console.log(`Game over! Lines: ${fullLinesCount}`)
        return true
    }
    return false
}

function setupKeyEvents() {
    document.addEventListener("keydown", handleKeyDown);
}

function handleKeyDown(e) {
    // console.log(e.code)
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
        signalRefreshView()        
    }
}

function tryRotatePiece(right) {
    if (gameRunning) {
        const newRotateIdx = getNextRotateIdx(currPiece, right)
        if (!pieceCollides(currPiece, 0, 0, newRotateIdx)) {
            currPiece.rotateIdx = newRotateIdx
            signalRefreshView()        
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
        signalRefreshView()
    }
}

function dropPiece() {
    if (gameRunning) {
        for (let shift = 1; shift <= fieldRows; shift++) {
            if (pieceCollides(currPiece, shift, 0)) {
                currPiece.shiftRow += shift - 1
                settlePiece()
                eatFullLines()
                putNewPiece()
                signalRefreshView()
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
                }
            }
        }
    }
}

// Get the color using the the current and dropped pieces.
// Returns string or null.
function getFieldColor(row, col) {
    if (row < 0 || row >= fieldRows) throw `Row out of range: ${row}`
    if (col < 0 || col >= fieldColumns) throw `Column out of range: ${col}`
    
    if (currPiece) {
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
    }

    return field[row][col]
}

function eatFullLines() {
    let rowIdx = fieldRows - 1
    while (rowIdx >=0) {
        const row = field[rowIdx]
        if (row.every(c => c != null)) {
            eatFullLine(rowIdx)
            fullLinesCount++
            console.log(`Full line at row ${rowIdx}. Total: ${fullLinesCount}`)
        }
        else {
            rowIdx--
        }
    }
}

function eatFullLine(rowIdx) {
    for (; rowIdx > 0; rowIdx--) {
        field[rowIdx] = field[rowIdx - 1]
    }
    field[0] = createArrayWithValues(fieldColumns)
}

setupKeyEvents()
