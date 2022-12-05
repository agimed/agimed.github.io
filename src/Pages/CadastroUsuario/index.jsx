import { Button, Col, Container, Row, Form, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import '../global.css'

import arrowLeftImg from '../../assets/arrow-left.svg'
import { useFormik } from "formik";
import { useEffect } from "react";


export default function () {
  const formik = useFormik({
    initialValues: {
      tipoUsuario: 'paciente',
      nomeCompleto: '',
      cpf: '',
      cep: '',
      endereco: '',

      senha: '',
      confirmacaoSenha: '',

      alergias: '',
      doencasCronicas: '',

      crm: '',
      especialidade: '',
    }
  })

  const navigate = useNavigate()
  
  return (
    <Container className='align-items-center mt-5'>
      <Row>
        <Col>
        <Link className='link-custom-primary' to='/'>
          <p>
            <img src={arrowLeftImg} style={{ width: '30px' }} />
            Voltar
          </p>
        </Link>
      </Col>
      </Row>
      <div className='mt-5'/>
      

      <Row>
        <Form>

          <Form.Group className="mb-3" controlId="cadastroNomeCompleto">
            <Form.Label className='color-custom-primary'>Nome Completo</Form.Label>
            <Form.Control required className='input-custom-primary' type="text" onChange={formik.handleChange} value={formik.values.nomeCompleto} name='nomeCompleto' />
          </Form.Group>
          <Form.Group className="mb-3" controlId="cadastroCPF">
            <Form.Label className='color-custom-primary'>CPF</Form.Label>
            <Form.Control required className='input-custom-primary' type="text" onChange={formik.handleChange} value={formik.values.cpf} name='cpf' />
          </Form.Group>

          <hr className='mt-5 mb-5' />
          
          <Form.Group className="mb-3" controlId="cadastroCEP">
            <Form.Label className='color-custom-primary'>CEP</Form.Label>
            <Form.Control required className='input-custom-primary' type="number" onChange={formik.handleChange} value={formik.values.cep} name='cep' />
          </Form.Group>
          <Form.Group className="mb-3" controlId="cadastroEndereco">
            <Form.Label className='color-custom-primary'>Endereço</Form.Label>
            <Form.Control required className='input-custom-primary' readOnly type="text" onChange={formik.handleChange} value={formik.values.endereco} name='endereco' />
          </Form.Group>

          <hr className='mt-5 mb-5' />


          <Form.Group className="mb-3" controlId="cadastroSenha">
            <Form.Label className='color-custom-primary'>Senha</Form.Label>
            <Form.Control required className='input-custom-primary' type="password" onChange={formik.handleChange} value={formik.values.senha} name='senha' />
          </Form.Group>
          <Form.Group className="mb-3" controlId="cadastroSenhaConfirmacao">
            <Form.Label className='color-custom-primary'>Confirmação da Senha</Form.Label>
            <Form.Control required className='input-custom-primary' type="password" onChange={formik.handleChange} value={formik.values.confirmacaoSenha} name='confirmacaoSenha' />
          </Form.Group>

          <hr className='mt-5 mb-5' />


          <Form.Check 
            type="switch"
            id="cadastroTipoUsuario"
            label={`Sou ${formik.values.tipoUsuario === 'paciente' ? 'paciente' : 'médico'}`}
            checked={formik.values.tipoUsuario === 'paciente'}
            onChange={e => formik.setFieldValue('tipoUsuario', e.target.checked ? 'paciente' : 'medico')}
          />
          

          {formik.values.tipoUsuario === 'paciente' ? (
            <>
              <Form.Group className="mb-3" controlId="cadastroAlergias">
                <Form.Label className='color-custom-primary'>Alergias <sub>(1 por linha)</sub></Form.Label>
                <Form.Control required className='input-custom-primary' type="text" as='textarea' onChange={formik.handleChange} value={formik.values.alergias} name='alergias' />
              </Form.Group>
              <Form.Group className="mb-3" controlId="cadastroDoencasCronicas">
                <Form.Label className='color-custom-primary'>Doenças crônicas <sub>(1 por linha)</sub></Form.Label>
                <Form.Control required className='input-custom-primary' type="text" as='textarea' onChange={formik.handleChange} value={formik.values.doencasCronicas} name='doencasCronicas' />
              </Form.Group>
            </>
          ) : (
            <>
              <Form.Group className="mb-3" controlId="cadastroCRM">
                <Form.Label className='color-custom-primary'>CRM</Form.Label>
                <Form.Control required className='input-custom-primary' type="text" onChange={formik.handleChange} value={formik.values.crm} name='crm' />
              </Form.Group>
              <Form.Group className="mb-3" controlId="cadastroEspecialidade">
                <Form.Label className='color-custom-primary'>Especialidade</Form.Label>
                <Form.Control required className='input-custom-primary' type="text" onChange={formik.handleChange} value={formik.values.especialidade} name='especialidade' />
              </Form.Group>
            </>
          )} 

          <Row className='mt-5'>
            <Col className='text-start'>
              <Button variant='custom-primary' className='w-100' type="submit" >
                Cadastrar
              </Button>
            </Col>
          </Row>
        </Form>
      </Row>

      <div className='mt-5'/>


    </Container>
  )
}