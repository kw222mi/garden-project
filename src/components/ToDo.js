
import React from 'react'
import '../style.css'
import {
  // collection,
  updateDoc,
  deleteDoc,
  doc
} from 'firebase/firestore'
import { db } from '../firebase-config'
import './todo.css'

/**
 * Component to hold a single to do element.
 *
 * @param {*} param - props to set the todo element.
 * @returns {HTMLElement} - the component to hold a single todo.
 */
function ToDo ({ text, todo, todos, setTodos }) {
  /**
   * Function to delete a todo.
   *
   * @param {*} id - the id of the todo element
   */
  const deleteHandler = async (id) => {
    console.log(id)
    const todoDoc = doc(db, 'todos', id)
    console.log(todoDoc)
    await deleteDoc(todoDoc)
    setTodos(todos.filter((el) => el.id !== todo.id))
  }

  /**
   * Function to handle the complete of a task.
   *
   * @param {*} id - the id of the todo from db.
   * @param {boolean} completed - if the todo is completed or not.
   */
  const completeHandler = async (id, completed) => {
    const todoDoc = doc(db, 'todos', id)
    const completedUpdate = { completed: !completed }
    await updateDoc(todoDoc, completedUpdate)
    setTodos(todos.map(item => {
      if (item.id === todo.id) {
        return {
          ...item, completed: !item.completed
        }
      }
      return item
    }))
  }

  return (
            <div className="todo">
           <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>{text}</li>
            <button onClick={() => { completeHandler(todo.id, todo.completed) }}className='complete-btn'><i className='fas fa-check'></i></button>
            <button onClick={() => { deleteHandler(todo.id) }}
            className='trash-btn'><i className='fas fa-trash'></i></button>
        </div>
  )
}

export default ToDo
