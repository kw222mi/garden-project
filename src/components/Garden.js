import React, { useState, useEffect } from 'react'
import '../style.css'
import { db } from '../firebase-config'
import {
  collection,
  where,
  query,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc
} from 'firebase/firestore'

import DragDrop from './DragDrop'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import Alert from 'react-bootstrap/Alert'
import { Link } from 'react-router-dom'

/**
 *
 */
function Garden () {
  const [newGardenName, setNewGardenName] = useState('No name')
  const [newHeight, setNewHeight] = useState(0)
  const [newWidth, setNewWidth] = useState(0)
  const [garden, setGardens] = useState([])
  const [newGardenType, setNewGardenType] = useState('Not set')
  const [error, setError] = useState('')

  const gardensCollectionRef = collection(db, 'gardens')
  const [loading, setLoading] = useState(false)

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

  const testIt = async () => {
  const q = query(collection(db, "gardens"), where("userId", "==", uid))
  const data = await getDocs(q);
  //querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  //console.log('hello' + doc.id, " => ", doc.data());
    //})
    setGardens(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  }
  /**
   *
   */
  const createGarden = async () => {
    if ((newWidth > 30 && newWidth < 3000) && (newHeight > 30 && newHeight < 3000)) {
      // Disables the button
      setLoading(true)
      // Store the garden in the db
      await addDoc(gardensCollectionRef, { name: newGardenName, height: Number(newHeight), width: Number(newWidth), type: newGardenType, userId: uid })
      getGardens()
      // To clear the form
      window.location.reload()
    } else {
      setError('Wrong size could not create garden')
    }
    setLoading(false)
  }

  /**
   *
   */
  const getGardens = async () => {
   // const data = await getDocs(gardensCollectionRef)
   // setGardens(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    testIt()
  }

  /**
   *
   * @param id
   * @param height
   */
  const updateGarden = async (id, height) => {
    const gardenDoc = doc(db, 'gardens', id)
    const newFields = { height: height + 1 }
    await updateDoc(gardenDoc, newFields)
    getGardens()
  }

  /**
   *
   * @param id
   */
  const deleteGarden = async (id) => {
    const gardenDoc = doc(db, 'gardens', id)
    await deleteDoc(gardenDoc)
    getGardens()
  }

  /**
   * check the height and help the user enter a valid size.
   *
   * @param event
   */
  const checkHeight = (event) => {
    setError('')
    const height = event.target.value
    if (height > 30 && height < 3000) {
      setNewHeight(height)
    } else {
      setNewHeight(height)
      setError('Size should be 30 - 3000 cm')
    }
  }

  /**
   * check the width and help the user enter a valid size.
   * @param event
   */
  const checkWidth = (event) => {
    setError('')
    const width = event.target.value
    if (width > 30 && width < 3000) {
      setNewWidth(width)
    } else {
      setNewWidth(width)
      setError('Size should be 30 - 3000 cm')
    }
  }

  /**
   *
   * @param type
   */
  const getGardenType = (type) => {
    let typeColor
    if (type === 'small') {
      typeColor = 'yellow'
      console.log('yellow')
    } else if (type === 'medium') {
      typeColor = 'orange'
      console.log('orange')
    } else if (type === 'heavy') {
      typeColor = 'red'
      console.log('red')
    } else if (type === 'giving') {
      typeColor = 'green'
      console.log('green')
    } else {
      typeColor = 'black'
      console.log('black')
    }
    return typeColor
  }

  useEffect(() => {
    getGardens()
  }, [])

  return (
    <div className="Garden">
    <div>
      <Link to="/todo" className="btn btn-primary w-100 mt-3">
            TodoList
          </Link>
      </div>
    <h2>My Gardens</h2>
    {error && <Alert variant="danger">{error}</Alert>}
      <input
        placeholder='Name...'
        onChange={(event) => {
          setNewGardenName(event.target.value)
        }}
      />
      <input
        type="number"
        placeholder='Width in cm'
        onChange={(event) => {
          checkWidth(event)
        }}
      />
      <input
        type="number"
        placeholder='Height in cm'
        onChange={(event) => {
          checkHeight(event)
        }}
      />

       <label for="gardenType"></label>
      <select id="gardenType" name="gardenType" onChange={(event) => {
        setNewGardenType(event.target.value)
      }}>
      <option value="nothing" selected="selected">Choose type of plants:</option>
      <option value="giving">Giving</option>
      <option value="small">Small</option>
      <option value="medium">Medium</option>
      <option value="heavy">Heavy</option>
      </select>

      <button onClick={createGarden} disabled={loading}> Create Garden</button>
      {garden.map((garden) => {
        return (
          <div>
            {' '}
            <h1>Name: {garden.name}</h1>
            <h1>Height: {garden.height}</h1>
            <h1>Width: {garden.width}</h1>
            <h1>Type: {garden.type}</h1>

              <DragDrop
                height={Math.floor(garden.height / 20) * 50}
                width={Math.floor(garden.width / 20) * 50}
                type={getGardenType(garden.type)}
                gardenId={garden.id}
              />
            <button
              onClick={() => {
                updateGarden(garden.id, garden.height)
              }}
            >
              {' '}
              Increase Height
            </button>
            <button
              onClick={() => {
                deleteGarden(garden.id)
              }}
            >
              {' '}
              Delete Garden
            </button>
          </div>
        )
      })}
    </div>
  )
}

export default Garden
