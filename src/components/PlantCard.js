import React from 'react'


/**
 *
 * @param props
 */
export default function PlantCard (props) {
let name = props.name
 
  return (
        <div className='plant-card'>
            <div>    
                <h3>Please pick a place for the plant in the garden!</h3>
                <h3>{props.name}</h3>  
                <img height= "100px" width = "80px" src={(`${props.url}`)} alt={props.name} /> 
                <p>Type: {props.type}</p>   
                <p>Friends: {props.friends}</p>  
                <p>Avoid: {props.avoid}</p>  
            </div>
         </div>

  )
}