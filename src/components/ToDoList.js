import React from 'react'
import '../style.css'
import Form from './Form'
import ToDo from './ToDo'

const ToDoList=({todos, setTodos, filteredTodos}) => {

    return(
       
            <div className="todo-container">
           
            <ul className="todo-list"></ul>
            {filteredTodos.map(todo => (
                <ToDo setTodos={setTodos} 
                todo={todo} todos={todos} key={todo.id} text={todo.text}/>
            ))  }
        </div>

        
    )
  }

export default ToDoList