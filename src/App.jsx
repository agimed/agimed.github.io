import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Route,
  Routes,
  useNavigate
} from "react-router-dom";


import Login from './Pages/Login';
import Atendimento from './Pages/Atendimento';
import Atendimento1 from './Pages/Atendimento1';
import Atendimento2 from './Pages/Atendimento2';
import Atendimento3 from './Pages/Atendimento3';


function P1() {
  const navigate = useNavigate()
  return (
    <div onClick={() => { navigate('/about') }}>
      Cole mano 1
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/atendimento' element={<Atendimento />} />
      <Route path='/atendimento/1' element={<Atendimento1 />} />
      <Route path='/atendimento/2' element={<Atendimento2 />} />
      <Route path='/atendimento/3' element={<Atendimento3 />} />
      <Route path='/' element={<P1 />} />
      <Route path='/about' element={<div>Cole mano 2</div>}/>
    </Routes>
  )
}

export default App