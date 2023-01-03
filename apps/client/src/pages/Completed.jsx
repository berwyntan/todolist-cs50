import { Navigate, Outlet } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../App";
import { apiGetPrevTodos, apiUpdateTodo, apiDeletePrevTodos } from "../api/todos";
import Todo from "../components/Todo";
import Loading from "../components/Loading";

const Completed = () => {

  const { authDetails } = useContext(AppContext) || {}

  const [ todos, setTodos ] = useState([])
  const [ change, setChange ] = useState(0)

  const [ isLoading, setIsLoading ] = useState(false)

  const toggleDone = (id, done) => {
    // disable checkbox on click
    // const checkbox = document.getElementById(id)
    // if (done) {
    //   checkbox.setAttribute("disabled checked", true)
    // } else {
    //   checkbox.setAttribute("disabled", true)
    // }

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
      }, authDetails?.accessToken)
    }

    updateServer()
    setChange(prev => prev + 1)
    // console.log(change)
  }

  useEffect(() => {

    const getAllTodos = () => {
      setIsLoading(true)
      apiGetPrevTodos(authDetails?.id, authDetails?.accessToken)
      .then((response) => {
        // console.log(response.data)
        if (response) {
          setTodos(response.data)
        }   
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error)
      })
    }

    const delay = setTimeout(getAllTodos, 500)

    return () => clearTimeout(delay)
    
  }, [change])

  const deletePrevTodos = (id, setIsLoading) => {
    setIsLoading(true)
    apiDeletePrevTodos(id, authDetails?.accessToken)
    .then((response) => {
      // console.log(response.data)
      if (response) {
        setChange(prev => prev + 1)
      }   
    })
    .catch((error) => {
      console.log(error)
    })
    setIsLoading(false)
  }

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
      
      <div className="text-left font-semibold text-xl italic my-2 sm:ml-10 md:ml-28">{`${authDetails.name}'s`} Completed ToDos
      </div>
      <div className="flex items-start">
      <button className="btn btn-secondary sm:ml-10 md:ml-28 my-2" 
              onClick={() => {deletePrevTodos(authDetails.id, setIsLoading)}}>Clear All</button>
      </div>
      
      <div className="flex flex-col max-w-md items-stretch align-center sm:ml-10 md:ml-24">
        {todoCards}
        {todos.length === 0 && !isLoading && <div className="">No todos</div>}
      </div>

      {isLoading && <div className="flex justify-center"><Loading /></div>}    
      
    </>
  )
}

export default Completed