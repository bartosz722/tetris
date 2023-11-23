// Used modules: pieces.

'use strict'

const fieldRows = 20
const fieldColumns = 15
const moveDownInterval = 1000 // ms
const centerColumn = getCenterColumn()

let refreshViewCallback // Must be set before the game is started.
let gameRunning = false
let gameOver = false
let field // Array of arrays with color name or null.
let currPiece
let pieceCount = 0
let fullLinesCount = 0
let movePieceDownTimeoutId = 0

// Check if the piece collides with the dropped ones or moves out of the field.
// moreShiftRow, moreShiftCol - number (0 - no shift)
// newRotateIdx - wanted index or undefined or null
// allowOverTop - true or falsy
function pieceCollides(piece, moreShiftRow, moreShiftCol, newRotateIdx, allowOverTop) {
    const rotateIdx = newRotateIdx ?? piece.rotateIdx
    const rows = piece.def.blocks[rotateIdx]
    for (let rowIdx = 0; rowIdx < rows.length; rowIdx++ ) {
        const row = rows[rowIdx]
        for (let colIdx = 0; colIdx < row.length; colIdx++) {
            const pix = row[colIdx]
            if (pix) {
                const rowPos = rowIdx + piece.shiftRow + moreShiftRow
                const colPos = colIdx + piece.shiftCol + moreShiftCol
                if (allowOverTop && rowPos < 0) {
                    continue
                }
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

// Center when column number is even: column_count / 2 - 1
// Center when column number is odd: floor(column_count / 2)
function getCenterColumn() {
    if (fieldColumns % 2 == 0) {
        return fieldColumns / 2 - 1
    }
    else {
        return Math.floor(fieldColumns / 2)
    }
}

function startTetris() {
    fullLinesCount = 0
    clearField()
    gameRunning = true
    putNewPiece()
    refreshViewCallback()
}

function clearField() {
    field = []
    for (let r = 0; r < fieldRows; r++) {
        field.push(createArrayWithValues(fieldColumns))
    }
}

function putNewPiece() {
    const defIdx = getRandomInt(pieceDefs.length)
    const def = pieceDefs[defIdx]
    const shiftCol = centerColumn + def.initShiftFromCenter
    
    currPiece = {
        def: def,
        shiftRow: 0,
        shiftCol: shiftCol,
        rotateIdx: 0,
    }

    if (checkGameOver()) {
        return
    }

    setMovePieceDownTimeout()

    pieceCount += 1
    console.log(`New piece: count ${pieceCount}, defIdx ${defIdx}`)
}

function checkGameOver() {
    if (pieceCollides(currPiece, 0, 0)) {
        gameRunning = false
        gameOver = true
        console.log(`Game over! Lines: ${fullLinesCount}`)
        movePieceUpOnGameOver()
        return true
    }
    return false
}

function movePieceUpOnGameOver() {
    const blocks = getCurrPieceBlocks()
    for (let i = 1; i <= blocks.length; i++) {
        if (!pieceCollides(currPiece, -i, 0, null, true)) {
            currPiece.shiftRow -= i
            return
        }
    }
    console.error('Cannot find non-colliding position for the last piece.')
}

function getCurrPieceBlocks() {
    return currPiece.def.blocks[currPiece.rotateIdx]
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
        refreshViewCallback()        
    }
}

function tryRotatePiece(right) {
    if (gameRunning) {
        const newRotateIdx = getNextRotateIdx(currPiece, right)
        if (!pieceCollides(currPiece, 0, 0, newRotateIdx)) {
            currPiece.rotateIdx = newRotateIdx
            refreshViewCallback()        
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

function setMovePieceDownTimeout() {
    clearTimeout(movePieceDownTimeoutId)
    movePieceDownTimeoutId = setTimeout(movePieceDownTimeoutHandler, moveDownInterval)
}

function movePieceDownTimeoutHandler() {
    movePieceDownTimeoutId = 0
    movePieceDown()
}

function movePieceDown() {
    if (gameRunning) {
        if (pieceCollides(currPiece, 1, 0)) {
            settlePiece()
            putNewPiece()
        }
        else {
            currPiece.shiftRow += 1
            setMovePieceDownTimeout()
        }
        refreshViewCallback()
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
                refreshViewCallback()
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

function printInitialInfo() {
    console.log(`Field size: ${fieldRows} rows, ${fieldColumns} columns.`)
    console.log(`Center column: ${centerColumn}.`)
}

setupKeyEvents()
printInitialInfo()
