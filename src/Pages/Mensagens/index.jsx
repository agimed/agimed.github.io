import { Button, Col, Container, Row, Form, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { BiMessageRoundedAdd, BiMessageAltError, BiUser } from 'react-icons/bi'
import { BsDownload } from 'react-icons/bs'

import '../global.css'
import { useState } from "react";

export default function () {
  const navigate = useNavigate()

  return (
    <>
      <div className="faixa faixa-superior text-center">
        Otorrinolaringologia
      </div>
      <Container className='mt-4' fluid={true}>
        <div className="container-mensagens">
          <div className='text-start w-100 mb-3 box-message-received'>
            <h6>Ricardo Leandro Maximiliano</h6>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo dolores offici. Dignissimos, magnam est! Aut doloribus debitis nihil ex architecto doloremque libero unde odit animi dolore.</p>
            <p className="text-end fw-bold p-0 m-0 mt-3"><sub>10/05/2022 10:28</sub></p>
          </div>

          <div className='text-start w-100 mb-3 box-message-sended'>
            <h6>Ricardo Leandro Maximiliano</h6>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo dolores offici. Dignissimos, magnam est! Aut doloribus debitis nihil ex architecto doloremque libero unde odit animi dolore.</p>
            <p className="text-end fw-bold p-0 m-0 mt-3"><sub>10/05/2022 10:28</sub></p>
          </div>

          <div className='text-start w-100 mb-3 box-message-sended'>
            <h6>Ricardo Leandro Maximiliano</h6>
            <p>Dignissimos, magnam est! Aut doloribus debxplicabo dolores offici. Dignissimos, magnam est! Aut doloribus debxplicabo dolores offici. Dignissimos, magnam est! Aut doloribus debxplicabo dolores offici. Dignissimos, magnam est! Aut doloribus debitis nihil ex architecto doloremque libero unde odit animi dolore.</p>
            <p className="text-end fw-bold p-0 m-0 mt-3"><sub>10/05/2022 10:28</sub></p>
          </div>
          <div className='text-start w-100 mb-3 box-message-received'>
            <h6>Ricardo Leandro Maximiliano</h6>
            <p>OK.</p>
            <p className="text-end fw-bold p-0 m-0 mt-3"><sub>10/05/2022 10:28</sub></p>
          </div>
          <div className='text-start w-100 mb-3 box-message-received'>
            <h6>Ricardo Leandro Maximiliano</h6>
            <a href='https://www.softwaretestingclass.com/wp-content/uploads/2016/06/Beginner-Guide-To-Software-Testing.pdf' target='_blank'>
              Um arquivo foi compartilhado, clique aqui para realizar o download
            </a>
            <p className="text-end fw-bold p-0 m-0 mt-3"><sub>10/05/2022 10:28</sub></p>
          </div>
          <div className='text-start w-100 mb-3 box-message-sended'>
            <h6>Ricardo Leandro Maximiliano</h6>
            <p> magnam est! Aut doloribus debxplicabo dolores offici. Dignissimos, magnam est! Aut doloribus debxplicabo dolores offici. Dignissimos, magnam est! Aut doloribus debitis nihil ex architecto doloremque libero unde odit animi dolore.</p>
            <p className="text-end fw-bold p-0 m-0 mt-3"><sub>10/05/2022 10:28</sub></p>
          </div>
        </div>

          
          
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