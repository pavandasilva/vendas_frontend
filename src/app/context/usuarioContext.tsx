import React, { createContext, useState } from 'react'
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
    const usuario = localStorage.getItem(`@${process.env.REACT_APP_NAME}:usuario`)

    if (usuario) {
      return JSON.parse(usuario)
    }

    return {}
  })

  const login = async (email: string, password: string, rememberPassword: boolean) => {
    const logar = makeLogar()

    try {
      setLoading(true)
      const response = await logar.execute({ email, password })

      if (response) {
        setUsuario(response)
        history.push('/')
      } else {
        setUsuario({} as Usuario)
      }
      setLoading(false)

      if (rememberPassword) {
        localStorage.setItem(`@${process.env.REACT_APP_NAME}:usuario`, JSON.stringify(response))
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
