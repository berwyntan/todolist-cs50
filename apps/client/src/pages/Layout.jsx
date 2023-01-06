import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { apiRefresh } from "../api/user";
import { AppContext } from "../App";
import { useEffect, useContext } from "react";

const Layout = () => {

  const { setAuthDetails } = useContext(AppContext) || {}
  const navigate = useNavigate()

  const useRefresh = () => {
    apiRefresh()
    .then((response) => {
      if (response?.data?.accessToken) {
        setAuthDetails(response?.data)
        navigate('/')
      }
      else {
        navigate('/login')
      }
    })
  }

  useEffect(() => useRefresh(), [])

  return (
    <>
        <Navbar />
        <Outlet />        
    </>
    
  )
}

export default Layout