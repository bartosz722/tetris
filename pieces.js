// Used modules: none.

'use strict'

const colors = ['red', 'green', 'yellow', 'violet', 'deepskyblue']

const pieceDefs = [
    {
        color: colors[0],
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
        ],
    },
]

function verifyDefinitions() {
    if (colors.length != pieceDefs.length) {
        throw 'Different number of colors and piece definitions.'
    }
}

verifyDefinitions()
