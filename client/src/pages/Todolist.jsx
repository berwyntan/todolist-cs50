import { Navigate, Outlet } from "react-router-dom"

const Todolist = ({ authDetails }) => {
  return (
    <>
      {
        authDetails.email ?
        <Outlet /> :
        <Navigate to="/" />
      }
      <div className="">Todos</div>
    </>
  )
}

export default Todolist