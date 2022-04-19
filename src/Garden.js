import { useState, useEffect } from "react";
import "./style.css";
import { db } from "./firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import React from "react";



function Garden() {
  const [newGardenName, setNewGardenName] = useState("");
  const [newSize, setNewSize] = useState(0);
  const [garden, setGardens] = useState([]);
  const gardensCollectionRef = collection(db, "gardens");
  

  const createGarden = async () => {
    await addDoc(gardensCollectionRef, { name: newGardenName, size: Number(newSize) });
  };

    
  const updateGarden = async (id, size) => {
    const gardenDoc = doc(db, "gardens", id);
    const newFields = { size: size + 1 };
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
        placeholder="Size..."
        onChange={(event) => {
          setNewSize(event.target.value);
        }}
      />

      <button onClick={createGarden}> Create Garden</button>
      {garden.map((garden) => {
        return (
          <div>
            {" "}
            <h1>Name: {garden.name}</h1>
            <h1>Size: {garden.size}</h1>
            <button
              onClick={() => {
                updateGarden(garden.id, garden.size);
              }}
            >
              {" "}
              Increase Size
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