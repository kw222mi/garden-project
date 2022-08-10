import React from 'react'

/**
 * Component to show info of plants.
 *
 * @param {*} props - incomming props
 * @returns {HTMLElement} - the plantcard
 */
export default function PlantCard (props) {
  return (
        <div className='plant-card'>
            <div>
                <h4 className='plant-card-h4'>Please pick a place for the plant in the garden!</h4>
                <h3 className='plant-card-plantname'data-testid="plant">{props.name}</h3>
                <img className='plant-card-img'height= "100px" width = "80px" src={(`${props.url}`)} alt={props.name} />
                <p className='plant-card-p' data-testid= 'type'>Type: {props.type}</p>
                <p className='plant-card-p' data-testid= 'friends'>Friends: {props.friends}</p>
                <p className='plant-card-p' data-testid= 'avoid'>Avoid: {props.avoid}</p>
                <p className='plant-card-p' data-testid='harvest'>Time to harvest: {props.minTime} - {props.maxTime} days</p>
            </div>
         </div>

  )
}
