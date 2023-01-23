import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { apiGetPrevTodos, apiUpdateTodo, apiDeletePrevTodos } from "../api/todos";
import { apiRefresh } from "../api/user";
import useTodoStore from "../hooks/useTodoStore";
import useVisibleTab from "../hooks/useVisibleTab";
import Todo from "../components/Todo";
import Loading from "../components/Loading";
import dayjs from "dayjs";

const Completed = () => {

  const authDetails = useTodoStore((state) => state.authDetails)
  const setAuthDetails = useTodoStore((state) => state.setAuthDetails)
  const doneTodos = useTodoStore((state) => state.doneTodos)
  const setDoneTodos = useTodoStore((state) => state.setDoneTodos)
  const visible = useVisibleTab()

  const [ change, setChange ] = useState(0)

  const [ isLoading, setIsLoading ] = useState(false)

  const navigate = useNavigate()

  const toggleDone = async (id, done) => {
    // disable checkbox on click
    // const checkbox = document.getElementById(id)
    // if (done) {
    //   checkbox.setAttribute("disabled checked", true)
    // } else {
    //   checkbox.setAttribute("disabled", true)
    // }
    
    const edit = doneTodos.find(todo => todo.id === id)      
    const update = {
      ...edit,
      done: !done
    }      
    const editIndex = doneTodos.findIndex(todo => todo.id === id)
    
    const temp = doneTodos
    temp[editIndex] = update
    const todosUpdated = [...temp]

    setDoneTodos(todosUpdated)

    const updateServer = async () => {
      await apiUpdateTodo(update.id, {
        done: update.done,
        text: update.text,
        userId: update.UserId,
        date: dayjs().format('YYYY/MM/DD')
      }, authDetails?.accessToken)
      // navigate("/")
      setChange(prev => prev + 1)
    }

    try {
      await updateServer()
      // navigate("/")
      // setChange(prev => prev + 1)
    } catch (error) {
      navigate("/")
    }  
  }
  
  useEffect(() => {

    const getAllTodos = () => {
      setIsLoading(true)
      apiGetPrevTodos(authDetails?.id, authDetails?.accessToken)
      .then((response) => {
        // console.log(response.data)
        if (response) {
          setDoneTodos(response.data)
        }   
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error)
        navigate("/")
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

  useEffect(() => {
    apiRefresh()
    .then((response) => {
      if (response?.data?.accessToken) {
        setAuthDetails(response?.data)
      }
      else {
        navigate('/login')
      }
    })
    
  }, [visible])

  const todoCards = doneTodos.map((todo) => {
    
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
      <button className="btn btn-primary dark:btn-secondary sm:ml-10 md:ml-28 my-2" 
              onClick={() => {deletePrevTodos(authDetails.id, setIsLoading)}}>Clear All</button>
      </div>
      
      <div className="flex flex-col max-w-md items-stretch align-center sm:ml-10 md:ml-24">
        {todoCards}
        {doneTodos.length === 0 && !isLoading && <div className="">No todos</div>}
      </div>

      {isLoading && <div className="flex justify-center"><Loading /></div>}    
      
    </>
  )
}

export default Completed