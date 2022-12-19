import { Navigate, Outlet } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../App";
import axios from "axios";

const apiGetTodos = async (id) => {
  try {
    const response = await axios.get(`/api/todo/${id}`)
    return response
  } catch (error) {
    return response.error
  }
}

const apiUpdateTodo = async (id, data) => {
  try {
    const response = await axios.post(`/api/todo/${id}`, data,
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      }
    )
    return response
  } catch (error) {
    return response.error
  }
}

const Todolist = () => {

  const { authDetails } = useContext(AppContext) || {}

  const [ todos, setTodos ] = useState([])
  const [ change, setChange ] = useState(0)

  useEffect(() => {
    apiGetTodos(authDetails?.id)
    .then((response) => {
      console.log(response.data)
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
      console.log(update.id)
      console.log(update.done)
      console.log(update.text)
      apiUpdateTodo(update.id, {
        done: update.done,
        text: update.text
      })
    }

    updateServer()
    setChange(prev => prev + 1)
    // console.log(change)
  }

  useEffect(() => {

    const getAllTodos = () => {
      apiGetTodos(authDetails?.id)
      .then((response) => {
        console.log(response.data)
        if (response) {
          setTodos(response.data)
        }   
      })
      .catch((error) => {
        console.log(error)
      })
    }

    const delay = setTimeout(getAllTodos, 4000)

    return () => clearTimeout(delay)
    
  }, [change])

  const todoCards = todos.map((todo) => {
    
    return (
      <>
        <div className="card bg-base-200 shadow-xl px-4 py-1 my-1 max-w-md flex flex-row justify-between items-center">
          <div className="text-xl flex flex-start justify-items-start">{todo.text}</div>
          <div className="flex items-end right-0">
            <label className="label cursor-pointer justify-items-end">
              {/* <span className="label-text text-xl">{todo.text}</span>  */}
              <input type="checkbox" checked={todo.done} className="checkbox checkbox-primary"
                onChange={() => toggleDone(todo.id, todo.done)}
              />
            </label>
          </div>          
        </div>
      </>
    )
  })

  return (
    <>
      {
        authDetails.email ?
        <Outlet /> :
        <Navigate to="/" />
      }
      
      <div className="flex flex-col max-w-md items-stretch align-center sm:ml-10 md:ml-24">
        {todoCards}
        {todos.length === 0 && <div className="">No todos</div>}
      </div>
      
    </>
  )
}

export default Todolist