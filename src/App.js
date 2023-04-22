import React, {useState, useRef, useEffect} from "react";
import TodoList from "./TodoList"
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedTodos) setTodos(storedTodos)
    console.log(storedTodos)
  }, []) 

  useEffect(() => {
    console.log("useeff")
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])


  function toggleTodo(id){
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.completed = !todo.completed
    setTodos(newTodos)
  }

  function handleAddTodo(e){
    const name = todoNameRef.current.value
    if (name === '' ) return 
    setTodos(prevTodos => {
      return [...prevTodos, {id:uuidv4(), name: name, complete: false }]
    })
    todoNameRef.current.value = null
  }
  
function handleClearTodo(){
  const newTodos = todos.filter(todo => !todo.completed)
  setTodos(newTodos)
}

  return ( 
  <>
    <div class="grid h-screen place-items-center">
      <div class="bg-sky-200 p-5 h-4/6 w-1/5">
        <h1 class="text-center p-1">To do List</h1>
        <div class="w-full">
          <label for="small-input" class="">Add new task: </label>
          <div class="flex items-end">
            <input type="text" id="small-input" ref={todoNameRef} class="block w-full p-2 border border-gray-300 rounded-lg" />
            <div class="m-1">
              <button class="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded-full" onClick={handleAddTodo}>Add</button>
            </div>
          </div>
        </div>
        
        <div>
        </div>

        <TodoList todos={todos} toggleTodo={toggleTodo}/>
        <div class="w-full flex items-end">
          <div class="w-1/2 text-end">{todos.filter(todo => !todo.completed).length} left todo</div>
          <button class="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded-full" onClick={handleClearTodo}>Clear Completed</button>
        </div>
      </div>
    </div>
  </>
  );
}

export default App;
