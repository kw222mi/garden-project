import { useState, useEffect } from "react"
import "../style.css"
import { db } from "../firebase-config"
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore"
import React from "react"
import GardenSquare from './GardenSquare'
import DragDrop from '../DragDrop'

function Garden() {
  const [newGardenName, setNewGardenName] = useState("")
  const [newHeight, setNewHeight] = useState(0)
  const [newWidth, setNewWidth] = useState(0)
  const [garden, setGardens] = useState([])
  const [newGardenType, setNewGardenType] = useState("")
  const gardensCollectionRef = collection(db, "gardens")
  
  const createGarden = async () => {
    
    await addDoc(gardensCollectionRef, { name: newGardenName, height: Number(newHeight), width: Number(newWidth), type:newGardenType})
  };
    
  const updateGarden = async (id, height) => {
    const gardenDoc = doc(db, "gardens", id)
    const newFields = { height: height + 1 }
    await updateDoc(gardenDoc, newFields)
  }
  
  const deleteGarden = async (id) => {
    const gardenDoc = doc(db, "gardens", id)
    await deleteDoc(gardenDoc)
  }

  const getGardenType = (type) => {
    let typeColor
   if(type === "small"){
    typeColor = "yellow"
    console.log("yellow")
   } else if (type === "medium") {
    typeColor = "orange"
    console.log("orange")
   }else if (type === "heavy") {
    typeColor = "red"
    console.log("red")
   }else if(type === "giving") {
    typeColor= "green"
    console.log("green")
   }else {
    typeColor= "black"
    console.log("black")
   }
   return typeColor
  }
  
  useEffect(() => {
    const getGardens = async () => {
      const data = await getDocs(gardensCollectionRef)

      setGardens(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    
    };
    getGardens();
  }, []);

  
  return (
    <div className="Garden">
      <input
        placeholder="Name..."
        onChange={(event) => {
          setNewGardenName(event.target.value)
        }}
      />
      <input
        type="number"
        placeholder="Width in cm..."
        onChange={(event) => {
          setNewWidth(event.target.value);
        }}
      />
      <input
        type="number"
        placeholder="Height in cm..."
        onChange={(event) => {
          setNewHeight(event.target.value);
        }}
      />
     

       <label for="gardenType">Choose type of plants:</label>
      <select id="gardenType" name="gardenType">
      <option value="giving">Giving</option>
      <option value="small">Small</option>
      <option value="medium">Medium</option>
      <option value="heavy">Heavy</option>
      onSelect={(event) => {
          setNewGardenType(event.target.value)
        }}
      </select> 
            

      <button onClick={createGarden}> Create Garden</button>
      {garden.map((garden) => {
        return (
          <div>
            {" "}
            <h1>Name: {garden.name}</h1>
            <h1>Height: {garden.height}</h1>
            <h1>Width: {garden.width}</h1>
            <h1>Type: {garden.type}</h1>
            
              <DragDrop 
                height={Math.floor(garden.height/20)*50}
                width={Math.floor(garden.width/20)*50}
                type={getGardenType(garden.type)}
              />
            
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

export default Garden