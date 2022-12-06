import { Button, Col, Container, Row, Form, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { BiMessageRoundedAdd, BiMessageAltError, BiUser } from 'react-icons/bi'
import { AiOutlineSend } from 'react-icons/ai'
import { BsCardImage } from 'react-icons/bs'

import '../global.css'
import { useState, useRef } from "react";
import { useEffect } from "react";

export default function () {
  const navigate = useNavigate()
  const endOfPageComponent = useRef(null)
  const inputFile = useRef(null)
  const [file, setFile] = useState(null)
  

  useEffect(() => {
    if(endOfPageComponent.current) {
      endOfPageComponent.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [endOfPageComponent.current])

  function loadFile(event) {
    const file = event.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function() {
      const content = reader.result.toString()
      setFile(content)
      // enviar o arquivo aqui
      event.target.value = ''
      console.log(content)
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
        Otorrinolaringologia
      </div>
      <Container className='mt-5' fluid={true}>
        <div className="pt-5 mb-4" />
        <div className="container-mensagens">
          <div className='text-start w-100 mb-3 box-message-received'>
            <h6>Ricardo Leandro Maximiliano</h6>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo dolores offici. Dignissimos, magnam est! Aut doloribus debitis nihil ex architecto doloremque libero unde odit animi dolore.</p>
            <p className="text-end fw-bold p-0 m-0 mt-3"><sub>10/05/2022 10:28</sub></p>
          </div>

          <div className='text-start w-100 mb-3 box-message-sended'>
            <h6>Ricardo Leandro Maximiliano</h6>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo dolores offici. Dignissimos, magnam est! Aut doloribus debitis nihil ex architecto doloremque libero unde odit animi dolore.</p>
            <p className="text-end fw-bold p-0 m-0 mt-3"><sub>10/05/2022 10:28</sub></p>
          </div>

          <div className='text-start w-100 mb-3 box-message-sended'>
            <h6>Ricardo Leandro Maximiliano</h6>
            <p>Dignissimos, magnam est! Aut doloribus debxplicabo dolores offici. Dignissimos, magnam est! Aut doloribus debxplicabo dolores offici. Dignissimos, magnam est! Aut doloribus debxplicabo dolores offici. Dignissimos, magnam est! Aut doloribus debitis nihil ex architecto doloremque libero unde odit animi dolore.</p>
            <p className="text-end fw-bold p-0 m-0 mt-3"><sub>10/05/2022 10:28</sub></p>
          </div>
          <div className='text-start w-100 mb-3 box-message-received'>
            <h6>Ricardo Leandro Maximiliano</h6>
            <p>OK.</p>
            <p className="text-end fw-bold p-0 m-0 mt-3"><sub>10/05/2022 10:28</sub></p>
          </div>
          <div className='text-start w-100 mb-3 box-message-received'>
            <h6>Ricardo Leandro Maximiliano</h6>
            <a href='https://www.softwaretestingclass.com/wp-content/uploads/2016/06/Beginner-Guide-To-Software-Testing.pdf' target='_blank'>
              Um arquivo foi compartilhado, clique aqui para realizar o download
            </a>
            <p className="text-end fw-bold p-0 m-0 mt-3"><sub>10/05/2022 10:28</sub></p>
          </div>
          <div className='text-start w-100 mb-3 box-message-sended'>
            <h6>Ricardo Leandro Maximiliano</h6>
            <p> magnam est! Aut doloribus debxplicabo dolores offici. Dignissimos, magnam est! Aut doloribus debxplicabo dolores offici. Dignissimos, magnam est! Aut doloribus debitis nihil ex architecto doloremque libero unde odit animi dolore.</p>
            <p className="text-end fw-bold p-0 m-0 mt-3"><sub>10/05/2022 10:28</sub></p>
          </div>
        </div>

        <div ref={endOfPageComponent}/>
      </Container>


      <div className="end-of-page" />
      <div className='fixed-bottom'>
        <div className="caixa-barra-mensagem mb-1">
          <input type="file" name="file" id="file" style={{display: 'none'}} ref={inputFile} />
          <Button variant='custom-secondary' onClick={() => {
            inputFile.current?.click()
          }}>
            <BsCardImage size={25} />
          </Button>
          <textarea rows={2} className='input-custom-primary p-1 rounded text'  type="text" />
          <Button variant='custom-secondary'>
            <AiOutlineSend />
          </Button>
        </div>
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