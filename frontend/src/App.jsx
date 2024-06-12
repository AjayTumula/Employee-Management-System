
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './components/Login/Login.jsx'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Dashboard from './components/Dashboard.jsx'
import Home from './components/Home.jsx'

function App() {
  
  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path='/auth/login' element={<Login />}/>
        <Route path='/dashboard' element={<Dashboard />} />
          <Route path="" element={<Home />}></Route>
      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
