import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { BrowserRouter as Router } from "react-router-dom";
//import Garden from "./Garden";

//import Login from "./components/Login";
//import Register from "./components/Register";
import ToDoComponent from "./components/ToDoComponent";


ReactDOM.render(
  <React.StrictMode>
    

    <ToDoComponent />
    <App />
   
    
  </React.StrictMode>,
  document.getElementById("root")
);


