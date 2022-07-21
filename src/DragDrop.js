import React, { useState, useEffect } from "react";
import Picture from "./Picture";
import { useDrop } from "react-dnd";
import "./style.css"
import peas from './pictures/peas_ikon.jpg'
import onion from './pictures/onion_ikon.jpg'
import carrot from './pictures/carrot_ikon.jpg'
import cabbage from './pictures/cabbage_ikon.jpg'
import { db } from "./firebase-config";
import {
  collection,
  getDocs,
  updateDoc,
  doc
} from 'firebase/firestore'
import GardenSquare from './components/GardenSquare'

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

  }
];

function DragDrop(props) {
  const [board, setBoard] = useState([{

  }])
  const [gardenquare, setGardenquare] = useState([
    {
      plantId:'04BSoDOP2HesDun7YZj1',
      url:carrot
    },
    {
      plantId:'04BSoDOP2HesDun7YZj1',
      url:carrot
    },
    {
      plantId:'04BSoDOP2HesDun7YZj1',
      url:carrot
    },
    {
      plantId:'04BSoDOP2HesDun7YZj1',
      url:carrot
    },
    {
      plantId:'04BSoDOP2HesDun7YZj1',
      url:carrot
    },
    {
      plantId:'04BSoDOP2HesDun7YZj1',
      url:carrot
    }

   ])
  const [plantList, setPlantList] = useState([])
  const plantsCollectionRef = collection(db, "plants")


useEffect(() => {
  const getPlants = async () => {
    const data = await getDocs(plantsCollectionRef);
    setPlantList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    
  };

  getPlants()
  let numberOfSquares = (props.height/50)*(props.width/50)
  //setGardenquare(numberOfSquares)
  console.log("Sqares " + numberOfSquares)
  console.log("garden id " + props.gardenId)
  console.log("array" + gardenquare)
  // setGardenquare(gardenquare => [...garden, newElement]);
}, []);
  
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "image",
    drop: (item) => addImageToBoard(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addImageToBoard = (id) => {
    const pictureList = PictureList.filter((picture) => id === picture.id);
    setBoard((board) => [...board, pictureList[0]]);

   // updateGarden(id) 
  };

  const addImageToBoardNew = (id) => {
    console.log(plantList)
    const pList = plantList.filter((plant) => id === plant.id)
    setBoard((board) => [...board, pList[0]])
    console.log(board)
    
  };
  
  const updateGarden = async (id) => {
    const gardenDoc = doc(db, "gardens", id);
    const newBoard = { board: board };
    await updateDoc(gardenDoc, newBoard);
  };
  
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
        //setNewGardenType(event.target.value)
      }}>
      <option value="nothing" selected="selected">Choose plants to grow:</option>
      {plantList.map((plant) => {
          return <option name={plant.name} id={plant.id} >{plant.name}</option>
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
      
      {gardenquare.map((gardenSquare) => {
          return <GardenSquare id={gardenquare.plantId} url={gardenquare.url}></GardenSquare>
        })}

        {board.map((picture) => {
          return <Picture url={picture.url} id={picture.id} />
        })}
      </div>
    </div>
  );
}

export default DragDrop;