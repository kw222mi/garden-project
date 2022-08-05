import sum from '../sum'

test('returns an empty array for plants', () => {
   expect(sum(40,40)).toEqual([
    {id: 0, name: '', startDate: 0, finnishDate: 0, url:'./static/media/soil_ikon.734fc5ed.jpg' },
    {id: 1, name: '', startDate: 0, finnishDate: 0, url:'./static/media/soil_ikon.734fc5ed.jpg' },
   {id: 2, name: '', startDate: 0, finnishDate: 0, url:'./static/media/soil_ikon.734fc5ed.jpg' },
   {id: 3, name: '', startDate: 0, finnishDate: 0, url:'./static/media/soil_ikon.734fc5ed.jpg' }])
   expect(sum(30, 30)).toHaveLength(1)
    expect(sum(40, 40)).toHaveLength(4)
    expect(sum(111, 111)).toHaveLength(25)
    expect(sum(99, 111)).toHaveLength(20)
    expect(sum(99, 119)).toHaveLength(20)
    expect(sum(300, 300)).toHaveLength(225)

  
});