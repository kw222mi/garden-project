import React from "react";
// import ReactDOM from "react-dom";
import App from "./App";
// import { auth } from "./firebase-config"
import { BrowserRouter as Router } from "react-router-dom";
// import Garden from "./components/Garden";
// import Login from "./components/Login";
// import Register from "./components/Register";
// import ToDoComponent from "./components/ToDoComponent";
// import DragDrop from "./DragDrop"
import { createRoot } from 'react-dom/client'
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'

 
const container = document.getElementById("root");
const root = createRoot(container);
 
root.render(
 
  <DndProvider backend={HTML5Backend}>
  <Router>
    <App />
    </Router>
    </DndProvider>
    
 
);

/*
ReactDOM.render(
  <React.StrictMode>
    <Router>
    <App />
    </Router>
   <Garden/>
  </React.StrictMode>,
  document.getElementById("root")
);
*/


