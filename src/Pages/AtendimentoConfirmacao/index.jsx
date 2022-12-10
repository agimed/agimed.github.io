import { Button, Col, Container, Row } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { BiMessageRoundedAdd, BiMessageAltError, BiUser } from 'react-icons/bi'
import { User } from '../../Services/User';
import { HealthCare } from "../../Services/HealthCare";

import arrowLeftImg from '../../assets/arrow-left.svg'
import { useAtendimentoContext } from "../../Providers/Atendimento";
import { useEffect } from "react";

import '../global.css'

export default function () {
  const navigate = useNavigate()
  const [stateAtendimento, dispatchAtendimento] = useAtendimentoContext();

  useEffect(() => {
    const resolver = async () => {
      try{
        if(!stateAtendimento.phases[3]) {
          dispatchAtendimento({ type: 'reset' });
          navigate('/atendimento')
          return;
        }

        const signedUser = await User.getUser();
        if (signedUser.user === null) {
          navigate('/');
        }

        await HealthCare.create(signedUser.user.id, stateAtendimento);
        // dispatchAtendimento({ type: 'reset' });

      } catch (error) {
        console.log(error);
      }
      
    };
    resolver();
  }, []);

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