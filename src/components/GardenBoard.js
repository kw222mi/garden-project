import React, { useState, useEffect } from 'react'
import '../style.css'
import { db } from '../firebase-config'
import {
  collection,
  getDocs,
  updateDoc,
  where,
  query,
  doc
} from 'firebase/firestore'
import './gardenBoard.css'
import GardenSquare from './GardenSquare'
import PlantCard from './PlantCard'
import Progressbar from './Progressbar'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
 /* eslint-disable */
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
import soil from '../pictures/soil_ikon.jpg'
 /* eslint-disable */
const PictureList = [
  {
    id: 1,
    url: peas
  },
  {
    id: 2,
    url: onion
  },
  {
    id: 3,
    url: cabbage

  },
  {
    id: 4,
    url: carrot

  },
  {
    id: 5,
    url: beet

  },
  {
    id: 6,
    url: lettuce

  },
  {
    id: 7,
    url: pumpkin

  },
  {
    id: 8,
    url: dill

  },
  {
    id: 9,
    url: bean

  },
  {
    id: 10,
    url: radish

  },
  {
    id: 11,
    url: squash

  },
  {
    id: 12,
    url: parsley

  },
  {
    id: 13,
    url: potato

  },
  {
    id: 14,
    url: tomato

  },
  {
    id: 15,
    url: cucumber

  },

  {
    id: 16,
    url: soil

  }
]  
/* eslint-enable */

/**
 * Component for the board of the garden, holding plants.
 *
 * @param {*} props -garden data from Garden
 * @returns {HTMLElement} -The board of the garden
 */
function GardenBoard (props) {
  // const [board, setBoard] = useState([{ }])
  const [plantsInGarden, setPlantsInGarden] = useState(props.plantsInGarden)
  const [plantList, setPlantList] = useState([])
  const [sortedPlantList, setSortedPlantList] = useState([])
  const [selectedPlant, setSelectedPlant] = useState([])
  const [progressData, setProgressData] = useState([])
  const plantsCollectionRef = collection(db, 'plants')

  const gardenId = props.gardenId
  const auth = getAuth()
  let uid
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in
      uid = user.uid
    } else {
      console.log('User is signed out')
    }
  })

  useEffect(() => {
    setPlantsInGarden(props.plantsInGarden)
  }, [props.plantsInGarden])

  useEffect(() => {
    setProgressbar()
  }, [])

  useEffect(() => {
    savePlantsInGarden(gardenId, plantsInGarden)
  }, [plantsInGarden])

  useEffect(() => {
    /**
     * Get all the plants from teh database to show in droplist.
     */
    const getPlants = async () => {
      const data = await getDocs(plantsCollectionRef)
      setPlantList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      setSortedPlantList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    getPlants()
  }, [])

  useEffect(() => {
    /**
     * Get the plants in the garden from the database.
     */
    const getPlantsInGarden = async () => {
      const q = query(collection(db, 'gardens'), where('userId', '==', uid))
      const data = await getDocs(q)
      // let test = data.getValue(plantsInGarden)
      console.log('data.docs ' + data.docs.data)
    }
    getPlantsInGarden()
    console.log('get array' + plantsInGarden)
  }, [])
  /**
   * Save the plants in the database.
   *
   * @param {string} id -The id of the garden.
   * @param {Array} plantsInGarden - The plants in the garden.
   */
  const savePlantsInGarden = async (id, plantsInGarden) => {
    const gardenDoc = doc(db, 'gardens', id)
    const newField = { plantsInGarden }
    await updateDoc(gardenDoc, newField)
  }

  /**
   * Sort the plants in the list.
   *
   * @param {*} event - onChane event
   */
  const sortPlantList = (event) => {
    const copyPlantList = [...plantList]

    // show all plants
    if (event.target.value === 'all') {
      setSortedPlantList(copyPlantList)
    }
    // sort the plants by time to harvest
    if (event.target.value === 'time_min') {
      const sortedPlants = copyPlantList.sort(({ time_min: a }, { time_min: b }) => a - b)
      setSortedPlantList(sortedPlants)
    }
    // show only plants type small
    if (event.target.value === 'small') {
      const onlySmall = copyPlantList.filter(copyPlantList => copyPlantList.type === 'small')
      setSortedPlantList(onlySmall)
    }
    // show only plants type giving
    if (event.target.value === 'giving') {
      const onlyGiving = copyPlantList.filter(copyPlantList => copyPlantList.type === 'giving')
      setSortedPlantList(onlyGiving)
    }
    // show only plants type medium
    if (event.target.value === 'medium') {
      const onlyMedium = copyPlantList.filter(copyPlantList => copyPlantList.type === 'medium')
      setSortedPlantList(onlyMedium)
    }
    // show only plants type heavy
    if (event.target.value === 'heavy') {
      const onlyHeavy = copyPlantList.filter(copyPlantList => copyPlantList.type === 'heavy')
      setSortedPlantList(onlyHeavy)
    }
  }

  /**
   * Add plants on the board and set the progressbar.
   *
   * @param {number} index -the number of the square on the board.
   */
  const gardenSquareClick = (index) => {
    let plantName
    let plantUrl
    let minTime

    if (selectedPlant.length === 0) {
      console.log('nothing selected')
    } else {
      selectedPlant.map((plant) => {
        plantName = plant.name
        return plantName
      })

      selectedPlant.map((plant) => {
        plantUrl = plant.url
        return plantUrl
      })

      selectedPlant.map((plant) => {
        minTime = plant.time_min
        return minTime
      })
      const startDate = Date.now()
      const finnishDate = startDate + minTime * 86400000
      const arr = [...plantsInGarden]
      console.log('selected plant name ' + selectedPlant)
      console.log('index name ' + arr[index].name)
      console.log('plant name ' + plantName)
      arr[index].name = plantName
      arr[index].url = plantUrl
      arr[index].startDate = startDate
      arr[index].finnishDate = finnishDate
      console.log('index date ' + arr[index].startDate)

      setPlantsInGarden(arr)
      setProgressbar()
    }
  }

  /**
   * Get all facts of a plant from the database.
   *
   * @param {*} event -onChange event
   */
  const showPlantFacts = async (event) => {
    if (event.target.value === 'nothing selected') {
      console.log('nothing selected')
      setSelectedPlant([])
    } else {
      try {
        const q = query(collection(db, 'plants'), where('name', '==', event.target.value))
        const data = await getDocs(q)
        data.forEach((doc) => {
          // console.log('hello' + doc.id, " => ", doc.data());

          setSelectedPlant(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        })
      } catch (e) {
        console.log(e)
      }
    }
  }

  /**
   * Set the array for the progressbar.
   *
   * @returns {Array} -array to set the progressbar.
   */
  const progressbarArray = () => {
    // copy the array of plants
    const copyPlantsInGarden = [...plantsInGarden]
    // sort the plants by time to harvest
    const sortedArray = copyPlantsInGarden.sort(({ finnishDate: a }, { finnishDate: b }) => a - b)
    // remove the duplicates
    const uniqArray = getUniqueListBy(sortedArray, 'name')
    // remove any empty slots
    if (uniqArray[0].name === '') {
      uniqArray.splice(0, 1)
    }
    // only show the 3 that will be ready first
    if (uniqArray.length > 3) {
      uniqArray.length = 3
    } else {
      console.log('no empty values')
    }
    console.log(uniqArray)
    return uniqArray
  }

  /**
   * Removes the duplicates of the array.
   *
   * @param {Array} sortedArray - incomming array
   * @param {string} key - the value to be uniqe
   * @returns {Array}- array of uniqe values
   */
  function getUniqueListBy (sortedArray, key) {
    return [...new Map(sortedArray.map(item => [item[key], item])).values()]
  }

  /**
   * Set the progressbar.
   */
  const setProgressbar = () => {
    let progress
    let plantname
    // get the date of today
    const todayDate = Date.now()
    const progressArray = progressbarArray()
    const data = []

    for (let i = 0; i < progressArray.length; i++) {
      progress = Math.floor(100 * (todayDate - progressArray[i].startDate) / (progressArray[i].finnishDate - progressArray[i].startDate))
      plantname = progressArray[i].name
      data.push({ name: plantname, bgcolor: '#376E6F', completed: progress })
    }
    setProgressData(data)
  }

  return (
    <div className='garden-board-container'>
    <div className='select-container'>
      <div className='plant-select-container'>
        <label for='plantsInGarden'></label>
        <select id='plantType' name='plantType' onChange={(event) => {
          showPlantFacts(event)
        }}>
          <option value='nothing selected' selected='false'>Choose plants to grow:</option>
          {sortedPlantList.map((plant) => {
            return <option name={plant.name} value={plant.name} >{plant.name}</option>
          })}
        </select>
      </div>
      <div className='sort-plants-container'>
        <label for='sortPlants'></label>
        <select id='sortPlants' name='sortPlants' onChange={(event) => {
          sortPlantList(event)
        }}>
          <option value='all' selected='false'>Show all plants</option>
          <option value='time_min'>Sort by time to harvest</option>
          <option value='giving'>Show only giving</option>
          <option value='small'>Show only small</option>
          <option value='medium'>Show only medium</option>
          <option value='heavy'>Show only heavy</option>
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
      </div>

      <div className='board-container'>

      <div className="board"
        style={{
          width: `${props.width}px`,
          height: `${props.height}px`,
          border: `5px solid ${props.type}`
        }}
      >
        {plantsInGarden.map((item, index) => {
          return <GardenSquare key={item.id} name={item.name} url={item.url} onClick={() => gardenSquareClick(index)} />
        })}
      </div>

      <div className="progressbar-container">
        {progressData.map((item, idx) => (
          <Progressbar key={idx} bgcolor={item.bgcolor} completed={item.completed} name={item.name} />
        ))}
      </div>
      </div>
    </div>
  )
}

export default GardenBoard
