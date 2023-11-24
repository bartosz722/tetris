// Used modules: utils.

'use strict'

const colors = ['red', 'green', 'yellow', 'violet', 'deepskyblue']

const pieceDefs = [
    {
        color: colors[0],
        frequency: 2,
        initShiftFromCenter: -1,
        blocks: [
            [
                [0, 1, 0],
                [0, 1, 1],
                [0, 1, 0],
            ],
            [
                [1, 1, 1],
                [0, 1, 0],
                [0, 0, 0],
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
        ],
    },
    {
        color: colors[1],
        frequency: 3,
        initShiftFromCenter: -1,
        blocks: [
            [
                [1, 1, 0],
                [0, 1, 1],
                [0, 0, 0],
            ],
            [
                [0, 0, 1],
                [0, 1, 1],
                [0, 1, 0],
            ],
        ],
    },
    {
        color: colors[2],
        frequency: 1,
        initShiftFromCenter: -1,
        blocks: [
            [
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0],
            ],
            [
                [0, 0, 0, 0],
                [1, 1, 1, 1],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ],
        ],
    },
    {
        color: colors[3],
        frequency: 1,
        initShiftFromCenter: 0,
        blocks: [
            [
                [1, 1],
                [1, 1],
            ],
        ]
    },
    {
        color: colors[4],
        frequency: 3,
        initShiftFromCenter: -1,
        blocks: [
            [
                [0, 1, 0],
                [0, 1, 0],
                [0, 1, 1],
            ],
            [
                [1, 1, 1],
                [1, 0, 0],
                [0, 0, 0],
            ],
            [
                [1, 1, 0],
                [0, 1, 0],
                [0, 1, 0],
            ],
            [
                [0, 0, 1],
                [1, 1, 1],
                [0, 0, 0],
            ],
        ],
    },
]

let pieceFrequencySteps = []

function verifyPieceDefinitions() {
    if (colors.length != pieceDefs.length) {
        throw 'Different number of colors and piece definitions.'
    }
}

function setupPieceFrequencies() {
    let sum = 0
    for (const pd of pieceDefs) {
        sum += pd.frequency
        pieceFrequencySteps.push(sum)
    }
    console.log('Piece frequency steps:', pieceFrequencySteps)
}

function getRandomPieceDef() {
    const r = getRandomNumber(pieceFrequencySteps[pieceFrequencySteps.length - 1])
    for (const i in pieceFrequencySteps) {
        if (r < pieceFrequencySteps[i]) {
            return pieceDefs[i]
        }
    }
    throw 'Failed to find random piece.'
}

verifyPieceDefinitions()
setupPieceFrequencies()