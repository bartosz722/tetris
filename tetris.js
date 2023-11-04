const fieldRows = 30
const fieldColumns = 10

const field = Array(fieldRows).fill(Array(fieldColumns).fill(null)) // color name or null

const colors = ['red', 'green', 'blue', 'yellow']

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
]

let currPiece = {
    def: pieceDefs[0],
    shiftRow: 0,
    shiftCol: 0,
    rotateIdx: 0,
}

// shiftDirection: left, right, down
function pieceCollides(piece, shiftDirection) {
    return false
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
