import { Link } from "react-router-dom";
import { apiLogout } from "../api/userProtected";
import useTodoStore from "../hooks/useTodoStore";

const Navbar = () => {

  const authDetails = useTodoStore((state) => state.authDetails)
  const setAuthDetails = useTodoStore((state) => state.setAuthDetails)
  const name = authDetails?.name
  const accessToken = authDetails?.accessToken

  const logout = () => {
    apiLogout(accessToken)
    setAuthDetails({})
  }

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
        {name && <div className="ml-10 cursor-pointer" onClick={logout}>Logout</div>}
        {!name && <div className="btn btn-ghost normal-case text-lg ml-10 sm:ml-24">ToDo List</div>}
    </div>
  )
}

export default Navbar