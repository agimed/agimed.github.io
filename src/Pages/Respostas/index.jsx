import { Button, Col, Container, Row, Form, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { BiMessageRoundedAdd, BiMessageAltError, BiUser } from 'react-icons/bi'

import { User } from '../../Services/User';
import { HealthCare } from "../../Services/HealthCare";

import '../global.css'
import { useState } from "react";
import { useEffect } from "react";

export default function () {
  const navigate = useNavigate()
  const [questions, setQuestions] = useState([]);
  const [patientStatus, setpatientStatus] = useState(true);

  useEffect(() => {
    const resolver = async () => {
      try{
        const signedUser = await User.getUser();
        if (signedUser.user === null) {
          navigate('/');
        }

        const userMeta = await User.getMetadata(signedUser.user.id);
        
        const isPatient = userMeta.tipoUsuario === 'paciente';
        setpatientStatus(isPatient);

        let userQuestions = [];
        if (isPatient) {
          userQuestions = await HealthCare.getFromMe(signedUser.user.id);
        } else {
          userQuestions = await HealthCare.getFromPatients(signedUser.user.id);
        }
        console.log(userQuestions);

        setQuestions(userQuestions);
        
      } catch (error) {
        console.log(error);
      }

    };
    resolver();
  }, []);

  return (
    <>
      <Container className='mt-5' fluid={true}>
        <Form>{
          questions.map((question)=>{
            const especialidade = question.physician_meta?.meta?.especialidade ?? 'Nenhuma especialidade iniciou atendimento';
            const nome = patientStatus ? (question.physician_meta?.meta?.nomeCompleto || 'Aguardando Médico') : question.user_meta?.meta?.nomeCompleto;
            return (<Button variant='custom-primary text-start w-100 mb-3' onClick={() => navigate(`/respostas/${question.id}`)}>
            <h3>{nome}</h3>
            <h5>{especialidade}</h5>
            <p className="text-end fw-bold p-0 m-0 mt-3">Criado em {question.created_at}</p>
          </Button>);
          })
        }</Form>
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