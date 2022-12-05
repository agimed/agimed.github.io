import { Button, Col, Container, Row, Form, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import '../global.css'

import arrowLeftImg from '../../assets/arrow-left.svg'
import { useFormik } from "formik";
import { useEffect } from "react";
import swal from "sweetalert";


export default function () {
  const formik = useFormik({
    initialValues: {
      tipoUsuario: 'paciente',
      nomeCompleto: '',
      cpf: '',
      cep: '',
      numero: '',
      complemento: '',
      endereco: '',
      
      email: '',
      senha: '',
      confirmacaoSenha: '',

      alergias: '',
      doencasCronicas: '',

      crm: '',
      especialidade: '',
    }
  })

  const navigate = useNavigate()

  useEffect(() => {
    const {cep} = formik.values
    if(!cep) {
      return
    }

    const onlyNumbers = cep.replace(/\D/g, '')
    formik.setFieldValue('cep', onlyNumbers)
  }, [formik.values.cep])


  async function handleSearchCep() {
    const {cep} = formik.values
    if(!cep) {
      return
    }
    const url = `https://brasilapi.com.br/api/cep/v2/${cep}`
    
    let request = await fetch(url)
    if(request.status !== 200) {
      formik.setFieldValue('endereco', '')
      formik.setFieldValue('cep', '')
      swal({
        icon: 'error',
        text: 'Cep inválido'
      })
      return
    }

    const r = await request.json()
    const address = `${r?.street}, ${r?.neighborhood} - ${r?.city}/${r?.state}`
    formik.setFieldValue('endereco', address)
  }


  function validarCPF(valor) {
    let cpf = String(valor)
    cpf = cpf.replace(/[^\d]+/g,'');	
    if(cpf == '') return false;	
    // Elimina CPFs invalidos conhecidos	
    if (cpf.length != 11 || 
      cpf == "00000000000" || 
      cpf == "11111111111" || 
      cpf == "22222222222" || 
      cpf == "33333333333" || 
      cpf == "44444444444" || 
      cpf == "55555555555" || 
      cpf == "66666666666" || 
      cpf == "77777777777" || 
      cpf == "88888888888" || 
      cpf == "99999999999")
        return false;		
    // Valida 1o digito	
    let add = 0;	
    for (let i=0; i < 9; i ++)		
      add += parseInt(cpf.charAt(i)) * (10 - i);	
      let rev = 11 - (add % 11);	
      if (rev == 10 || rev == 11)		
        rev = 0;	
      if (rev != parseInt(cpf.charAt(9)))		
        return false;		
    // Valida 2o digito	
    add = 0;	
    for (let i = 0; i < 10; i ++)		
      add += parseInt(cpf.charAt(i)) * (11 - i);	
    rev = 11 - (add % 11);	
    if (rev == 10 || rev == 11)	
      rev = 0;	
    if (rev != parseInt(cpf.charAt(10)))
      return false;		
    return true;   
  }


  function handleValidCpf() {
    const {cpf} = formik.values
    if(!cpf) {
      return
    }

    const onlyNumbers = cpf.replace(/\D/g, '')
    if(!validarCPF(onlyNumbers)) {
      swal({
        icon: 'error',
        text: 'CPF inválido'
      })
      formik.setFieldValue('cpf', '')
      return
    }
  }

  useEffect(() => {
    const {cpf} = formik.values
    if(!cpf) {
      return
    }

    const onlyNumbers = cpf.replace(/\D/g, '')

    const pt1 = onlyNumbers.slice(0, 3)
    const pt2 = onlyNumbers.slice(3, 6)
    const pt3 = onlyNumbers.slice(6, 9)
    const pt4 = onlyNumbers.slice(9, 11)

    let format = `${pt1}`
    format += pt2 ? `.${pt2}`: ''
    format += pt3 ? `.${pt3}`: ''
    format += pt4 ? `-${pt4}`: ''

    formik.setFieldValue('cpf', format)
  }, [formik.values.cpf])

  
  
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
            <Form.Control required className='input-custom-primary' type="text" onChange={formik.handleChange} value={formik.values.cpf} name='cpf' onBlur={handleValidCpf} />
          </Form.Group>

          <hr className='mt-5 mb-5' />
          
          <Row>
            <Col sm={12} md={3}>
              <Form.Group className="mb-3" controlId="cadastroCEP">
                <Form.Label className='color-custom-primary'>CEP</Form.Label>
                <Form.Control onBlur={handleSearchCep} required className='input-custom-primary' type="text" onChange={formik.handleChange} value={formik.values.cep} name='cep' />
              </Form.Group>
            </Col>
            <Col></Col>
          </Row>

          <Row>
            <Col sm={12} md={6}>
              <Form.Group className="mb-3" controlId="cadastroNumero">
                <Form.Label className='color-custom-primary'>Número</Form.Label>
                <Form.Control required className='input-custom-primary' type="text" onChange={formik.handleChange} value={formik.values.numero} name='numero' />
              </Form.Group>
            </Col>
            <Col sm={12} md={6}>
              <Form.Group className="mb-3" controlId="cadastroComplemento">
                <Form.Label className='color-custom-primary'>Complemento</Form.Label>
                <Form.Control className='input-custom-primary' type="text" onChange={formik.handleChange} value={formik.values.complemento} name='complemento' />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3" controlId="cadastroEndereco">
            <Form.Label className='color-custom-primary'>Endereço</Form.Label>
            <Form.Control required className='input-custom-primary' readOnly type="text" onChange={formik.handleChange} value={formik.values.endereco} name='endereco' />
          </Form.Group>

          <hr className='mt-5 mb-5' />


          <Form.Group className="mb-3" controlId="cadastroEmail">
            <Form.Label className='color-custom-primary'>E-mail</Form.Label>
            <Form.Control required className='input-custom-primary' type="email" onChange={formik.handleChange} value={formik.values.email} name='email' />
          </Form.Group>
          <Row className={formik.values.senha !== formik.values.confirmacaoSenha ? 'border border-danger rounded p-3' : ''}>
            {formik.values.senha !== formik.values.confirmacaoSenha ? <span className='text-danger'>Senhas não são iguais</span>: null}
            <Col sm={12} md={6}>
              <Form.Group className="mb-3" controlId="cadastroSenha">
                <Form.Label className='color-custom-primary'>Senha</Form.Label>
                <Form.Control required className='input-custom-primary' type="password" onChange={formik.handleChange} value={formik.values.senha} name='senha' />
              </Form.Group>
            </Col>
            <Col sm={12} md={6}>
              <Form.Group className="mb-3" controlId="cadastroSenhaConfirmacao">
                <Form.Label className='color-custom-primary'>Confirmação da Senha</Form.Label>
                <Form.Control required className='input-custom-primary' type="password" onChange={formik.handleChange} value={formik.values.confirmacaoSenha} name='confirmacaoSenha' />
              </Form.Group>
            </Col>
          </Row>

          <hr className='mt-5 mb-5' />



          <Form.Check
            type="radio"
            id="cadastroTipoUsuario"
            label="Sou paciente"
            value="paciente"
            checked={formik.values.tipoUsuario === 'paciente'}
            onChange={e => formik.setFieldValue('tipoUsuario', e.target.checked ? 'paciente' : 'medico')}
          />
          <Form.Check
            type="radio"
            id="cadastroTipoUsuario1"
            label="Sou médico"
            value="medico"
            checked={formik.values.tipoUsuario === 'medico'}
            onChange={e => formik.setFieldValue('tipoUsuario', e.target.checked ? 'medico' : 'paciente')}
          />
          <div className='mb-4' />

          {formik.values.tipoUsuario === 'paciente' ? (
            <>
              <Form.Group className="mb-3" controlId="cadastroAlergias">
                <Form.Label className='color-custom-primary'>Alergias <sub>(1 por linha)</sub></Form.Label>
                <Form.Control required rows={5} className='input-custom-primary' type="text" as='textarea' onChange={formik.handleChange} value={formik.values.alergias} name='alergias' />
              </Form.Group>
              <Form.Group className="mb-3" controlId="cadastroDoencasCronicas">
                <Form.Label className='color-custom-primary'>Doenças crônicas <sub>(1 por linha)</sub></Form.Label>
                <Form.Control required rows={5} className='input-custom-primary' type="text" as='textarea' onChange={formik.handleChange} value={formik.values.doencasCronicas} name='doencasCronicas' />
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