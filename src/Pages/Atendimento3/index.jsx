import { Button, Col, Container, Row, Form, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { BiMessageRoundedAdd, BiMessageAltError, BiUser, BiDownArrow } from 'react-icons/bi'

import arrowLeftImg from '../../assets/arrow-left.svg'

import '../global.css'
import { useAtendimentoContext } from "../../Providers/Atendimento";
import { useEffect } from "react";

export default function () {
  const navigate = useNavigate()
  const [stateAtendimento, dispatchAtendimento] = useAtendimentoContext()

  useEffect(() => {
    if(!stateAtendimento.phases[2]) {
      dispatchAtendimento({ type: 'reset' })
      navigate('/atendimento')
    }
  }, [])

  if(!stateAtendimento.phases[2]) {
    return null
  }

  return (
    <>
      <Container className='mt-5' fluid={true}>

        <Row style={{display: 'flex', alignItems: 'center'}}>
          <Col>
            <Link className='link-custom-primary' to='/atendimento/2'>
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
          {
            stateAtendimento.phases[0].sintomas.map( sintoma => {
              return <div className='p-2' key={sintoma}>{sintoma}</div>
            })
          }
          {
            stateAtendimento.phases[0].resumo ? (
              <div className="bg-white color-custom-primary p-2">{stateAtendimento.phases[0].resumo}</div>
            ) : null
          }
        </div>


        <div className="p-2 color-custom-primary mt-4">
          <p className='mb-1'><b>Alergias:</b> {stateAtendimento.phases[1].alergia?.trim() ? stateAtendimento.phases[1].alergia?.trim() : 'Em branco.'}</p>
          <p className='mb-1'><b>Medicamentos:</b> {stateAtendimento.phases[1].medicamento?.trim() ? stateAtendimento.phases[1].medicamento?.trim() : 'Em branco.'}</p>
          <p className='mb-1'><b>Gravidez:</b> {stateAtendimento.phases[1].gravida ? 'Sim' : 'Não'}.</p>
        </div>


        <h3 className="color-custom-primary h6 ps-2 mt-4 fw-bold">Meu Histórico</h3>
        {stateAtendimento.phases[2].doencas.map( i => (
          <div key={i} className="border-custom-primary bg-custom-primary p-1">
            {i}
          </div>
        ))}


        <div className="p-2 color-custom-primary mt-2">
          <p className='mb-1'><b>Tratamento:</b> {stateAtendimento.phases[2].descricaoTratamento?.trim() ? stateAtendimento.phases[2].descricaoTratamento?.trim() : 'Em branco.'}</p>
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