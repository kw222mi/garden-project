
import React, { useState, useEffect } from 'react'
import Form from './Form'
import ToDoList from './ToDoList'
import {
  collection,
  where,
  query,
  getDocs
} from 'firebase/firestore'
import { db } from '../firebase-config'
import { Link } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

/**
 * Component to hold the todolist and the form to add todos.
 *
 * @returns {HTMLElement} - render the todo and form components.
 */
function ToDoComponent () {
  // use stat
  const [inputText, setInputText] = useState('')
  const [todos, setTodos] = useState([])
  const [status, setStatus] = useState('all')
  const [filteredTodos, setFilteredTodos] = useState([])

  //const todolistCollectionRef = collection(db, 'todos')

  const auth = getAuth()
  let uid

  // Set new current user if the user changes or log out.
  onAuthStateChanged(auth, (user) => {
    if (user) {
    // User is signed in
      uid = user.uid
    } else {
      console.log('User is signed out')
    }
  })

  // use effect

  useEffect(() => {
    
    /**
     *Get the list of todos.
     */

     //Get the current user
    const currentUser = auth.currentUser
    if (currentUser) {
    uid = currentUser.uid;
    }
    else {
    console.log('User is signed out')
    }

    const getTodos = async () => {
      try {
        const q = query(collection(db, 'todos'), where('userId', '==', uid))
        const data = await getDocs(q)
        setTodos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      } catch (e) {
        console.log(e)
      }
    }
    getTodos()
    
  }, [])

  useEffect(() => {
    filterHandler()
  }, [todos, status])

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
    <div className="todolist-container"> <div>
    <Link to="/" className="btn btn-primary w-100 mt-3">
          Menu
        </Link>
    </div>
      <div>
      <Link to="/garden" className="btn btn-primary w-100 mt-3">
            My garden
          </Link>
      </div>
      <header>
        Todo list
      </header>
      <Form todos={todos} setTodos={setTodos} inputText={inputText} setInputText={setInputText}
        setStatus={setStatus}
      />
      <ToDoList setTodos={setTodos} todos={todos} filteredTodos={filteredTodos} />
    </div>
  )
}

export default ToDoComponent
