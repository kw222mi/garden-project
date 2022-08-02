
import Garden from '../Garden'

describe(Garden, () => {

    it('the emptyPlantsArray is creating an empty array', () =>{
        const array = [{id:0, name:''},{id:1, name:''},{id:2, name:''},{id:3, name:''}]
        expect(emptyPlantsArray(40,40)).toEqual(array)
    })
})



/*
test('emptyPlantsArray', () => {
    const array = [{id:0, name:''},{id:1, name:''},{id:2, name:''},{id:3, name:''}]
    expect(emptyPlantsArray(40,40)).toEqual(array)
})
*/