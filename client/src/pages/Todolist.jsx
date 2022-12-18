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

const Todolist = () => {

  const { authDetails } = useContext(AppContext) || {}

  const [ todos, setTodos ] = useState([])
  

  useEffect(() => {
    apiGetTodos(authDetails.id)
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

  const todoCards = todos.map((todo) => {
    return (
      <>
        <div className="form-control max-w-md flex justify-center">
          <label className="label cursor-pointer">
            <span className="label-text text-xl">{todo.text}</span> 
            <input type="checkbox" checked={false} className="checkbox checkbox-primary" />
          </label>
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
      </div>
      
    </>
  )
}

export default Todolist