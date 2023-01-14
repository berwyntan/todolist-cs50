import './App.css'
import { lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './pages/Login'
import Todolist from './pages/Todolist'
import Layout from './pages/Layout'

const Signup = lazy(() => import('./pages/Signup'))
const Completed = lazy(() => import('./pages/Completed'))
const NotFound = lazy(() => import('./pages/NotFound'))
const Heatmap = lazy(() => import('./pages/Heatmap'))

export const AppContext = createContext()

function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Todolist />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/signup" element={<Signup />}/>            
            <Route path="/completed" element={<Completed />}/>
            <Route path="/heatmap/:id" element={<Heatmap />}/>
            <Route path="*" element={<NotFound />} />
          </Route>          
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
