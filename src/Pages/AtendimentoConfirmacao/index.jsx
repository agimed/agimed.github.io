import { Button, Col, Container, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import { BiMessageRoundedAdd, BiMessageAltError, BiUser } from 'react-icons/bi'

import arrowLeftImg from '../../assets/arrow-left.svg'

import '../global.css'

export default function () {
  return (
    <>
      <Container className='mt-5' fluid={true}>

        <Row style={{display: 'flex', alignItems: 'center'}}>
          <Col>
            <Link className='link-custom-primary' to='/'>
              <p>
                <img src={arrowLeftImg} style={{ width: '30px' }} />
                VOLTAR AO INÍCIO
              </p>
            </Link>
          </Col>
        </Row>

        <div className="text-center color-custom-primary mt-5">
          <div className="medico-size mx-auto">
            <img src="https://projetopuc.blob.core.windows.net/agimed/DocSVG.svg" alt="medico" />
          </div>
          <div className="medico-size-text mx-auto">
            <div className='bg-custom-primary p-3 box-sintomas mt-0 mb-3'>
              <h5 className="text-center">Sua requisição foi enviada com sucesso!</h5>
              <p>Você pode acompanha-la pelo código 0000-001 logo a baixo na aba Respostas</p>
            </div>
            <p>O prazo para seu atendimento é de até <b>5 dias últeis</b></p>
          </div>
        </div>

      </Container>

      <div className="mt-5 p-5" />
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