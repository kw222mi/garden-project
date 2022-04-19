
import { collection, addDoc } from 'firebase/firestore';
import React from 'react'
import "../style.css";
import { db } from "../firebase-config";

const Form = ({inputText, setInputText, todos, setTodos, setStatus}) => {
  
  const todolistCollectionRef = collection(db, "todolist")

    const inputTextHandler = (e) => {
        setInputText(e.target.value)
    }
    const submitToDoHandler =async (e) => {
        e.preventDefault()
        await addDoc(todolistCollectionRef, { name: inputText, completed: false})
        setTodos([...todos, {text:inputText, completed:false, id: Math.random()*1000}])
        setInputText("")
    }
    const statusHandler = (e) => {
        setStatus(e.target.value)
    }
    return (
        <form>
        <input value={inputText} onChange={inputTextHandler} type="text" className="todo-input" />
        <button onClick = {submitToDoHandler} className="todo-button" type="submit">
          <i className="fas fa-plus-square"></i>
        </button>
        <div className="select">
          <select onChange = {statusHandler} name="todos" className="filter-todo">
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="uncompleted">Uncompleted</option>
          </select>
        </div>
      </form>
    )
}

export default Form;