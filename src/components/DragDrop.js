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

  savePlantsInGarden(gardenId, plantsInGarden)
}, [plantsInGarden])


useEffect(() => {
  const getPlants = async () => {
    const data = await getDocs(plantsCollectionRef);
    setPlantList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    
  };

  getPlants()
  let numberOfSquares = (props.height/50)*(props.width/50)
  
  console.log("Sqares " + numberOfSquares)
  console.log("garden id " + props.gardenId)
  console.log("array" + plantsInGarden)
  /*
  for (let i=0; i< numberOfSquares; i++){
    setPlantsIngarden(gardenSquare => [...gardenSquare, {name: tomato, id: gardenId}])
    console.log("array" + gardenSquare.name)
  }
  */
}, [])

useEffect(() => {
  const getPlantsinGarden = async () => {
    const q = query(collection(db, "gardens"), where("userId", "==", uid))
  const data = await getDocs(q);
  //let test = data.getValue(plantsInGarden)
  console.log('data.docs ' + data.docs.data)
    //const data = await getDocs(gardensCollectionRef);
    //setPlantsInGarden(data.docs.map((doc) => ({ ...doc.data(), plantsInGarden: plantsInGarden }))); 

  }

 

  getPlantsinGarden()
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

        <label for="plantsInGarden"></label>
      <select id="plantType" name="plantType" onChange={(event) => {
        console.log('selected ' + selected)
        setSelected(null)
        console.log('selected ' + selected)
        if (event.target.value === 'nothing selected'){
          console.log('nothing selected')
        } else {

        setPlantsInGarden(gardenSquare => [...gardenSquare, {name: event.target.value}])
       
        }
        setSelected(true)
        console.log('selected ' + selected)
      }}>
      <option value='nothing selected' selected={selected} className='select_plants'>Choose plants to grow:</option>
      {plantList.map((plant) => {
          return <option name={plant.name} value={plant.name} >{plant.name}</option>
        })}
      </select>
      <div 
      className="Board" 
      ref={drop} 
      style = {{ 
      width: `${props.width}px`, 
      height: `${props.height}px`, 
      border: `5px solid ${props.type}`
      }}
      >
      
      {plantsInGarden.map((gardenSquare) => {
          return <GardenSquare name={gardenSquare.name} plantId={gardenSquare.plantId}/>
        })}
        
      </div>
    </div>
  );
}

/*
{board.map((picture) => {
          return <Picture url={picture.url} id={picture.id} />
        })}
*/
export default DragDrop;