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
import './garden.css'
import GardenBoard from './GardenBoard'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import Alert from 'react-bootstrap/Alert'
import Navbar from './Navbar'
import Accordion from 'react-bootstrap/Accordion'
import 'react-bootstrap-accordion/dist/index.css'

/**
 * Component to represent a garden.
 *
 * @returns {HTMLElement} - the garden component.
 */
function Garden () {
  const [newGardenName, setNewGardenName] = useState('No name')
  const [newHeight, setNewHeight] = useState(0)
  const [newWidth, setNewWidth] = useState(0)
  const [garden, setGardens] = useState([])
  const [newGardenType, setNewGardenType] = useState('Not set')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [newType, setNewType] = useState('Not set')
  const gardensCollectionRef = collection(db, 'gardens')

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
    getAuthGarden()
  }, [])

  /**
   * Get the gardens from the database by user id.
   */
  const getAuthGarden = async () => {
    // Get the current user
    const currentUser = auth.currentUser
    if (currentUser) {
      uid = currentUser.uid
    } else {
      console.log('User is signed out')
    }

    try {
      const q = query(collection(db, 'gardens'), where('userId', '==', uid))
      const data = await getDocs(q)
      data.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log('hello' + doc.id, ' => ', doc.data())
      })
      setGardens(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    } catch (e) {
      console.log(e)
    }
  }
  /**
   * Function to create a new garden.
   */
  const createGarden = async () => {
    if ((newWidth > 29 && newWidth < 301) && (newHeight > 29 && newHeight < 301)) {
      // Disables the create button
      setLoading(true)
      const plantsInGarden = emptyPlantsArray(newWidth, newHeight)
      // Store the garden in the db
      await addDoc(gardensCollectionRef, { name: newGardenName, height: Number(newHeight), width: Number(newWidth), type: newGardenType, userId: uid, plantsInGarden })
      getAuthGarden()
      // To clear the form
      window.location.reload()
    } else {
      setError('Wrong size could not create garden')
    }
    setLoading(false)
  }

  /**
   * Returns an array of empty plants object.
   *
   * @param {number} newWidth - width of the garden.
   * @param {number} newHeight - height of the garden.
   * @returns {Array} - array of empty plants objects.
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

  /**
   * Function to set a new garden type and plants array.
   *
   * @param {string} id - id of the garden
   */
  const newTypeOfGarden = async (id) => {
    // get size of garden
    let h
    let w

    garden.map((garden) => {
      if (garden.id === id) {
        h = garden.height
        w = garden.width
      }
      return h
    })
    // get a new empty plant array
    const emptyArray = emptyPlantsArray(w, h)
    const gardenDoc = doc(db, 'gardens', id)
    const newFields = { type: newType, plantsInGarden: emptyArray }
    await updateDoc(gardenDoc, newFields)
    getAuthGarden()
  }

  /**
   * Delete a garden.
   *
   * @param {string} id - the id of the garden.
   */
  const deleteGarden = async (id) => {
    const gardenDoc = doc(db, 'gardens', id)
    await deleteDoc(gardenDoc)
    getAuthGarden()
  }

  /**
   * Check the height and help the user enter a valid size.
   *
   * @param {event} event -input event.
   */
  const checkHeight = (event) => {
    setError('')
    const height = event.target.value
    if (height > 29 && height < 301) {
      setNewHeight(height)
    } else {
      setNewHeight(height)
      setError('Size should be 30 - 300 cm')
    }
  }

  /**
   * Check the width and help the user enter a valid size.
   *
   * @param {event} event - input event.
   */
  const checkWidth = (event) => {
    setError('')
    const width = event.target.value
    if (width > 29 && width < 301) {
      setNewWidth(width)
    } else {
      setNewWidth(width)
      setError('Size must be within 30 - 300 cm')
    }
  }

  /**
   * Set the type of garden color.
   *
   * @param {string} type -type of garden.
   * @returns {string} - typecolor
   */
  const getGardenType = (type) => {
    let typeColor
    if (type === 'small') {
      typeColor = '#D1E8E2'
    } else if (type === 'medium') {
      typeColor = '#DA7B93'
    } else if (type === 'heavy') {
      typeColor = '#1C3334'
    } else if (type === 'giving') {
      typeColor = '#D9B08C'
    } else {
      typeColor = '#2E151B'
    }
    return typeColor
  }

 

  return (
    <div className="garden">

    <Navbar/>

        <header className='garden-header'>My Garden</header>

        <div className='create-garden-container'>
        {error && <Alert variant="danger">{error}</Alert>}
        <input
          className='garden-input-name'
          placeholder='Name'
          onChange={(event) => {
            setNewGardenName(event.target.value)
          }}
        />
        <input
          className='garden-input-width'
          type="number"
          placeholder='Width in cm'
          onChange={(event) => {
            checkWidth(event)
          }}
        />
        <input
          className='garden-input-height'
          type="number"
          placeholder='Height in cm'
          onChange={(event) => {
            checkHeight(event)
          }}
        />
        <label for="gardenType"></label>
        <select className='garden-type' id='gardenType' name='gardenType' onChange={(event) => {
          setNewGardenType(event.target.value)
        }}>
          <option value="nothing" selected="selected">Choose type of plants:</option>
          <option value="giving">Giving</option>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="heavy">Heavy</option>
        </select>
        <div className='create-button-container'>
          <button className='create-garden-button' onClick={createGarden} disabled={loading}> Create Garden</button>
        </div>
      </div>

        <h1 className='gardens-h1'>
        <span class="material-symbols-outlined leaf">
          nest_eco_leaf
        </span>
        
        Gardens
        <span class="material-symbols-outlined leaf">
        emoji_nature
        </span>

        <span class="material-symbols-outlined">
        psychiatry
        </span>
        <span class="material-symbols-outlined">
        deceased
        </span>
        <span class="material-symbols-outlined">
        local_florist
        </span>
        <span className="material-symbols-outlined leaf">
          eco
        </span>
        </h1>
      {garden.map((garden) => {
        return (
          <div className='board-container'>
            {' '}
            <h3 className='garden-name'>{garden.name}</h3>
            <p className='garden-info'>
              Height: {garden.height} &nbsp;
              Width: {garden.width} &nbsp;
              Type: {garden.type}</p>

            <GardenBoard
              height={Math.floor(garden.height / 20) * 50}
              width={Math.floor(garden.width / 20) * 50}
              type={getGardenType(garden.type)}
              gardenId={garden.id}
              plantsInGarden={garden.plantsInGarden}
            />

            <Accordion >
              <Accordion.Item eventKey="0">
                <Accordion.Header className='accordion-haeder'>
                  New garden type
                </Accordion.Header>
                <Accordion.Body>
                  By selecting a new type of garden you will change the type and
                  clear the plants.
                  <br></br>
                  <label for="gardenType"></label>
                  <select id="gardenType" name="gardenType" onChange={(event) => {
                    setNewType(event.target.value)
                  }}>
                    <option value="nothing" selected="selected">Select new garden type:</option>
                    <option value="giving">Giving</option>
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="heavy">Heavy</option>
                  </select>
                  <button className='new-type-button' onClick={(event) => { newTypeOfGarden(garden.id) }}>Set new plants</button>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

            <button
              className='delete-garden-button'
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

      <footer>

      </footer>
    </div>
  )
}

export default Garden
