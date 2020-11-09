import React, { ChangeEvent, FormEvent, useContext, useState } from 'react'
import { Button, Image } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import { UsuarioContext } from '../../context'
import './styles.scss'

export const Login: React.FC = () => {
  const { login, loading } = useContext(UsuarioContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.id === 'email') {
      setEmail(event.target.value)
    } else if (event.target.id === 'password') {
      setPassword(event.target.value)
    }
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    try {
      login(email, password)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div id="login" className="container h-100">
      <Form className="form-signin" onSubmit={handleSubmit}>
        <div className="text-center mb-4">
          <Image src="https://intranet.route66.com.br/img/brasao.png" />
          <h1 className="h3 mb-3 font-weight-normal">
            DISTRIBUIDORA ROUTE 66
          </h1>
        </div>

        <Form.Group controlId="email" bsPrefix="form-label-group" >
          <Form.Control type="email" value={email} onChange={handleInputChange}/>
          <Form.Label>E-mail</Form.Label>
        </Form.Group>

        <Form.Group controlId="password" bsPrefix="form-label-group">
          <Form.Control type="password" value={password} onChange={handleInputChange}/>
          <Form.Label>Senha</Form.Label>
        </Form.Group>

        <Form.Group>
          <Form.Check type="checkbox" className="mr-1" label="Manter conectados" id="lembrar" />
        </Form.Group>
        <Button size="lg" variant="primary" type="submit" block>Acessar</Button>
        <p className="mt-5 mb-3 text-muted text-center">© 2020</p>
      </Form>
    </div>
  )
}
