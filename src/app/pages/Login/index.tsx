import React, { ChangeEvent, FormEvent, useContext, useEffect, useState, useCallback } from 'react'
import { Button, Image, Spinner } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import { UsuarioContext } from '../../context'
import Brasao from '../../assets/imgs/brasao.png'
import './styles.scss'

export const Login: React.FC = () => {
  const { login, loading } = useContext(UsuarioContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberPassword, setRememberPassword] = useState(false)

  useEffect(() => {
    const remember = localStorage.getItem(`@${process.env.REACT_APP_NAME}:remember`) as string

    if (remember === 'true') {
      setRememberPassword(true)
    } else {
      setRememberPassword(false)
    }
  }, [])

  const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.id === 'email') {
      setEmail(event.target.value)
    } else if (event.target.id === 'password') {
      setPassword(event.target.value)
    }
  }, [])

  const handleSubmit = useCallback((event: FormEvent) => {
    event.preventDefault()
    login(email, password, rememberPassword)
  }, [email, login, password, rememberPassword])

  const handleCheckOnChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    localStorage.setItem(`@${process.env.REACT_APP_NAME}:remember`, JSON.stringify(event.target.checked))
    setRememberPassword(event.target.checked)
  }, [])

  return (
    <div id="login" className="container h-100">
      <Form className="form-signin" onSubmit={handleSubmit}>
        <div className="text-center mb-4">
          <Image src={Brasao} />
          <h1 className="h3 mb-3 font-weight-normal">
            DISTRIBUIDORA ROUTE 66
          </h1>
        </div>

        <Form.Group controlId="email" bsPrefix="form-label-group" >
          <Form.Control type="email" value={email} onChange={handleInputChange} />
          <Form.Label>E-mail</Form.Label>
        </Form.Group>

        <Form.Group controlId="password" bsPrefix="form-label-group">
          <Form.Control type="password" value={password} onChange={handleInputChange} />
          <Form.Label>Senha</Form.Label>
        </Form.Group>

        <Form.Group>
          <Form.Check type="checkbox" checked={rememberPassword} className="mr-1" label="Manter conectado" id="lembrar" onChange={handleCheckOnChange} />
        </Form.Group>
        <Button size="lg" variant="primary" disabled={loading || (!email || !password)} type="submit" block>
          {loading ? <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true" /> : 'Acessar'}
        </Button>
        <p className="mt-5 mb-3 text-muted text-center">© 2020</p>
      </Form>
    </div>
  )
}
