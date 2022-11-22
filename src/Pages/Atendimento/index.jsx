import { Button, Col, Container, Row, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BiMessageRoundedAdd, BiMessageAltError, BiUser } from 'react-icons/bi'

import '../global.css'

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

export default function () {
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
                  <Col sm={6} lg={4} xl={3} style={{maxWidth: '50%'}}>
                    <Form.Check
                      className='mt-2'
                      key={sintoma}
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
            <Button variant='custom-primary' className='ps-5 pe-5 p-2'>
              Próximo
            </Button>
          </Col>
        </Row>
      </Container>

      <div className="mt-5" />
      <div className='bg-custom-primary footer text-center'>
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