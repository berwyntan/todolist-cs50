import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { apiUpdateTodo } from "../api/todos";
import { AppContext } from "../App";
import calendar from "../assets/calendar.png";

const Todo = ({ toggleDone, todo, setChange }) => {

    const [ edit, setEdit ] = useState(false)
    const [ text, setText ] = useState(todo.text)
    // console.log(todo.UserId)
    const { authDetails } = useContext(AppContext) || {}

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
        apiUpdateTodo(todo.id, data, authDetails?.accessToken)
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
                        className="input w-full max-w-xs text-left" value={text} onChange={(e) => {setText(e.target.value)}}/>
                </form> :
                <div className="text-lg flex flex-start justify-items-start text-left"  
                    onClick={() => setEdit(prev => !prev)}>{todo.text}</div>
            }
            
            
            </div>

            <div className="flex items-end right-0">
            <div className="flex dark:invert items-center ml-3">
                <Link to={`/heatmap/${todo.id}`}>
                <img className="max-h-6 mb-2 mr-3 opacity-75" src={calendar} />
                </Link>
            </div>
            <label className="label cursor-pointer justify-items-end">
                {/* <span className="label-text text-xl">{todo.text}</span>  */}
                <input type="checkbox" checked={todo.done} className="checkbox checkbox-primary"
                onChange={() => toggleDone(todo.id, todo.done)} id={`${todo.id}`}
                />
            </label>
            
            </div>          
        </div>
        </>
    )
}

export default Todo