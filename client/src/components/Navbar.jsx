import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <div className="navbar bg-base-100">
        <Link to="/">
            <div className="btn btn-ghost normal-case text-2xl">ToDoList</div>
        </Link>        
    </div>
  )
}

export default Navbar