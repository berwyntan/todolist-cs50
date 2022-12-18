import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../App";

const Navbar = () => {

  const { authDetails } = useContext(AppContext) || {}
  const name = authDetails?.name

  return (
    <div className="navbar bg-base-100">
        <Link to="/">
            <div className="btn btn-ghost normal-case text-2xl">
              {name && `${name}'s`} ToDoList
            </div>
        </Link>        
    </div>
  )
}

export default Navbar