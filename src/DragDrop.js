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
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";




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
    id:4,
    url:carrot

  }])
  const [plantList, setPlantList] = useState([])
  const plantsCollectionRef = collection(db, "plants")


useEffect(() => {
  const getPlants = async () => {
    const data = await getDocs(plantsCollectionRef);
    setPlantList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    
  };

  getPlants();
}, []);
  
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "image",
    drop: (item) => addImageToBoardNew(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addImageToBoard = (id) => {
    const pictureList = PictureList.filter((picture) => id === picture.id);
    setBoard((board) => [...board, pictureList[0]]);

    //updateGarden(id) 
  };

  const addImageToBoardNew = (id) => {
    console.log(plantList)
    const pList = plantList.filter((plant) => id === plant.id)
    setBoard((board) => [...board, pList[0]])
    console.log(board)
  };
  /*
  const updateGarden = async (id) => {
    const gardenDoc = doc(db, "gardens", id);
    const newBoard = { board: board };
    await updateDoc(gardenDoc, newBoard);
  };
  */
  return (
    <div>
        <div className="test">
        {plantList.map((plant) => {
          return <Picture url={plant.url} id={plant.id} />
          
        })}
        </div>

      <div className="Pictures">
        {PictureList.map((picture) => {
          return <Picture url={picture.url} id={picture.id} />;
          
        })}
       
      </div>
      <div 
      className="Board" 
      ref={drop} 
      style = {{ 
      width: `${props.width}px`, 
      height: `${props.height}px`, 
      border: `5px solid ${props.type}`
      }}
      >
        {board.map((picture) => {
          return <Picture url={picture.url} id={picture.id} />;
        })}
      </div>
    </div>
  );
}

export default DragDrop;