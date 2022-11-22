import { Button, Col, Container, Row, Form, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { BiMessageRoundedAdd, BiMessageAltError, BiUser } from 'react-icons/bi'

import '../global.css'
import { useState } from "react";

const sintomas = [
  'Febre',
  'Tosse',
  'Inchaço',
  'Dor de Barriga',
  'Vômito',
  'Sangue na urina',
  'Sangue nas Fezes',
  'Falta de Apetite',
  'Dor de cabeça',
  'Diarréia',
  'Falta de ar',
  'Sensação Sufoco',
  'Formigamento',
  'Dor no Estomago',
  'Nausea',
  'Cansaço',
  'Dores no Peito',
  'Vertigem',
  'Muita Sede'
]


function ModalText({ showModal, setShowModal }) {
  const navigate = useNavigate()
  function fecharModal() {
    setShowModal(false)
  }

  return (
    <Modal
      show={showModal}
      onHide={fecharModal}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className="color-custom-primary">
          Descreva abaixo resumidamente seus sintomas
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <textarea className="w-100 input-custom-primary" style={{minHeight: '300px'}}/>
      </Modal.Body>
      <Modal.Footer className='text-center'>
        <div className="w-100">
          <Button className="w-25 me-2" variant='custom-secondary' onClick={fecharModal}>Cancelar</Button>
          <Button className="w-25 ms-2" variant='custom-primary' onClick={() => {fecharModal(); navigate('/atendimento/1')}}>Salvar</Button>
        </div>
      </Modal.Footer>
    </Modal>
  )
}

export default function () {
  const [showModal, setShowModal] = useState(true)
  return (
    <>
      <Container className='mt-5' fluid={true}>
        <Row>
          <div className='color-custom-primary fw-bold'>
            <h1>Olá Andre!</h1>
            <p>Preencha o questionário básico para iniciar um novo atendimento.</p>
          </div>
        </Row>


        <Form>
          <div className='bg-custom-primary p-3 box-sintomas'>
              <h2>Sintomas</h2>
              <p>Marque quais sintomas você está sentindo:</p>
          
              <Row>
                {sintomas.map( sintoma => (
                  <Col sm={6} lg={4} xl={3} style={{maxWidth: '50%'}} key={sintoma}>
                    <Form.Check
                      className='mt-2'
                      type='checkbox'
                      id={`lcs-${sintoma}`}
                      label={`${sintoma}`}
                    />
                  </Col>

                ))}
              </Row>
          </div>
        </Form>

        <Row className='text-center mt-5'>
          <Col>
            <Button variant='custom-primary' className='ps-5 pe-5 p-2' onClick={() => setShowModal(true)}>
              Próximo
            </Button>
          </Col>
        </Row>
      </Container>

      <div className="mt-5" />
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
      <ModalText showModal={showModal} setShowModal={setShowModal} />
    </>
  )
}