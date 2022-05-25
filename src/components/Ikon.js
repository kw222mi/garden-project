import React from 'react'
import {useDrag} from 'react-dnd'


export default function Ikon({id, url}){
    const [{isDragging}, drag] = useDrag (() =>({
        type: "ikon", 
        item: {id:id},
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }))
    return (
        
            <img 
            className="ikon"
            ref={drag} 
            src={url}       
            style={{ opacity: isDragging ? "0.5" : "1" }}            
            />
            
       
    )
}