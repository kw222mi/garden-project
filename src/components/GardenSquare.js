import React from 'react'

/*
<div className="garden">
            {Array(Math.floor(garden.height/20)).fill(
            Array(Math.floor(garden.width/20)).fill(<GardenSquare />))}
            </div>
*/

/**
 *
 * @param props
 */
export default function GardenSquare (props) {
  return (
        <div
        class="square"
        id={props.plantId}
        src={props.url}
        ></div>
  )
}
