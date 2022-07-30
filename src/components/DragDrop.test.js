const getNumberOfSquares = require('./DragDrop')

test('counts the number of plants in a garden', () => {
    expect(getNumberOfSquares (300, 200)).toBe(24)
})