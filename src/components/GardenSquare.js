import React from 'react'



/**
 *
 * @param props
 */
export default function GardenSquare (props) {
 
  return (
        <div
        className="square"
        name={props.name}
        id={props.id}
        
        >
        <button id= {props.id} onClick={props.onClick}
        >      
        <img height= "40px" width = "40px" src={(`${props.url}`)} alt={props.name} />       

              </button>
          
        </div>


  
   



  )
}
