import { Button, Col, Container, Row, Form, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { BiMessageRoundedAdd, BiMessageAltError, BiUser } from 'react-icons/bi'

import '../global.css'
import { useState } from "react";

export default function () {
  const navigate = useNavigate()

  return (
    <>
      <Container className='mt-5' fluid={true}>
        <Form>
          <Button variant='custom-primary text-start w-100 mb-3' onClick={() => navigate(`/respostas/1`)}>
            <h3>Ricardo Leandro Maximiliano</h3>
            <h5>Otorrinolaringologia</h5>
            <p className="text-end fw-bold p-0 m-0 mt-3">Criado em 10/05/2022 10:28</p>
          </Button>

          <Button variant='custom-primary text-start w-100 mb-3' onClick={() => navigate(`/respostas/1`)}>
            <h3>Ricardo Leandro Maximiliano</h3>
            <h5>Otorrinolaringologia</h5>
            <p className="text-end fw-bold p-0 m-0 mt-3">Criado em 10/05/2022 10:28</p>
          </Button>


          <Button variant='custom-primary text-start w-100 mb-3' onClick={() => navigate(`/respostas/1`)}>
            <h3>Ricardo Leandro Maximiliano</h3>
            <h5>Otorrinolaringologia</h5>
            <p className="text-end fw-bold p-0 m-0 mt-3">Criado em 10/05/2022 10:28</p>
          </Button>


          <Button variant='custom-primary text-start w-100 mb-3' onClick={() => navigate(`/respostas/1`)}>
            <h3>Ricardo Leandro Maximiliano</h3>
            <h5>Otorrinolaringologia</h5>
            <p className="text-end fw-bold p-0 m-0 mt-3">Criado em 10/05/2022 10:28</p>
          </Button>


          <Button variant='custom-primary text-start w-100 mb-3' onClick={() => navigate(`/respostas/1`)}>
            <h3>Ricardo Leandro Maximiliano</h3>
            <h5>Otorrinolaringologia</h5>
            <p className="text-end fw-bold p-0 m-0 mt-3">Criado em 10/05/2022 10:28</p>
          </Button>

          <Button variant='custom-primary text-start w-100 mb-3' onClick={() => navigate(`/respostas/1`)}>
            <h3>Ricardo Leandro Maximiliano</h3>
            <h5>Otorrinolaringologia</h5>
            <p className="text-end fw-bold p-0 m-0 mt-3">Criado em 10/05/2022 10:28</p>
          </Button>

          <Button variant='custom-primary text-start w-100 mb-3' onClick={() => navigate(`/respostas/1`)}>
            <h3>Ricardo Leandro Maximiliano</h3>
            <h5>Otorrinolaringologia</h5>
            <p className="text-end fw-bold p-0 m-0 mt-3">Criado em 10/05/2022 10:28</p>
          </Button>


          <Button variant='custom-primary text-start w-100 mb-3' onClick={() => navigate(`/respostas/1`)}>
            <h3>Ricardo Leandro Maximiliano</h3>
            <h5>Otorrinolaringologia</h5>
            <p className="text-end fw-bold p-0 m-0 mt-3">Criado em 10/05/2022 10:28</p>
          </Button>

          
          
        </Form>
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