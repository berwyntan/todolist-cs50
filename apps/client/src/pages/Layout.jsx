import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { apiRefresh } from "../api/user";
import { AppContext } from "../App";
import { useEffect, useContext, useState } from "react";
import Loading from "../components/Loading";

const Layout = () => {

  const { setAuthDetails } = useContext(AppContext) || {}
  const navigate = useNavigate()
  const [ isLoading, setIsLoading ] = useState(false)

  const useRefresh = () => {
    setIsLoading(true)
    apiRefresh()
    .then((response) => {
      if (response?.data?.accessToken) {
        setAuthDetails(response?.data)
        navigate('/')
        setIsLoading(false)
      }
      else {
        navigate('/login')
        setIsLoading(false)
      }
    })
  }

  useEffect(() => useRefresh(), [])

  return (
    <>
        <Navbar />
        {
          isLoading ? 
          <div className="flex justify-center"><Loading /></div> : 
          <Outlet />
        }    
    </>
    
  )
}

export default Layout