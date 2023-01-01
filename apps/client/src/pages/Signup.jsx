import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiSignup } from "../api/user";


const Signup = () => {

  const [error, setError] = useState("") 
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm()
  const onSubmit = (formData) => {
    console.log(formData)
    apiSignup(formData)
    .then((response) => {
      console.log(response.data)
      navigate("/")
    })
    .catch((error) => {
      console.log(error)
    })
    
  }

  return (
    <>
      <div className="text-2xl mb-2">Sign Up</div>
  
      <form onSubmit={handleSubmit(onSubmit)} className="form-control">
        <div className="flex flex-col items-center">
  
        <label className="input-group flex flex-col items-center my-3">
        
        <input placeholder="Name" {...register("name", { 
          required: true, maxLength: 30, onChange: () => setError("") })} 
          className="input input-bordered w-full max-w-xs"/>
        </label>
  
        <label className="input-group flex flex-col items-center my-3">
        
        <input placeholder="Email" {...register("email", { 
          required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, onChange: () => setError("") 
        })} 
          className="input input-bordered w-full max-w-xs"/>
        </label>
  
        <label className="input-group flex flex-col items-center my-3">
        
        <input type="password" autoComplete="off" placeholder="Password" {...register("password", { 
          required: true, minLength: 5, pattern: /^[a-z0-9]+$/i, 
          onChange: (e) => {setPassword(e.target.value); setError("")}
        })} 
          className="input input-bordered w-full max-w-xs"/>
         
        </label>
  
        <label className="input-group flex flex-col items-center my-3">
       
        <input type="password" autoComplete="off" placeholder="Confirm Password" {...register("confirmPassword", { 
          validate: value => value === password, onChange: () => setError("")
        })} 
          className="input input-bordered w-full max-w-xs"/>  
        </label>
  
        <div className="my-4">
          {errors.name?.type === 'required' && <span>Name is required</span>}
          {errors.name?.type === 'maxLength' && <span>Name cannot have more than 30 characters</span>}
  
          {Boolean(errors.name) || errors.email?.type === 'required' && <span>Email is required</span>}
          {Boolean(errors.name) || errors.email?.type === 'pattern' && <span>Invalid email</span>}  
  
          {Boolean(errors.name) || Boolean(errors.email) || errors.password?.type === 'required' && <span>Password is required</span>}
          {Boolean(errors.name) || Boolean(errors.email) || errors.password?.type === 'minLength' && <span>Password requires minimum of 5 characters</span>}
          {Boolean(errors.name) || Boolean(errors.email) || errors.password?.type === 'pattern' && <span>Password can only have alphanumeric characters</span>}  
  
          {Boolean(errors.name) || Boolean(errors.email) || Boolean(errors.password) || errors.confirmPassword?.type === 'validate' && <span>Passwords don't match</span>}        
        </div>
  
        <div className="my-1">{error}</div>
        
        <button className="btn btn-primary btn-wide" type="submit">Sign Up</button>
        </div>
      </form>
  
      <div className="mt-6 text-lg link">
        <Link to="/">
          Have an account? Log in.
        </Link>     
      </div>
      
    </>
  );
  
}

export default Signup