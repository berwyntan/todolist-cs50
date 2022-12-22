import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../App";

const Navbar = () => {

  const { authDetails } = useContext(AppContext) || {}
  const name = authDetails?.name

  return (
    <div className="navbar bg-base-100 justify-start p-1 border-4">
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
        {name && <div className="ml-10">Logout</div>}
    </div>
  )
}

export default Navbar