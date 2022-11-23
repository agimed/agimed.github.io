import { Button, Col, Container, Row, Form, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { BiMessageRoundedAdd, BiMessageAltError, BiUser } from 'react-icons/bi'

import arrowLeftImg from '../../assets/arrow-left.svg'

import '../global.css'

const doencas = [
  'No estomago',
  'No figado',
  'Cardiaca',
  'Tuberculose',
  'Asma',
  'Intestinal',
  'Renal',
  'Diabetes',
  'Hipertensão'
]

export default function () {
  const navigate = useNavigate()
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

            <div className='bg-custom-primary p-3 box-sintomas'>
              <p>Você tem/já teve doenças:</p>
          
              <Row>
                {doencas.map( doenca => (
                  <Col sm={6} lg={4} xl={3} style={{maxWidth: '50%'}} key={doenca}>
                    <Form.Check
                      className='mt-2'
                      type='checkbox'
                      id={`lcs-${doenca}`}
                      label={`${doenca}`}
                    />
                  </Col>

                ))}
              </Row>
          </div>

          <div className='mt-4'>
            <Form.Check
              className='mt-2'
              type='checkbox'
              id='check_gravida'
              label="Está realizando algum tratamento?"
            />

            <p className="mb-0">Nos diga qual/quais?</p>
            <textarea className="w-100 input-custom-primary" style={{minHeight: '100px'}}/>
          </div>
        </div>
        </Row>


        <Row className='text-center mt-5'>
          <Col>
            <Button variant='custom-primary' className='ps-5 pe-5 p-2' onClick={() => navigate('/atendimento/3')}>
              Próximo
            </Button>
          </Col>
        </Row>
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