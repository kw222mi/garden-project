
const {emptyPlantsArray} = require('../Garden')

test('emptyPlantsArray', () => {
    const array = [{id:0, name:''},{id:1, name:''},{id:2, name:''},{id:3, name:''}]
    expect(emptyPlantsArray(40,40)).toEqual(array)
})