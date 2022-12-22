import { useState } from 'react'

const NewTodo = () => {

    const addTodo = (e) => {
        e.preventDefault()
        console.log(e.target[0].value)
    }

    return (

        <>
        <div className="flex flex-col max-w-md items-stretch align-center sm:ml-10 md:ml-24">
        <div className="card bg-base-200 shadow-xl px-4 py-1 my-1 max-w-md flex flex-row justify-between items-center">
            <form className="text-xl flex flex-start justify-items-start" onSubmit={(e) => addTodo(e)}>
                <input type="text" placeholder="Type here" className="input w-full max-w-xs" />
            </form>
            
        </div>
        </div>
        </>
    )
}

export default NewTodo

