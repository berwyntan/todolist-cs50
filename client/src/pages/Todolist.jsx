import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../App";

const Todolist = () => {

  const { authDetails } = useContext(AppContext) || {}

  return (
    <>
      {
        authDetails.email ?
        <Outlet /> :
        <Navigate to="/" />
      }
      <div className="">Hello, {authDetails.name}</div>
    </>
  )
}

export default Todolist