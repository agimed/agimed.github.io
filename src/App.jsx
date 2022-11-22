import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Route,
  Routes,
  useNavigate
} from "react-router-dom";


import Login from './Pages/Login';
import Atendimento from './Pages/Atendimento';
import HistoricoParte1 from './Pages/HistoricoParte1';


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
      <Route path='/historico/1' element={<HistoricoParte1 />} />
      <Route path='/' element={<P1 />} />
      <Route path='/about' element={<div>Cole mano 2</div>}/>
    </Routes>
  )
}

export default App
