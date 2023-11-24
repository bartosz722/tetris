// Used modules: none.

'use strict'

// Returns random int >= 0 and < max.
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// Returns random number >= 0 and < max
function getRandomNumber(max) {
    return Math.random() * max;
}

function createArrayWithValues(len, val = null) {
    return Array(len).fill(val)
}
