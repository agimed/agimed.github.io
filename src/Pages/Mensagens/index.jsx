import { Button, Col, Container, Row, Form, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { BiMessageRoundedAdd, BiMessageAltError, BiUser } from 'react-icons/bi'
import { AiOutlineSend } from 'react-icons/ai'
import { BsCardImage } from 'react-icons/bs'
import { useParams } from "react-router-dom";

import { useLoadingContext } from '../../Providers/Loading';

import { User } from '../../Services/User';
import { HealthCare } from "../../Services/HealthCare";
import { Message } from "../../Services/Message";

import '../global.css'
import { useState, useRef } from "react";
import { useEffect } from "react";

import {formatarDataHora} from '../../Utils/formatarDataHora'

export default function () {
  const navigate = useNavigate()
  const endOfPageComponent = useRef(null)
  const inputFile = useRef(null)
  const [file, setFile] = useState(null)
  const [,setLoading] = useLoadingContext()
  const searchParams = useParams();
  const [user, setUser] = useState({});
  const [questions, setQuestions] = useState([]);
  const [patientStatus, setpatientStatus] = useState(true);
  const [firstMessageContent, setFirstMessageContent] = useState('');
  const [doctorType, setDoctorType] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [chatOwner, setChatOwner] = useState('');

  const questionID = searchParams.id;

  async function handleNewMessage(event) {
    event.preventDefault();
    const data = new FormData(event.target)
    const message = data.get('message');
    event.target.reset();

    await Message.send(user.user.id, questionID, {
      message,
    });
    if (user.user.id !== chatOwner) {
      console.log(questionID, user.user.id, user);
      await HealthCare.assignPhysician(questionID, user.user.id);
    }
    await loadMessages();
  }

  async function loadMessages() {
    setLoading(true)
    // patientStatus
    const signedUser = await User.getUser();

    const messagesFromThisChat = await Message.getMessages(signedUser.user.id, questionID);
    console.log(messagesFromThisChat);
    const finalMsg = messagesFromThisChat.map(singleMsg=> {
      const messageClass = singleMsg.user === signedUser.user.id ? 'text-start w-100 mb-3 box-message-sended' : 'text-start w-100 mb-3 box-message-received';
      const hasContent = singleMsg.metadata.content !== undefined;
      return (
        <div className={messageClass}>
          <h6>{singleMsg.user_data.nomeCompleto}</h6>
          <p>{singleMsg.metadata.message}</p>
          {hasContent && <img src={singleMsg.metadata.content} alt="Imagem anexada" className="img-fluid"/>}
          <p className="text-end fw-bold p-0 m-0 mt-3"><sub>{formatarDataHora(singleMsg.created_at)}</sub></p>
        </div>
      );
    });
    setChatMessages(finalMsg);
    setLoading(false)
  }

  useEffect(() => {
    const resolver = async () => {
      try{
        const signedUser = await User.getUser();
        setUser(signedUser);
        if (signedUser.user === null) {
          navigate('/');
        }

        const userMeta = await User.getMetadata(signedUser.user.id);
        
        const isPatient = userMeta.tipoUsuario === 'paciente';
        setpatientStatus(isPatient);

        const userQuestions = (await HealthCare.getByID(questionID))[0];
        console.log(userQuestions);
        setChatOwner(userQuestions.user);

        const initalClass = isPatient ? 'text-start w-100 mb-3 box-message-sended' : 'text-start w-100 mb-3 box-message-received';
        const especialidade = userQuestions.physician_meta?.meta?.especialidade ?? 'Aguarde';
        
        const firstMessage = () => {
          return(<div className={initalClass}>
            <h2>Atendimento Solicitado</h2>
            <ul>
              <li> <b>Sintomas:</b> </li>
              <ul>
                {userQuestions.data.phases[0].sintomas.map(x=><li>{x}</li>)}
              </ul>
              <li> <b>Resumo:</b> {userQuestions.data.phases[0].resumo}</li>
              <li> <b>Alergias:</b> {userQuestions.data.phases[1].alergia}</li>
              <li> <b>Gravidez:</b> {userQuestions.data.phases[1].gravida?'sim':'não'}</li>
              <li> <b>Medicamento:</b> {userQuestions.data.phases[1].medicamento}</li>
              <li> <b>Doenças:</b> </li>
              <ul>
                {userQuestions.data.phases[2].doencas.map(x=><li>{x}</li>)}
              </ul>
              <li> <b>Realizando Tratamento:</b> {userQuestions.data.phases[2].realizandoTratamento?'sim':'não'}</li>
              <li> <b>Tratamento:</b> {userQuestions.data.phases[2].descricaoTratamento}</li>
            </ul>
            <p className="text-end fw-bold p-0 m-0 mt-3"><sub>{formatarDataHora(userQuestions.created_at)}</sub></p>
          </div>);
        }
        setFirstMessageContent(firstMessage);
        setQuestions(userQuestions);
        setDoctorType(especialidade);
        await loadMessages();
      } catch (error) {
        console.log(error);
      }

    };
    resolver();
  }, []);

  useEffect(() => {
    if(endOfPageComponent.current) {
      endOfPageComponent.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [endOfPageComponent.current])

  function loadFile(event) {
    setLoading(true)
    const file = event.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = async function() {
      const content = reader.result.toString()
      setFile(content)
      // enviar o arquivo aqui
      event.target.value = ''
      console.log(content)
      
      await Message.send(user.user.id, questionID, {
        content,
      });
      loadMessages();
      setLoading(false)
    }
  }

  useEffect(() => {
    if(inputFile.current) {
      inputFile.current.addEventListener('change', loadFile)
      return () => inputFile.current?.removeEventListener('change', loadFile)
    }
  }, [inputFile.current])

  return (
    <>
      <div className="faixa faixa-superior text-center fixed-top">
        {doctorType}
      </div>
      <Container className='mt-5' fluid={true}>
        <div className="pt-5 mb-4" />
        {firstMessageContent}
        <div className="container-mensagens">
          {chatMessages}
        </div>

        <div ref={endOfPageComponent}/>
      </Container>


      <div className="end-of-page" />
      <div className='fixed-bottom'>
      <Form onSubmit={handleNewMessage}>
        <div className="caixa-barra-mensagem mb-1">
            <input type="file" accept="image/png, image/gif, image/jpeg" name="file" id="file" style={{display: 'none'}} ref={inputFile} />
            <Button variant='custom-secondary' onClick={() => {
              inputFile.current?.click()
            }}>
              <BsCardImage size={25} />
            </Button>
            <textarea rows={2} className='input-custom-primary p-1 rounded text' name="message" type="text" />
            <Button variant='custom-secondary' type="submit">
              <AiOutlineSend />
            </Button>
          </div>
        </Form>
        <div className='bg-custom-primary text-center footer'>
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
      </div>
    </>
  )
}