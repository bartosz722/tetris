// Used modules: utils.

'use strict'

const pieceDefs = [
    {
        color: 'red',
        frequency: 4,
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
        color: 'green',
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
        color: 'gray',
        frequency: 3,
        initShiftFromCenter: 0,
        blocks: [
            [
                [0, 1, 1],
                [1, 1, 0],
                [0, 0, 0],
            ],
            [
                [1, 0, 0],
                [1, 1, 0],
                [0, 1, 0],
            ],
        ],
    },
    {
        color: 'yellow',
        frequency: 2,
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
        color: 'violet',
        frequency: 2,
        initShiftFromCenter: 0,
        blocks: [
            [
                [1, 1],
                [1, 1],
            ],
        ]
    },
    {
        color: 'deepskyblue',
        frequency: 3,
        initShiftFromCenter: 0,
        blocks: [
            [
                [1, 0, 0],
                [1, 0, 0],
                [1, 1, 0],
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
    {
        color: 'orange',
        frequency: 3,
        initShiftFromCenter: 0,
        blocks: [
            [
                [0, 1, 0],
                [0, 1, 0],
                [1, 1, 0],
            ],
            [
                [1, 0, 0],
                [1, 1, 1],
                [0, 0, 0],
            ],
            [
                [1, 1, 0],
                [1, 0, 0],
                [1, 0, 0],
            ],
            [
                [1, 1, 1],
                [0, 0, 1],
                [0, 0, 0],
            ],
        ],
    },
]

let pieceFrequencySteps = []

function verifyPieceDefinitions() {
    // So for nothing...
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