import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { apiLogin } from "../api/user";
import { AppContext } from "../App";
import useTodoStore from "../hooks/useTodoStore";

const Login = () => {
  
  const [error, setError] = useState("") 
  const [isLoading, setIsLoading] = useState(false)
 
  const setAuthDetails = useTodoStore((state) => state.setAuthDetails)
  
  // const { setAuthDetails } = useContext(AppContext) || {}
   

  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm()
  const onSubmit = (formData) => {
    // console.log(formData)
    setIsLoading(true)
    apiLogin(formData)
    .then((response) => {
      // console.log(response)
      if (response.status === 200) {        
        setAuthDetails(response.data)
        setIsLoading(false)
        navigate("/")
      } else setError(response.data.message)
    })
    .catch((error) => {
      console.log(error)
    })
    
  }


  return (
    <>
      <div className='text-2xl'>Login: ToDoList</div>
 
      <form onSubmit={handleSubmit(onSubmit)} className="form-control">
        <div className="flex flex-col items-center">

        <label className="input-group flex flex-col items-center my-3">
        
        <input placeholder="Email" {...register("email", { 
          required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, onChange: () => setError("") })} 
          className="input input-bordered w-full max-w-xs"/>
        </label>

        <label className="input-group flex flex-col items-center my-3">
        
        <input type="password" autoComplete="off" placeholder="Password" {...register("password", { 
          required: true, onChange: (e) => {setError("")}
        })} 
          className="input input-bordered w-full max-w-xs"/>
           
        </label>

        <div className="my-4">
          {errors.email?.type === 'required' && <span>Email is required</span>}
          {errors.email?.type === 'pattern' && <span>Email is not valid</span>}

          {Boolean(errors.email) || errors.password?.type === 'required' && <span>Password is required</span>}
          
        </div>

        <div className="my-1">{error}</div>
        {isLoading && <div>Logging in...</div>} 
        <button className="btn btn-primary btn-wide" type="submit">Log In</button>
        </div>
      </form>

      <div className="mt-6 text-lg link">
        <Link to="/signup">
          Don't have an account? Sign up.
        </Link>     
      </div>    
    </>
  );
  
}

export default Login