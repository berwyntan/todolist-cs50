import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../App";

const Navbar = () => {

  const { authDetails } = useContext(AppContext) || {}
  const name = authDetails?.name

  return (
    <div className="navbar bg-base-100 justify-start p-1">
        <Link to="/">
            <div className="btn btn-ghost normal-case text-xl sm:ml-10 md:ml-24">
              {name && `${name}'s`} ToDoList
            </div>
        </Link>   
        <div className="btn btn-ghost normal-case text-lg ml-10 sm:ml-24">Completed</div>     
    </div>
  )
}

export default Navbar