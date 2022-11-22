import { Button, Col, Container, Row, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

import './index.css'

import arrowLeftImg from '../../assets/arrow-left.svg'

export default function () {
  return (
    <Container className='align-items-center mt-5'>
      <Row>
        <Col>
        <Link className='link-custom-primary' to='/'>
          <p>
            <img src={arrowLeftImg} style={{ width: '30px' }} />
            Voltar
          </p>
        </Link>
      </Col>
      </Row>
      <div className='mt-5 p-5'/>
      <Row>
        <Col className='text-center'>
          <div style={{maxWidth: '500px', display: 'inline-block'}} className='w-100'>
            <img src='https://projetopuc.blob.core.windows.net/agimed/LogoMarca.svg' />
            <h1 className="title-custom-primary text-end"> 
              Paciente
            </h1>
          </div>
        </Col>
      </Row>

      <Row>
        <Form>
          <Form.Group className="mb-3" controlId="loginEmail">
            <Form.Label className='color-custom-primary'>Email</Form.Label>
            <Form.Control required className='input-custom-primary ' type="email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="loginSenha">
            <Form.Label className='color-custom-primary'>Senha</Form.Label>
            <Form.Control required className="input-custom-primary " type="password" />
            <div className="text-end">
              <Link className='link-custom-primary' to='/recuperar-senha'>ESQUECI MINHA SENHA</Link>
            </div>
          </Form.Group>
          <Row className='mt-5'>
            <Col className='text-end'>
              <Button variant='custom-secondary' className="w-50">
                Cadastro
              </Button>
            </Col>

            <Col className='text-start'>
              <Button type="submit" variant='custom-primary' className='w-50'>
                Entrar
              </Button>
            </Col>
          </Row>
        </Form>
      </Row>




    </Container>
  )
}