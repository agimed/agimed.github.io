import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Route,
  Routes,
  useNavigate
} from "react-router-dom";


import TipoConta from './Pages/TipoConta';
import Login from './Pages/Login';
import Atendimento from './Pages/Atendimento';
import Atendimento1 from './Pages/Atendimento1';
import Atendimento2 from './Pages/Atendimento2';
import Atendimento3 from './Pages/Atendimento3';
import AtendimentoConfirmacao from './Pages/AtendimentoConfirmacao';
import CadastroUsuario from './Pages/CadastroUsuario';
import Perfil from './Pages/Perfil';
import Respostas from './Pages/Respostas';
import Mensagens from './Pages/Mensagens';


function Redirect({ to='/' }) {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(to);
  }, [])
  return <div />
}

function App() {
  return (
    <Routes>
      <Route path='/' element={<TipoConta />} />
      <Route path='/login/:tipoUsuario' element={<Login />} />
      <Route path='/cadastro' element={<CadastroUsuario />} />
      <Route path='/atendimento' element={<Atendimento />} />
      <Route path='/atendimento/1' element={<Atendimento1 />} />
      <Route path='/atendimento/2' element={<Atendimento2 />} />
      <Route path='/atendimento/3' element={<Atendimento3 />} />
      <Route path='/atendimento/4' element={<AtendimentoConfirmacao />} />
      <Route path='/perfil' element={<Perfil />} />
      <Route path='/respostas' element={<Respostas />} />
      <Route path='/respostas/:id/' element={<Mensagens />} />

      {/* ERRO 404 */}
      <Route path='*' element={<Redirect to='/' />} />

    </Routes>
  )
}

export default App
