import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { apiRefresh } from "../api/user";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import useTodoStore from "../hooks/useTodoStore";

const Layout = () => {

  const setAuthDetails = useTodoStore((state) => state.setAuthDetails)
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