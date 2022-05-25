import { useState, useEffect } from "react";
import "../style.css";
import { db } from "../firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import React from "react";
import GardenSquare from "./GardenSquare";
import Ikon from './Ikon'
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'
import {useDrop} from 'react-dnd'
import peas from '../pictures/peas_ikon.jpg'
import onion from '../pictures/onion_ikon.jpg'
import carrot from '../pictures/carrot_ikon.jpg'
import cabbage from '../pictures/cabbage_ikon.jpg'

const ikonList = [
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

]


function Garden() {
  const [board, setBoard] = useState([{
    id:1,
    url:peas
  }])
  const [newGardenName, setNewGardenName] = useState("");
  const [newHeight, setNewHeight] = useState(0);
  const [newWidth, setNewWidth] = useState(0);
  const [garden, setGardens] = useState([]);
  const gardensCollectionRef = collection(db, "gardens");
  
  const createGarden = async () => {
    
    await addDoc(gardensCollectionRef, { name: newGardenName, height: Number(newHeight), width: Number(newWidth) });
  };
    
  const updateGarden = async (id, height) => {
    const gardenDoc = doc(db, "gardens", id);
    const newFields = { height: height + 1 };
    await updateDoc(gardenDoc, newFields);
  };
  
  const deleteGarden = async (id) => {
    const gardenDoc = doc(db, "gardens", id);
    await deleteDoc(gardenDoc);
  };
  
  useEffect(() => {
    const getGardens = async () => {
      const data = await getDocs(gardensCollectionRef);
      setGardens(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
     
    };

    getGardens();
  }, []);

  

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "ikon",
    drop: (item) => addImageToBoard(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addImageToBoard = (id) => {
    const boardList = ikonList.filter((ikon) => id === ikon.id);
    setBoard((board) => [...board, boardList[0]]);
  };
  

  /*
const [{ isOver }, drop] = useDrop(() => ({
  accept: "ikon",
  drop: (item, monitor) => addImageToBoard(item.id),
  collect: (monitor) => ({
    isOver: !!monitor.isOver(),
  }),
}))


const addImageToBoard = (id) => {
  console.log(id)
  const boardList = ikonList.filter((ikon) => id === ikon.id);
  setBoard((board) => [...board, boardList[0]])
}
*/
  
  return (
    <div className="Garden">
      <input
        placeholder="Name..."
        onChange={(event) => {
          setNewGardenName(event.target.value);
        }}
      />
      <input
        type="number"
        placeholder="Width..."
        onChange={(event) => {
          setNewWidth(event.target.value);
        }}
      />
      <input
        type="number"
        placeholder="Height..."
        onChange={(event) => {
          setNewHeight(event.target.value);
        }}
      />

      <button onClick={createGarden}> Create Garden</button>
      {garden.map((garden) => {
        return (
          <div>
            {" "}
            <h1>Name: {garden.name}</h1>
            <h1>Height: {garden.height}</h1>
            <h1>Width: {garden.width}</h1>
            
            <div className="garden">
            {Array(Math.floor(garden.height/20)).fill(
            Array(Math.floor(garden.width/20)).fill(<GardenSquare />))}
            </div>

           <div >
            {ikonList.map((ikon) =>{
              return <Ikon 
                url={ikon.url} id={ikon.id}/>
            })}
             </div>
             <div 
             className= "board" 
             ref={drop} 
             style= {{backgroundColor: isOver? 'red': 'white'}}>
             {board.map((ikon) => {
                return <Ikon url={ikon.url} id={ikon.id} />
              })}
            </div>

        
                       
            <button
              onClick={() => {
                updateGarden(garden.id, garden.height);
              }}
            >
              {" "}
              Increase Height
            </button>
            <button
              onClick={() => {
                deleteGarden(garden.id);
              }}
            >
              {" "}
              Delete Garden
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Garden;