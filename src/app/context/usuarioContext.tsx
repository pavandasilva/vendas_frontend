import React, { createContext, useState } from 'react'
import jwt_decode from 'jwt-decode'
import { history } from '../routes/history'
import { toast } from 'react-toastify'
import { makeLogar } from '../../domain/usuarios/factories/makeLogar'
import { Usuario } from '../../domain/usuarios/models/usuario'
import { AppError } from '../../helpers/appError'

interface UsuarioContextState {
  error?: Error
  usuario?: Usuario
  login(email: string, password: string, rememberPassword: boolean): Promise<void>
  logout(): void
  loading: boolean
}

export const UsuarioContext = createContext<UsuarioContextState>({} as UsuarioContextState)

export const UsuarioProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const [usuario, setUsuario] = useState<Usuario>(() => {
    const token = localStorage.getItem(`@${process.env.REACT_APP_NAME}:token`)

    if (token) {
      return jwt_decode(token) as Usuario
    }

    return {} as Usuario
  })

  const login = async (email: string, password: string, rememberPassword: boolean) => {
    const logar = makeLogar()

    try {
      setLoading(true)
      const token = await logar.execute({ email, password })

      if (token) {
        if (token) {
          setUsuario(jwt_decode(token) as Usuario)
          history.push('/')
        } else {
          setUsuario({} as Usuario)
        }

        console.log(usuario)

        setLoading(false)

        if (rememberPassword) {
          localStorage.setItem(`@${process.env.REACT_APP_NAME}:token`, JSON.stringify(token))
        }
      }
    } catch (error) {
      setLoading(false)

      if (error.type === 'validate') {
        throw new AppError(error)
      }

      toast.error('Falha no login, verifique seus dados')
    }
  }

  const logout = async () => {
    setUsuario({} as Usuario)
    localStorage.removeItem('@vendas:usuario')
    setUsuario({} as Usuario)
  }

  return (
    <UsuarioContext.Provider value={{ usuario, login, logout, loading }} >
      {children}
    </UsuarioContext.Provider>
  )
}
