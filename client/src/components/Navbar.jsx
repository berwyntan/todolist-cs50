import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../App";

const Navbar = () => {

  const { authDetails, setAuthDetails } = useContext(AppContext) || {}
  const name = authDetails?.name

  return (
    <div className="navbar bg-base-100 justify-start p-1 border-b-2">
        {
          name &&
          <Link to="/todos">
            <div className="btn btn-ghost normal-case text-lg sm:ml-10 md:ml-24">
              ToDos
            </div>
          </Link>   
        }
        {
          name &&
          <Link to="/completed">
            <div className="btn btn-ghost normal-case text-lg ml-10 sm:ml-24">Done</div>  
          </Link>   
        }        
        {name && <div className="ml-10 cursor-pointer" onClick={() => setAuthDetails({})}>Logout</div>}
        {!name && <div className="btn btn-ghost normal-case text-lg ml-10 sm:ml-24">ToDo List</div>}
    </div>
  )
}

export default Navbar