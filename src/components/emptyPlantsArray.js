/**
 * Component just for test.
 *
 * @param { number} newWidth -a number
 * @param {number} newHeight -a number
 * @returns {Array} - an array
 */
 const emptyPlantsArray = (newWidth, newHeight) => {
  const numberOfPlants = Math.floor((newWidth / 20)) * Math.floor((newHeight / 20))
  const plantArray = []
  for (let i = 0; i < numberOfPlants; i++) {
    plantArray.push({
      id: i,
      name: '',
      startDate: 0,
      finnishDate: 0,
      url: './static/media/soil_ikon.734fc5ed.jpg'
    })
  }
  return plantArray
}

export default emptyPlantsArray
