import { useState } from "react";
import { apiUpdateTodo } from "../api/todos";

const Todo = ({ toggleDone, todo, setChange }) => {

    const [ edit, setEdit ] = useState(false)
    const [ text, setText ] = useState(todo.text)
    // console.log(todo.UserId)

    const submit = (e) => {
        e.preventDefault()
        // console.log(e.target[0].value)
        setEdit(prev => !prev)
        if (e.target[0].value === todo.text) {
            return
        }
        const data = {
            text: e.target[0].value,
            done: todo.done,
            userId: todo.UserId
        }
        // console.log(data)
        // console.log(todo.id)
        apiUpdateTodo(todo.id, data)
        .then((response) => {
            // console.log(response.data)
            if (response) {
              setChange(prev => prev + 1)
            }   
        })
        .catch((error) => {
        console.log(error)
        })
    }

    return (
        <>
        <div className="card bg-base-200 shadow-xl px-4 py-1 my-1 max-w-md flex flex-row justify-between items-center dark:bg-slate-800">
            <div className="">
            
            {
                edit ?
                <form className="" onSubmit={(e) => submit(e)}>
                    <input type="text" placeholder="Type here" autoFocus
                        className="input w-full max-w-xs" value={text} onChange={(e) => {setText(e.target.value)}}/>
                </form> :
                <div className="text-xl flex flex-start justify-items-start"  
                    onClick={() => setEdit(prev => !prev)}>{todo.text}</div>
            }
            
            
            </div>
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
}

export default Todo