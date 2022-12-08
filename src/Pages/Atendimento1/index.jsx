import { Button, Col, Container, Row, Form, Modal, FormFloating } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { BiMessageRoundedAdd, BiMessageAltError, BiUser } from 'react-icons/bi'

import arrowLeftImg from '../../assets/arrow-left.svg'

import '../global.css'
import { useFormik } from "formik";
import { useAtendimentoContext } from "../../Providers/Atendimento";
import { useEffect } from "react";

export default function () {
  const navigate = useNavigate()


  const formik = useFormik({
    initialValues: {
      alergia: '',
      medicamento: '',
      gravida: false,
    }
  })

  const [stateAtendimento, dispatchAtendimento] = useAtendimentoContext()

  useEffect(() => {
    if(!stateAtendimento.phases[0]) {
      navigate('/atendimento')
    }
  }, [])


  
  return (
    <>
      <Container className='mt-5' fluid={true}>

      <Row style={{display: 'flex', alignItems: 'center'}}>
        <Col>
          <Link className='link-custom-primary' to='/'>
            <p>
              <img src={arrowLeftImg} style={{ width: '30px' }} />
              Voltar
            </p>
          </Link>
        </Col>
        <Col>
          <div className='color-custom-primary text-end'>
            <p>Novo atendimento</p>
            <p>{new Date().toISOString().split('T')[0].split('-').reverse().join('/')}</p>
          </div>
        </Col>
      </Row>


        <Row>
          <div className='color-custom-primary'>
            <h1>Histórico</h1>

            <p className="mb-0">Possui alergia a alguma substância ou medicamento?<br/>(Caso não possua deixe em branco)</p>
            <textarea className="w-100 input-custom-primary" style={{minHeight: '100px'}} name='alergia' onChange={formik.handleChange} />



            <p className="mb-0 mt-3">Faz uso de algum medicamento? Se sim diga-nos também a dosage.<br/>(Caso não possua deixe em branco)</p>
            <textarea className="w-100 input-custom-primary" style={{minHeight: '100px'}} name='medicamento' onChange={formik.handleChange} />

            <Form.Check
              className='mt-2'
              type='checkbox'
              id='check_gravida'
              label="Está gravida ou suspeita de gravidez?"
              checked={formik.values.gravida}
              onChange={event => formik.setFieldValue('gravida', event.target.checked)}
            />
          </div>
        </Row>


        <Row className='text-center mt-5'>
          <Col>
            <Button variant='custom-primary' className='ps-5 pe-5 p-2' onClick={() => {
              dispatchAtendimento({
                type: 'set',
                step: 1,
                payload: formik.values
              })
              navigate('/atendimento/2')
            }}>
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
    </>
  )
}