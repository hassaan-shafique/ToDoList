import React from 'react'

export default function Todo({ todo, toggleTodo }) {
  
    function handleTodoClick(){
        toggleTodo(todo.id)
    }
  
  return (
    <div>
        <label class="">
            <input class="m-2 font-bold" type='checkbox' checked={todo.completed} onChange={handleTodoClick} />
            {todo.name}
        </label>
    </div>
  )
}
