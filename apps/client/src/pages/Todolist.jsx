import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { apiGetTodos, apiUpdateTodo } from "../api/todos";
import { apiRefresh } from "../api/user";
import useTodoStore from "../hooks/useTodoStore";
import useVisibleTab from "../hooks/useVisibleTab";
import NewTodo from "../components/NewTodo";
import Todo from "../components/Todo";
import Loading from "../components/Loading";
import dayjs from "dayjs";

const Todolist = () => {

  const authDetails = useTodoStore((state) => state.authDetails)
  const setAuthDetails = useTodoStore((state) => state.setAuthDetails)
  const todos = useTodoStore((state) => state.todos)
  const setTodos = useTodoStore((state) => state.setTodos)
  const visible = useVisibleTab()
  
  const [ change, setChange ] = useState(0)

  const [ isAdding, setIsAdding ] = useState(false)
  const [ isLoading, setIsLoading ] = useState(false) 
  
  const navigate = useNavigate()

  const toggleDone = useCallback(async (id, done) => {
    // disable checkbox on click
    // const checkbox = document.getElementById(id)
    // if (done) {
    //   checkbox.setAttribute("disabled checked", true)
    // } else {
    //   checkbox.setAttribute("disabled", true)
    // }
    

    const edit = todos.find(todo => todo.id === id)     
    // console.log(dayjs(edit.createdAt).format('YYYY/MM/DD')) 
    const update = {
      ...edit,
      done: !done
    }      
    const editIndex = todos.findIndex(todo => todo.id === id)
    
    // setTodos(prev => {      
      
    //   const temp = prev
    //   temp[editIndex] = update
    //   return [...temp]
    // })

    const temp = todos
    temp[editIndex] = update
    const todosUpdated = [...temp]

    setTodos(todosUpdated)
    
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
  }, [todos])

  useEffect(() => {

    const getAllTodos = () => {
      setIsLoading(true)
      apiGetTodos(authDetails?.id, authDetails?.accessToken)
      .then((response) => {
        if (response) {
          setTodos(response.data)
        }   
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error)
        navigate("/")
      })
    }

    const delay = setTimeout(getAllTodos, 0)
    
    return () => clearTimeout(delay)
    
  }, [change])

  
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

  
  const todoCards = todos.map((todo) => {
    
    return (
      
      <Todo toggleDone={toggleDone} todo={todo} setChange={setChange} key={todo.id}/>
    )
  })

  return (
    <>
      {
        authDetails?.email ?
        <Outlet /> :
        <Navigate to="/login" />
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
          <button className="btn btn-primary dark:btn-secondary sm:ml-10 md:ml-28 my-2" 
            onClick={() => {setIsAdding(prev => !prev)}}>Add Todo</button>
        }
        
      </div>  
     
      <div className="flex flex-col max-w-md items-stretch align-center sm:ml-10 md:ml-24">
        {todoCards}
        {todos.length === 0 && !isLoading && <div className="">No todos</div>}
      </div>

      {isLoading && <div className="flex justify-center"><Loading /></div>}    
      
    </>
  )
}

export default Todolist