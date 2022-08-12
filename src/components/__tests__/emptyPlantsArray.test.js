import emptyPlantsArray from '../emptyPlantsArray'

/**
 * Test component - Test the array that sets the squares where you can set plants.
 */

test('returns an empty array for plants', () => {
    // Test the data in the array
   expect(emptyPlantsArray(40,40)).toEqual([
    {id: 0, name: '', startDate: 0, finnishDate: 0, url:'./static/media/soil_ikon.734fc5ed.jpg' },
    {id: 1, name: '', startDate: 0, finnishDate: 0, url:'./static/media/soil_ikon.734fc5ed.jpg' },
   {id: 2, name: '', startDate: 0, finnishDate: 0, url:'./static/media/soil_ikon.734fc5ed.jpg' },
   {id: 3, name: '', startDate: 0, finnishDate: 0, url:'./static/media/soil_ikon.734fc5ed.jpg' }])
   // Test the length of the array
   expect(emptyPlantsArray(30, 30)).toHaveLength(1)
    expect(emptyPlantsArray(40, 40)).toHaveLength(4)
    expect(emptyPlantsArray(111, 111)).toHaveLength(25)
    expect(emptyPlantsArray(99, 111)).toHaveLength(20)
    expect(emptyPlantsArray(99, 119)).toHaveLength(20)
    expect(emptyPlantsArray(300, 300)).toHaveLength(225)

  
});