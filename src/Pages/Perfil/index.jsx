import { Button, Col, Container, Row, Form, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { BiMessageRoundedAdd, BiMessageAltError, BiUser } from 'react-icons/bi'

import '../global.css'
import { useState } from "react";

export default function () {
  return (
    <>
      <Container className='mt-5' fluid={true}>
        <Row>
          <div className='color-custom-primary fw-bold'>
            <h1>Olá (SEU NOME AQUI)!</h1>
          </div>
        </Row>


        <Form>
          <div className='bg-custom-primary p-3 box-sintomas'>
              <h2>Dados básicos</h2>
              <p><b>Nome Completo:</b> Seu nome se encontra aqui</p>
              <p><b>CPF:</b> 149.055.585-86</p>
              <p><b>Endereço:</b> Rua Judith Tertuliano, Vila Boa Esperança - Betim/MG</p>
              <p><b>Número:</b> 712</p>
              <p><b>Complemento:</b> </p>
              <p><b>E-mail:</b> meuemail@agimed.com.br</p>
          </div>

          <div className='bg-custom-primary p-3 box-sintomas'>
              <h2>Dados profissionais</h2>
              <p><b>CRM:</b> 023102161</p>
              <p><b>Especialidade:</b> Otorinolaringologia</p>
          </div>

          <div className='bg-custom-primary p-3 box-sintomas'>
              <h2>Histórico de saúde</h2>
              <p><b>Alergias</b></p>
              <ul>
                <li>Amendoin</li>
                <li>Laranja</li>
              </ul>

              <p><b>Doenças crônicas</b></p>
              <ul>
                <li>Diabetes</li>
                <li>Hipertensão</li>
              </ul>
          </div>
        </Form>
      </Container>

      <div className="end-of-page" />
      <div className='bg-custom-primary text-center fixed-bottom footer'>
        <Button variant='custom-primary'>
          <BiMessageRoundedAdd size={50}/>
          <p>Atendimento</p>
        </Button>
        <Button variant='custom-primary' >
          <BiMessageAltError size={50}/>
          <p>Respostas</p>
        </Button>
        <Button variant='custom-primary' >
          <BiUser size={50}/>
          <p>Perfil</p>
        </Button>
      </div>
    </>
  )
}