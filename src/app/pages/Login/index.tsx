import React, { ChangeEvent, FormEvent, useCallback, useState } from 'react'
import { toast } from 'react-toastify'
import { FaEnvelope, FaLock } from 'react-icons/fa'
import { Link, useHistory } from 'react-router-dom'
import { Input, Button } from '../../components'
import Logo from '../../assets/imgs/logo_brasao.png'
import { Container, Inputs, RememberMe, Wrapper } from './styles'
import { makeLogar } from '../../../domain/usuarios/factories/makeLogar'
import { useUsuario } from '../../hooks'

const logar = makeLogar()

export const Login = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<any>({})
  const [password, setPassword] = useState('')
  const [autoLogin, setAutoLogin] = useState<boolean>(() => {
    const value = localStorage.getItem(`@${process.env.REACT_APP_NAME}:autologin`)
    return value === 'true'
  })

  const [requesting, setRequesting] = useState(false)
  const routerHistory = useHistory()
  const { setData: setTokenUsuario } = useUsuario()

  const onSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault()
      setError({})
      setRequesting(true)

      try {
        const token = await logar.execute({
          email,
          password
        })

        if (token) {
          setTokenUsuario(token)

          if (autoLogin) {
            localStorage.setItem(`@${process.env.REACT_APP_NAME}:token`, token)
          } else {
            localStorage.removeItem(`@${process.env.REACT_APP_NAME}:autologin`)
            localStorage.removeItem(`@${process.env.REACT_APP_NAME}:token`)
          }

          routerHistory.push('/')
        }
      } catch (error) {
        if (error.type === 'validate') {
          setError(error?.data)
        } else {
          toast.error(error.message || 'Erro desconhecido')
        }
      } finally {
        setRequesting(false)
      }
    }, [autoLogin, email, password, routerHistory, setTokenUsuario]
  )

  const handleCheckOnChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    localStorage.setItem(`@${process.env.REACT_APP_NAME}:autologin`, JSON.stringify(event.target.checked))
    setAutoLogin(event.target.checked)
  }, [])

  const handleInputOnChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setError({})

    if (event.target.name === 'email') {
      setEmail(event.target.value)
    } else if (event.target.name === 'password') {
      setPassword(event.target.value)
    }
  }, [])

  return (
    <Wrapper>
      <Container>
        <form action="submit" onSubmit={onSubmit}>
          <div>
            <img src={Logo} alt=""/>
            <span>Digite seu e-mail e senha</span>
          </div>
          <Inputs>
            <Input
              name="email"
              value={email}
              onChange={handleInputOnChange}
              startIcon={FaEnvelope}
              title="E-mail"
              placeholder="E-mail"
              error={error?.email}
              type="email"
            />
            <Input
              name="password"
              type="password"
              value={password}
              onChange={handleInputOnChange}
              startIcon={FaLock}
              title="Senha"
              placeholder="Senha"
              error={error?.password}
            />
            <RememberMe>
              <div>
                <input
                  type="checkbox"
                  checked={autoLogin}
                  onChange={handleCheckOnChange}
                />
                <span>Manter-me logado</span>
              </div>

              <Link to="/lembrar-password">Esqueceu a senha? </Link>
            </RememberMe>
          </Inputs>
          <Button type="submit" showSpinner={requesting} mode="confirm">
            Entrar
          </Button>
        </form>
      </Container>
    </Wrapper>
  )
}
