import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
        <div>Navbar</div>
        <Outlet />        
    </>
    
  )
}

export default Layout