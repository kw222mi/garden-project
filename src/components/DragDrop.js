import React, { useState, useEffect } from "react";
import Picture from "../Picture";
import { useDrop } from "react-dnd";
import "../style.css"
import peas from '../pictures/peas_ikon.jpg'
import onion from '../pictures/onion_ikon.jpg'
import carrot from '../pictures/carrot_ikon.jpg'
import cabbage from '../pictures/cabbage_ikon.jpg'
import beet from '../pictures/beat_ikon.jpg'
import lettuce from '../pictures/lettuce_ikon.jpg'
import pumpkin from '../pictures/pumpkin_ikon.jpg'
import dill from '../pictures/dill_ikon.jpg'
import bean from '../pictures/bean_ikon.jpg'
import radish from '../pictures/radish_ikon.jpg'
import squash from '../pictures/squash_ikon.jpg'
import parsley from '../pictures/parsley_ikon.jpg'
import potato from '../pictures/potato_ikon.jpg'
import tomato from '../pictures/tomato_ikon.jpg'
import cucumber from '../pictures/cucumber_ikon.jpg'


import { db } from "../firebase-config";
import {
  collection,
  getDocs,
  updateDoc,
  where,
  query,
  doc
} from 'firebase/firestore'
import GardenSquare from './GardenSquare'
import PlantCard from './PlantCard'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const PictureList = [
  {
    id:1,
    url:peas
  },
  {
    id:2,
    url:onion
  },
  {
    id:3,
    url:cabbage

  },
  {
    id:4,
    url:carrot

  },
  {
    id:5,
    url:beet

  },
  {
    id:6,
    url:lettuce

  },
  {
    id:7,
    url:pumpkin

  },
  {
    id:8,
    url:dill

  },
  {
    id:9,
    url:bean

  },
  {
    id:10,
    url:radish

  },
  {
    id:11,
    url:squash

  },
  {
    id:12,
    url:parsley

  },
  {
    id:13,
    url:potato

  },
  {
    id:14,
    url:tomato

  },
  {
    id:15,
    url:cucumber

  },
];

function DragDrop(props) {
  const [board, setBoard] = useState([{ }])
  const [plantsInGarden, setPlantsInGarden] = useState(props.plantsInGarden)
  const [plantList, setPlantList] = useState([])
  const [selected, setSelected] = useState(false)
  const [selectedPlant, setSelectedPlant] = useState([])
  const gardensCollectionRef = collection(db, 'gardens')
  const plantsCollectionRef = collection(db, "plants")
  
  
  let gardenId = props.gardenId
  const auth = getAuth()
  let uid
  onAuthStateChanged(auth, (user) => {
    if (user) {
    // User is signed in
      uid = user.uid
      console.log(uid)
    } else {
     console.log('User is signed out')
    }
  })

  useEffect(() => {

    console.log(selectedPlant)
  }, [selectedPlant])

useEffect(() => {

  savePlantsInGarden(gardenId, plantsInGarden)
}, [plantsInGarden])


useEffect(() => {
  const getPlants = async () => {
    const data = await getDocs(plantsCollectionRef);
    setPlantList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }
  getPlants()
  let numberOfSquares = (props.height/50)*(props.width/50)
  
  console.log("Sqares " + numberOfSquares)
  /*
  for (let i=0; i< numberOfSquares; i++){
    setPlantsIngarden(gardenSquare => [...gardenSquare, {name: tomato, id: gardenId}])
    console.log("array" + gardenSquare.name)
  }
  */
}, [])

useEffect(() => {
  const getPlantsInGarden = async () => {
    const q = query(collection(db, "gardens"), where("userId", "==", uid))
  const data = await getDocs(q);
  //let test = data.getValue(plantsInGarden)
  console.log('data.docs ' + data.docs.data)
    //const data = await getDocs(gardensCollectionRef);
    //setPlantsInGarden(data.docs.map((doc) => ({ ...doc.data(), plantsInGarden: plantsInGarden }))); 

  }

  


  getPlantsInGarden()
  let numberOfSquares = (props.height/50)*(props.width/50)
  
  
  console.log("get array" + plantsInGarden)
  /*
  for (let i=0; i< numberOfSquares; i++){
    setPlantsIngarden(gardenSquare => [...gardenSquare, {name: tomato, id: gardenId}])
    console.log("array" + gardenSquare.name)
  }
  */
}, [])

const savePlantsInGarden = async (id, plantsInGarden) => {
  
  const gardenDoc = doc(db, 'gardens', id)
  const newField = { plantsInGarden}
  await updateDoc(gardenDoc, newField)
}

  
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "image",
    drop: (item) => addImageToBoard(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }))

  const addImageToBoard = (id) => {
    const pictureList = PictureList.filter((picture) => id === picture.id);
    setBoard((board) => [...board, pictureList[0]]);

   // updateGarden(id) 
  }

  const addImageToBoardNew = (id) => {
    console.log(plantList)
    const pList = plantList.filter((plant) => id === plant.id)
    setBoard((board) => [...board, pList[0]])
    console.log(board)
    
  }

  const handleClick = ((item, index) => {

    let plantName
    let plantUrl

    selectedPlant.map((plant) => 
   
    plantName = plant.name

    )

    selectedPlant.map((plant) => 
   
    plantUrl = plant.url

    )


    if (plantName === 'nothing selected'){
      return
    } else {

      const arr = [...plantsInGarden]
      console.log('selected plant name ' +  selectedPlant)
      console.log('index name ' + arr[index].name )
      console.log('plant name ' + plantName)
      arr[index].name = plantName
      arr[index].url = plantUrl
      
      setPlantsInGarden(arr)

    }

    
      
  })

  const showPlantFacts = async (event) => {
   
  
    try{
      const q = query(collection(db, "plants"), where("name", "==", event.target.value))
      const data = await getDocs(q);
      data.forEach((doc) => {
      
      console.log('hello' + doc.id, " => ", doc.data());

      setSelectedPlant(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      
      
      
        })

        /*{selectedPlant.map((plant) => {
          return <PlantCard name={plant.name} url={plant.url} type={plant.type}
      ></PlantCard>
      })}
      */
        
      } catch(e) {
        console.log(e);
    }
  }
  
  
  return (
    <div>
      <div className="Pictures">
        {PictureList.map((picture) => {
          return <Picture url={picture.url} id={picture.id} />
          
        })}
       
      </div>
      <div className="test">
        {plantList.map((plant) => {
          return <Picture url={plant.url} id={plant.id} />
          
        })}
        </div>

        <div className = "plant-select">
        <label for="plantsInGarden"></label>
      <select id="plantType" name="plantType" onChange={(event) => {
        showPlantFacts(event)
        
      }}>
      <option value='nothing selected' selected={selected}>Choose plants to grow:</option>
      {plantList.map((plant) => {
          return <option name={plant.name} value={plant.name} >{plant.name}</option>
        })}
      </select>
      </div>
      {selectedPlant.map((plant) => {
        return <PlantCard 
        name={plant.name} 
        friends={plant.friends} 
        avoid={plant.avoid}
        url={plant.url}
        minTime={plant.time_min}
        maxTime={plant.time_max}
        type={plant.type}
        />
      
  })}
      <div 
      className="Board" 
      ref={drop} 
      style = {{ 
      width: `${props.width}px`, 
      height: `${props.height}px`, 
      border: `5px solid ${props.type}`
      }}
      >

      
        {plantsInGarden.map((item, index) => {
            return <GardenSquare key={item.id} name={item.name} url={item.url} onClick={() => handleClick(item,index)}/>
        })
        


      
      //{plantsInGarden.map((gardenSquare) => {
          //return <GardenSquare name={gardenSquare.name} id={gardenSquare.id} onClick={(event) => {
                
               // handleClick(event)
                
              //}}/>
        }

      </div>
    </div>
  )
}

/*
{board.map((picture) => {
          return <Picture url={picture.url} id={picture.id} />
        })}
*/
export default DragDrop;