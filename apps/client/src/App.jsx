import './App.css'
import { useState, createContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './pages/Login'
import Signup from './pages/Signup'
import Todolist from './pages/Todolist'
import Layout from './pages/Layout'
import Completed from './pages/Completed'
import NotFound from './pages/NotFound'

export const AppContext = createContext()

function App() {
  
  const [ authDetails, setAuthDetails ] = useState({})

  const context = {
    authDetails,
    setAuthDetails
  }

  return (
    <div className="App">
      <AppContext.Provider value={context}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Todolist />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/signup" element={<Signup />}/>            
            <Route path="/completed" element={<Completed />}/>
            <Route path="*" element={<NotFound />} />
          </Route>          
        </Routes>
      </BrowserRouter>
      </AppContext.Provider>
    </div>
  )
}

export default App
