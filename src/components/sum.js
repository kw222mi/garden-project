function sum(a, b) {
 
    let numberOfPlants = Math.floor((a/20))*Math.floor((b/20))
    let plantArray = []
    for(let i = 0; i<numberOfPlants; i++){
      plantArray.push( {id: i, name: '', startDate: 0,
      finnishDate: 0, url:'./static/media/soil_ikon.734fc5ed.jpg' })
    }
    return plantArray
 
   
  }

  export default sum;

