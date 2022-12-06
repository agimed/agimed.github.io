import { Button, Col, Container, Row, Form, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { BiMessageRoundedAdd, BiMessageAltError, BiUser, BiDownArrow } from 'react-icons/bi'

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

        <h2 className="color-custom-primary fw-bold">Resumo</h2>
        <h3 className="color-custom-primary h6 ps-2 mt-4 fw-bold">Meus sintomas</h3>

        <div className="border-custom-primary bg-custom-primary">
          <div className='p-2'>Falta de ar</div>
          <div className='p-2'>Nausea</div>
          
          <div className='d-flex justify-content-between p-2'>
            <div>Outros</div>
            <div><BiDownArrow /></div>
          </div>
          <div className="bg-white color-custom-primary p-2">Sinto cansado e com muito sono assim que acordo. Mesmo dormindo 8 horas.</div>
        </div>


        <div className="p-2 color-custom-primary mt-4">
          <p className='mb-1'><b>Alergias:</b> Em branco.</p>
          <p className='mb-1'><b>Medicamentos:</b> Em branco.</p>
          <p className='mb-1'><b>Gravidez:</b> Não.</p>
        </div>


        <h3 className="color-custom-primary h6 ps-2 mt-4 fw-bold">Meu Histórico</h3>
        <div className="border-custom-primary bg-custom-primary p-1">
          Doença Renal
        </div>
        <div className="border-custom-primary bg-custom-primary p-1">
          Diabetes
        </div>

        <div className="p-2 color-custom-primary mt-2">
          <p className='mb-1'><b>Tratamento:</b> Em branco.</p>
        </div>


        <Row className='text-center mt-5'>
          <Col>
            <Button variant='custom-primary' className='ps-5 pe-5 p-2' onClick={() => navigate('/atendimento/4')}>
              Enviar
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