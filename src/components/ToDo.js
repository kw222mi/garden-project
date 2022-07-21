
import React from 'react'
import '../style.css'
// import Form from './Form'
import {
  collection,
  updateDoc,
  deleteDoc,
  doc
} from 'firebase/firestore'
import { db } from '../firebase-config'

/**
 *
 * @param {*} param0
 * @returns
 */
function ToDo ({ text, todo, todos, setTodos }) {
  const todolistCollectionRef = collection(db, 'todos')
  // Events

  /**
   *
   * @param {*} id
   */
  const deleteHandler = async (id) => {
    console.log(id)
    const todoDoc = doc(db, 'todos', id)
    console.log(todoDoc)
    await deleteDoc(todoDoc)
    setTodos(todos.filter((el) => el.id !== todo.id))
  }
  /*
  const deleteHandler = () => {
    setTodos(todos.filter((el) => el.id !== todo.id))
  }
  */

  /**
   *
   * @param {*} id
   * @param {*} completed
   */

  /**
   *
   * @param id
   * @param completed
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
  /*
  const completeHandler = () => {
    setTodos(todos.map(item => {
      if(item.id === todo.id){
        return{
          ...item, completed: !item.completed
        }
      }
      return item
    }))
  }
  */

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
