import { useState } from 'react';
import { apiAddTodos } from '../api/todos';


const NewTodo = ({ userId, setIsAdding, setChange }) => {

    const [ isLoading, setIsLoading ] = useState(false)
    const [ isError, setIsError ] = useState(false)

    const addTodo = (e) => {
        setIsError(false)
        e.preventDefault()
        // console.log(e.target[0].value)
        if (e.target[0].value === "") {
            setIsError(true)
            return
        }
        const data = {
            userId: userId,
            text: e.target[0].value
        }
        // console.log(data)
        setIsLoading(true)
        apiAddTodos(data)
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
        setIsLoading(false)
        
    }

    return (

        <>
        <div className="flex flex-col max-w-md items-stretch align-center sm:ml-10 md:ml-24">
        <div className="card bg-base-200 shadow-xl px-4 py-1 my-1 max-w-md flex flex-row justify-between items-center">
            <form className="text-xl flex flex-start justify-items-start" onSubmit={(e) => addTodo(e)}>
                <input type="text" placeholder="Type here" className="input w-full max-w-xs" autoFocus/>
            </form>            
        </div>
        {isLoading && <div className=''>Adding...</div>}
        {isError && <div className=''>Field cannot be empty</div>}
        </div>
        </>
    )
}

export default NewTodo

