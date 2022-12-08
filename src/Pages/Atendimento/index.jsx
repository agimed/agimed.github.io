import { Button, Col, Container, Row, Form, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { BiMessageRoundedAdd, BiMessageAltError, BiUser } from 'react-icons/bi'

import { useAtendimentoContext } from '../../Providers/Atendimento'

import '../global.css'
import { useRef, useState } from "react";
import { useFormik } from "formik";

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
  'Muita Sede',
  'Outros'
]


function ModalText({ showModal, setShowModal, callbackValue = () => {} }) {
  const [value, setValue] = useState('')
  function fecharModal(value = null) {
    callbackValue(value)
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
        <textarea onChange={event => setValue(event.target.value.trim())} value={value} className="w-100 input-custom-primary" style={{minHeight: '300px'}}/>
      </Modal.Body>
      <Modal.Footer className='text-center'>
        <div className="w-100">
          <Button className="w-25 pe-1 ps-1 me-2" variant='custom-secondary' onClick={() => fecharModal()}>Cancelar</Button>
          <Button className="w-25 pe-1 ps-1 ms-2" variant='custom-primary' disabled={!value} onClick={() => {
            fecharModal(value)
          }}>Salvar</Button>
        </div>
      </Modal.Footer>
    </Modal>
  )
}

export default function () {

  const formik = useFormik({
    initialValues: {
      sintomas: [],
      resumo: '',
    }
  })

  const navigate = useNavigate()

  const [stateAtendimento, dispatchAtendimento] = useAtendimentoContext()

  const [showModal, setShowModal] = useState(false)
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
                      value={sintoma}
                      checked={formik.values.sintomas.includes(sintoma)}
                      onChange={event => {
                        const {value, checked} = event.target
                        if(checked) {
                          formik.setFieldValue('sintomas', [...formik.values.sintomas, value])
                        } else {
                          formik.setFieldValue('sintomas', formik.values.sintomas.filter( i => i !== value))
                        }
                      }}
                    />
                  </Col>

                ))}
              </Row>
          </div>
        </Form>

        <Row className='text-center mt-5'>
          <Col>
            <Button variant='custom-primary' className='ps-5 pe-5 p-2' onClick={() => setShowModal(true)} disabled={formik.values.sintomas.length === 0}>
              Próximo
            </Button>
          </Col>
        </Row>
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
      <ModalText showModal={showModal} setShowModal={setShowModal} callbackValue={(resumo) => {
        formik.setFieldValue('resumo', resumo)
        if(resumo) {
          const payload = {...formik.values, resumo}
          dispatchAtendimento({
            type: 'set',
            step: 0,
            payload,
          })
          navigate('/atendimento/1')
        }
      } } />
    </>
  )
}