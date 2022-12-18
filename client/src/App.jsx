import './App.css'
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './pages/Login'
import Signup from './pages/Signup'
import Todolist from './pages/Todolist'
import Layout from './pages/Layout'

function App() {
  
  const [ authDetails, setAuthDetails ] = useState({email: ""})

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Login />}/>
            <Route path="/signup" element={<Signup />}/>
            <Route path="/todos" element={<Todolist 
              authDetails={authDetails}
            />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
