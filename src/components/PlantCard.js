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
                <h3 data-testid="plant">{props.name}</h3>  
                <img height= "100px" width = "80px" src={(`${props.url}`)} alt={props.name} /> 
                <p data-testid= 'type'>Type: {props.type}</p>   
                <p data-testid= 'friends'>Friends: {props.friends}</p>  
                <p data-testid= 'avoid'>Avoid: {props.avoid}</p>  
                <p data-testid='harvest'>Time to harvest: {props.minTime} - {props.maxTime} days</p>
            </div>
         </div>

  )
}