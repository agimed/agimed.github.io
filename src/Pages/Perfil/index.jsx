import { Button, Col, Container, Row, Form, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { BiMessageRoundedAdd, BiMessageAltError, BiUser } from 'react-icons/bi'
import { User } from '../../Services/User';
import { useEffect } from "react";

import '../global.css'
import { useState } from "react";
import { useLoadingContext } from "../../Providers/Loading";

export default function () {
  const navigate = useNavigate();

  function handleLogout() {
    const termo = localStorage.getItem('@termo-de-privacidade')
    localStorage.clear()
    localStorage.setItem('@termo-de-privacidade', termo)
    navigate('/')
  }

  
  const [userData, setUserData] = useState({
    "user": {
        "email": "rrenatosilva.rs@gmail.com",
    },
    "meta": {
        "tipoUsuario": "",
        "nomeCompleto": "",
        "cpf": "",
        "cep": "",
        "numero": "",
        "complemento": "",
        "endereco": "",
        "alergias": "",
        "doencasCronicas": "",
        "crm": "",
        "especialidade": ""
    }
  });
  const [,setLoading] = useLoadingContext()

  useEffect(() => {
    const resolver = async () => {
      setLoading(true)
      try{
        const signedUser = await User.getUser();
        if (signedUser.user === null) {
          navigate('/');
        }
        setUserData(signedUser);
        console.log(userData);
      } catch (error) {
        console.log(error);
      }
      setLoading(false)
    };
    resolver();
  }, []);

  return (
    <>
      <Container className='mt-5' fluid={true}>
        <Row>
          <div className='color-custom-primary fw-bold'>
            <h1>Olá {userData.meta.nomeCompleto}!</h1>
          </div>
        </Row>


        <Form>
          <div className='bg-custom-primary p-3 box-sintomas'>
              <h2>Dados básicos</h2>
              <p><b>Nome Completo:</b> {userData.meta.nomeCompleto}</p>
              <p><b>CPF:</b> {userData.meta.cpf}</p>
              <p><b>Endereço:</b> {userData.meta.endereco}</p>
              <p><b>Número:</b> {userData.meta.numero}</p>
              <p><b>Complemento:</b> {userData.meta.complemento}</p>
              <p><b>E-mail:</b> {userData.user.email}</p>
          </div>

          {userData.meta.crm !== '' && <div className='bg-custom-primary p-3 box-sintomas'>
              <h2>Dados profissionais</h2>
              <p><b>CRM:</b> {userData.meta.crm}</p>
              <p><b>Especialidade:</b> {userData.meta.especialidade}</p>
          </div>}

          <div className='bg-custom-primary p-3 box-sintomas'>
              <h2>Histórico de saúde</h2>
              <p><b>Alergias:</b> {userData.meta.alergias}</p>
              

              <p><b>Doenças crônicas:</b> {userData.meta.doencasCronicas}</p>
              
          </div>
        </Form>
        <Button variant="outline-danger" onClick={handleLogout}>
          Clique aqui para sair da sua conta
        </Button>
      </Container>


      <div className="end-of-page" />
      <div className='bg-custom-primary text-center fixed-bottom footer'>
        <Button variant='custom-primary' onClick={() => navigate('/atendimento')}>
            <BiMessageRoundedAdd size={50}/>
            <p>Atendimento</p>
        </Button>
        <Button variant='custom-primary' onClick={() => navigate('/respostas')}>
          <BiMessageAltError size={50}/>
          <p>Respostas</p>
        </Button>
        <Button variant='custom-primary' onClick={() => navigate('/perfil')}>
          <BiUser size={50}/>
          <p>Perfil</p>
        </Button>
      </div>
    </>
  )
}