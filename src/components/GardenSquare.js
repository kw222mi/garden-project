import React from 'react'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

/**
 * Component to represent a garden square.
 *
 * @param {*} props - incomming props
 * @returns {HTMLElement} -the gardensquare
 */
export default function GardenSquare (props) {

      const placement = 'right'
        
  return (
        <div 
        className="square"
        name={props.name}
        id={props.id}
        >

        <OverlayTrigger
          key={placement}
          placement={placement}
          overlay={
            <Tooltip id={`tooltip-${placement}`}>
              {props.name}
            </Tooltip>
          }
        >
           <button id= {props.id} onClick={props.onClick}>
            <img className='garden-square-img' src={(`${props.url}`)} alt={props.name} />
            </button>
        </OverlayTrigger>
      
      
         
       
        </div>
  )
}
