import React, { createContext, useState, useContext } from 'react'
import jwt_decode from 'jwt-decode'
import { history } from '../routes/history'
import { toast } from 'react-toastify'
import { makeLogar } from '../../domain/usuarios/factories/makeLogar'
import { Usuario } from '../../domain/usuarios/models/usuario'
import { AppError } from '../../helpers/appError'

interface UsuarioContextState {
  data?: Usuario
  login(email: string, password: string, rememberPassword: boolean): Promise<void>
  logout(): void
  loading: boolean
}

export const UsuarioContext = createContext<UsuarioContextState>({} as UsuarioContextState)

export const useUsuario = (): UsuarioContextState => {
  const context = useContext(UsuarioContext)

  if (!context) {
    throw new Error('useUsuario deve ser usado com UsuarioProvider')
  }

  return context
}

export const UsuarioProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const [usuario, setUsuario] = useState<Usuario>(() => {
    const token = localStorage.getItem(`@${process.env.REACT_APP_NAME}:token`)

    if (token) {
      const dataUsuario = jwt_decode(token) as Usuario
      dataUsuario.token = token
      return dataUsuario
    }

    return {} as Usuario
  })

  const login = async (email: string, password: string, rememberPassword = false) => {
    const logar = makeLogar()

    try {
      setLoading(true)
      const token = await logar.execute({ email, password })

      if (token) {
        const nUsuario = jwt_decode(token) as Usuario
        nUsuario.token = token
        setUsuario(nUsuario)
        history.push('/')
        localStorage.setItem(`@${process.env.REACT_APP_NAME}:rememberPassword`, rememberPassword.toString())
        localStorage.setItem(`@${process.env.REACT_APP_NAME}:token`, token)
      } else {
        setUsuario({} as Usuario)
      }

      setLoading(false)
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
    localStorage.removeItem(`@${process.env.REACT_APP_NAME}:token`)
    setUsuario({} as Usuario)
  }

  return (
    <UsuarioContext.Provider value={{ data: usuario, login, logout, loading }} >
      {children}
    </UsuarioContext.Provider>
  )
}
