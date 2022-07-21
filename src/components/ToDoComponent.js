
import React, { useState, useEffect } from 'react'
import '../style.css'
import Form from './Form'
import ToDoList from './ToDoList'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase-config'

/**
 *Component to hold the todolist and the form to add todos.
 *
 * @returns {HTMLElement} - render the todo and form components.
 */
function ToDoComponent () {
  // use stat
  const [inputText, setInputText] = useState('')
  const [todos, setTodos] = useState([])
  const [status, setStatus] = useState('all')
  const [filteredTodos, setFilteredTodos] = useState([])

  const todolistCollectionRef = collection(db, 'todos')

  // use effect
  useEffect(() => {
    filterHandler()
  }, [todos, status])

  useEffect(() => {
    /**
     *Get the list of todos.
     */
    const getTodos = async () => {
      const data = await getDocs(todolistCollectionRef)
      data.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data())
      })

      setTodos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    getTodos()
  }, [])

  // Functions
  /**
   *Function to filter the todos.
   */
  const filterHandler = () => {
    switch (status) {
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
    <div className="todolist-container">
      <header>
        <h1>Todo list</h1>
      </header>
      <Form todos={todos} setTodos={setTodos} inputText={inputText} setInputText={setInputText}
        setStatus={setStatus}
      />
      <ToDoList setTodos={setTodos} todos={todos} filteredTodos={filteredTodos} />
    </div>
  )
}

export default ToDoComponent
