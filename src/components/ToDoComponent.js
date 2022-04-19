

 
  import React, {useState, useEffect} from "react";
  import "../style.css";
  import Form from "./Form"
  import ToDoList from "./ToDoList"
  
  
  function ToDoComponent() {
    // use stat
    const [inputText, setInputText] = useState("")
    const [todos, setTodos] = useState ([])
    const[status, setStatus] = useState("all")
    const[filteredTodos, setFilteredTodos] = useState([])
  
     //use effect
     useEffect(() => {
       filterHandler()
     }, [todos, status])
  
    //Functions
    const filterHandler =() => {
      switch(status){
        case 'completed':
          setFilteredTodos(todos.filter(todo => todo.completed === true))
          break
          case 'uncompleted':
            setFilteredTodos(todos.filter(todo => todo.completed === false))
            break
            default:
              setFilteredTodos(todos)
              break
  
      }
    }
    return (
      <div className= "todolist-container">
        <header>
          <h1>Todo list</h1>
        </header>
        <Form todos={todos} setTodos={setTodos}inputText={inputText} setInputText={setInputText}
          setStatus={setStatus}
        />
        <ToDoList setTodos={setTodos} todos={todos} filteredTodos={filteredTodos}/>
      </div>
    )
   
  }
  
  
  
  export default ToDoComponent;