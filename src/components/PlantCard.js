import React from 'react'


/**
 *
 * @param props
 */
export default function PlantCard (props) {
 
  return (
        <div className='plant-card'>
            <div>    
                <h3>Please pick a place for the plant in the garden!</h3>
                <h3>{props.name}</h3>  
                <img height= "100px" width = "80px" src={(`${props.url}`)} alt={props.name} /> 
                <p>Type: {props.type}</p>   
                <p>Friends: {props.friends}</p>  
                <p>Avoid: {props.avoid}</p>  
                <p>Time to harvest: {props.minTime} - {props.maxTime} days</p>
            </div>
         </div>

  )
}