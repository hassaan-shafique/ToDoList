import React, {useState, useRef} from "react";
import TodoList from "./TodoList"
import { v4 as uuidv4 } from 'uuid';



function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

 
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

function handleAllClearTodo(){
  // []updates the state with an empty array,leading to re-render the components and removal of all todos from UI
  setTodos([]);
}

  return ( 
  <>
    <div class="grid h-screen place-items-center"> 
      <div class="bg-violet-400 p-5 h-4/6 w-3/4">
        <h1 class=" flex ml-[20rem]  text-center font-bold text-xl font-sans "> Hassaan's To do List</h1>
       
        

        <div class="w-full py-3">  
         
          <div class="flex items-end">
            <input type="text" id="small-input" ref={todoNameRef}  placeholder="Add New Task Here" class="block w-full p-2 border border-gray-300 rounded-lg" />
    
            <div class="m-1">
              <button  class="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded-full"  onClick={handleAddTodo}>Add</button>
            </div>

          </div>
        </div>
        
        <div class="bg-gray-300 px-3 pb-3 h-4/6 overflow-y-auto py-5">
          <TodoList todos={todos} toggleTodo={toggleTodo}/>
        </div>

      <div class="w-full py-2"> 

         <div class="text-center">{(todos.filter(todo => !todo.completed).length)} Remaining Task</div>
          <div class="text-left py-3 ">
            <button class="bg-sky-500 pr-4  hover:bg-red-500 text-white mt-3 mr-5 px-3 rounded-t-lg border-4 border-black text-center" onClick={handleClearTodo}>Delete Completed Tasks</button>
          </div>
           <div class="text-right py-2 -m-12 mr-1">
            <button class="bg-sky-500 pr-4   hover:bg-red-500 text-white -mt-8 mr-5 px-3 rounded-t-lg border-4 border-black text-center" onClick={handleAllClearTodo}>Delete All Tasks</button>
          </div>
        </div>

      </div>
    </div>
  </>
  );
}

export default App;
