import { Navigate, Outlet } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../App";
import axios from "axios";
import { apiGetTodos, apiUpdateTodo } from "../api/todos";
import NewTodo from "../components/NewTodo";
import Todo from "../components/Todo";


const Todolist = () => {

  const { authDetails } = useContext(AppContext) || {}

  const [ todos, setTodos ] = useState([])
  const [ change, setChange ] = useState(0)

  const [ isAdding, setIsAdding ] = useState(false)
  const [ isLoading, setIsLoading ] = useState(false)
  
  useEffect(() => {
    apiGetTodos(authDetails?.id)
    .then((response) => {
      // console.log(response.data)
      if (response) {
        setTodos(response.data)
      }   
    })
    .catch((error) => {
      console.log(error)
    })
  }, [])

  const toggleDone = (id, done) => {
    // console.log(id, done)
    const edit = todos.find(todo => todo.id === id)      
    const update = {
      ...edit,
      done: !done
    }      
    const editIndex = todos.findIndex(todo => todo.id === id)
    
    setTodos(prev => {      
      
      const temp = prev
      temp[editIndex] = update
      return [...temp]
    })

    const updateServer = async () => {
      // console.log(update.id)
      // console.log(update.done)
      // console.log(update.text)
      apiUpdateTodo(update.id, {
        done: update.done,
        text: update.text,
        userId: update.UserId
      })
    }

    updateServer()
    setChange(prev => prev + 1)
    // console.log(change)
  }

  useEffect(() => {

    const getAllTodos = () => {
      setIsLoading(true)
      apiGetTodos(authDetails?.id)
      .then((response) => {
        // console.log(response.data)
        if (response) {
          setTodos(response.data)
        }   
      })
      .catch((error) => {
        console.log(error)
      })
      setIsLoading(false)
    }

    const delay = setTimeout(getAllTodos, 1000)

    return () => clearTimeout(delay)
    
  }, [change])

  const todoCards = todos.map((todo) => {
    
    return (
      
      <Todo toggleDone={toggleDone} todo={todo} setChange={setChange} key={todo.id}/>
    )
  })

  return (
    <>
      {
        authDetails.email ?
        <Outlet /> :
        <Navigate to="/" />
      }
      
      <div className="text-left font-semibold text-xl italic sm:ml-10 md:ml-28 my-2">{`${authDetails.name}'s`} ToDoList</div>
      
      <div className="flex items-start">
        { 
          isAdding ?
          <div className="my-2">
            <NewTodo 
              userId={authDetails.id}
              setIsAdding={setIsAdding}
              setChange={setChange}
            />
          </div> :
          <button className="btn btn-secondary sm:ml-10 md:ml-28 my-2" 
            onClick={() => {setIsAdding(prev => !prev)}}>Add Todo</button>
        }
        
      </div>  

      {isLoading && <div className="">Updating...</div>}    
      
      <div className="flex flex-col max-w-md items-stretch align-center sm:ml-10 md:ml-24">
        {todoCards}
        {todos.length === 0 && <div className="">No todos</div>}
      </div>
      
    </>
  )
}

export default Todolist