import React from 'react'
import { useDrag } from 'react-dnd'

/**
 *
 * @param root0
 * @param root0.id
 * @param root0.url
 */
function Picture ({ id, url }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'image',
    item: { id },
    /**
     *
     * @param monitor
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
