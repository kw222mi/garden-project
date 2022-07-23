import React from 'react'
import { useDrag } from 'react-dnd'

/**
 * Component for a draggable picture.
 *
 * @param {*} root0 - root0
 * @param {string} root0.id - id for the ikon from database.
 * @param {string} root0.url - url to the picture.
 * @returns {HTMLElement} - the picture component
 */
function Picture ({ id, url }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'image',
    item: { id },
    /**
     * Monitor if the picture is dragged.
     *
     * @param {*} monitor - to monitor if the element is dragging
     * @returns {HTMLElement} - the picture component
     */
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }))
  return (
    <img
      ref={drag}
      src={url}
      width="150px"
      style={{ border: isDragging ? '5px solid red' : '0px' }}
    />
  )
}

export default Picture
