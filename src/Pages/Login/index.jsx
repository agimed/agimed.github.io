import { Button, Col, Container, Row, Form, Modal } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { User } from '../../Services/User';

import '../global.css'

import arrowLeftImg from '../../assets/arrow-left.svg'
import { useState } from "react";
import swal from 'sweetalert'

export function ModalRecoveryPassword({show, onClose}) {

  function handleSubmit(event) {
    event.preventDefault()
    const data = new FormData(event.target)
    const email = data.get('email')

    swal({
      title: 'Recuperação de senha',
      text: `Se existir alguma conta vinculada ao email ${email}, enviaremos o link para redefinir sua senha`,
      icon: 'success'
    })

    onClose()
  }

  return (
    <Modal show={show} size="xl" centered backdrop="static" onHide={onClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Recuperação de senha</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="loginEmail">
            <Form.Label className='color-custom-primary'>Email</Form.Label>
            <Form.Control required className='input-custom-primary' type="email" name='email' />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='custom-primary' type="submit">
            Recuperar
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}


export default function () {

  async function handleLogin(event) {
    event.preventDefault();
    const data = new FormData(event.target)
    const email = data.get('email');
    const pass = data.get('password');

    const user = new User(email, pass);
    const auth = await user.login();
    if (auth === false) {
      swal({
        title: 'Dados inválidos',
        text: `Senha ou e-mail inválidos`,
        icon: 'warning'
      })
    }
    const userMeta = await User.getUser();
    if (userMeta.meta === null) {
      swal({
        title: 'Registro inválido',
        text: `Os dados de cadastro estão incompletos`,
        icon: 'warning'
      });
      return;
    } 
    const isMedicoPath = window.location.pathname.match(/medico/) !== null;
    if (isMedicoPath && userMeta.meta.tipoUsuario === "paciente") {
      swal({
        title: 'Acesso negado',
        text: `Você não tem permissão para acessar esta página como médico`,
        icon: 'warning'
      });
      return;
    }
    if (userMeta.meta.tipoUsuario === "paciente") {
      navigate('/atendimento')
    }else{
      navigate('/respostas')
    }
  }

  const navigate = useNavigate()
  const [show, setShow] = useState(false)

  const { tipoUsuario } = useParams()
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
              { tipoUsuario === 'paciente' ? 'paciente' : 'médico' }
            </h1>
          </div>
        </Col>
      </Row>

      <Row>
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3" controlId="loginEmail">
            <Form.Label className='color-custom-primary'>Email</Form.Label>
            <Form.Control required className='input-custom-primary' name='email' type="email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="loginSenha">
            <Form.Label className='color-custom-primary'>Senha</Form.Label>
            <Form.Control required className="input-custom-primary" name="password" type="password" />
            <div className="text-end">
              <a className='link-custom-primary' href="#" onClick={(e) => {
                e.preventDefault()
                setShow(true)
              }}>ESQUECI MINHA SENHA</a>
            </div>
          </Form.Group>
          <Row className='mt-5'>
            <Col className='text-end'>
              <Button variant='custom-secondary' className="w-75" onClick={() => navigate('/cadastro')}>
                Cadastro
              </Button>
            </Col>

            <Col className='text-start'>
              <Button variant='custom-primary' className='w-75' type='submit'>
                Entrar
              </Button>
            </Col>
          </Row>
        </Form>
      </Row>


      <ModalRecoveryPassword show={show} onClose={() => setShow(false)} />

    </Container>
  )
}