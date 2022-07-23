import React from 'react'
import peas from '../pictures/peas_ikon.jpg'
import onion from '../pictures/onion_ikon.jpg'
import carrot from '../pictures/carrot_ikon.jpg'
import cabbage from '../pictures/cabbage_ikon.jpg'
import beat from '../pictures/beat_ikon.jpg'
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



/**
 *
 * @param props
 */
export default function GardenSquare (props) {
let name = props.name
  console.log("propsname in square " + name)
  return (
        <div
        class="square"
        name={name}
        plantid={props.plantid}
        >
          <img src={(`${props.name}`)} alt={props.name}/>
          
        </div>
  )
}
