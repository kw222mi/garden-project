import React from "react";
import { useDrag } from "react-dnd";

function Picture({ id, url }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "image",
    item: { id: id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return (
    <img
    className="picture--ikon"
      ref={drag}
      src={url}
      
      style={{ opacity: isDragging ? "0.5" : "1" }}
    />
  );
}

export default Picture;