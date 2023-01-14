import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './pages/Login'
import Signup from './pages/Signup'
import Todolist from './pages/Todolist'
import Layout from './pages/Layout'
import Completed from './pages/Completed'
import NotFound from './pages/NotFound'
import Heatmap from './pages/Heatmap'

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
