
import { collection, addDoc } from 'firebase/firestore'
import React from 'react'
import '../style.css'
import { db } from '../firebase-config'

/**
 *
 * @param {*} param0
 * @returns
 */
const Form = ({ inputText, setInputText, todos, setTodos, setStatus }) => {
  const todolistCollectionRef = collection(db, 'todos')

  /**
   * Function to handle the text input.
   *
   * @param {ChangeEvent} e-text change event.
   * @param e
   */
  const inputTextHandler = (e) => {
    setInputText(e.target.value)
  }

  /**
   * Handle the submit
   *
   * @param {ClickEvent} e
   */
  const submitToDoHandler = async (e) => {
    e.preventDefault()
    await addDoc(todolistCollectionRef, { text: inputText, completed: false })

    setTodos([...todos, { text: inputText, completed: false }])
    setInputText('')
  }

  /**
   *
   * @param {ChangeEvent} e
   */
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

export default Form
