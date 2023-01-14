import { useState, useContext } from 'react';
import { apiAddTodos } from '../api/todos';
import { AppContext } from "../App";
import useTodoStore from "../hooks/useTodoStore";

const NewTodo = ({ userId, setIsAdding, setChange }) => {

    const [ isLoading, setIsLoading ] = useState(false)
    const [ isError, setIsError ] = useState(false)
    const [ todo, setTodo ] = useState("")

    // const { authDetails } = useContext(AppContext) || {}
    const authDetails = useTodoStore((state) => state.authDetails)

    const handleTodo = (e) => {
        if (e.target.value) setIsError(false)
        // console.log(e.target.value)
        setTodo(e.target.value)
    }

    const addTodo = (e) => {
        setIsError(false)
        setIsLoading(true)
        e.preventDefault()
        // console.log(e.target[0].value)
        // if (e.target[0].value === "") {
        //     setIsError(true)
        //     return
        // }
        if (todo === "") {
            setIsError(true)
            setIsLoading(false)
            return
        }
        const data = {
            userId: userId,
            text: todo
        }
        // console.log(data)
        apiAddTodos(data, authDetails?.accessToken)
        .then((response) => {
            // console.log(response.data)
            if (response) {
              setIsAdding(prev => !prev)
              setChange(prev => prev + 1)
            }   
        })
        .catch((error) => {
        console.log(error)
        })
        .finally(
            setIsLoading(false)
        )               
        
    }

    return (

        <>
        <div className="flex flex-col max-w-md items-stretch align-center sm:ml-10 md:ml-24">
        <div className="card bg-base-200 shadow-xl px-4 py-1 my-1 max-w-md flex flex-row justify-between items-center">
            <form className="text-xl flex flex-start justify-items-start" onSubmit={(e) => addTodo(e)}>
                <input type="text" placeholder="Type here" onChange={(e) => handleTodo(e)} 
                    className="input w-full max-w-xs" autoFocus/>
                <input type="submit" className='btn btn-secondary sm:ml-10 md:ml-28' value="Add" />       
            </form>    
            
        </div>

        {isLoading && <div className=''>Adding...</div>}
        {isError && <div className=''>Field cannot be empty</div>}
        </div>
        </>
    )
}

export default NewTodo

