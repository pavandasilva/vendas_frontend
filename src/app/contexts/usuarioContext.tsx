import React, { createContext, useState } from 'react'
import jwt_decode from 'jwt-decode'
import { Usuario } from '../../domain/usuarios/models/usuario'

export interface UsuarioContextProps {
  data?: Usuario
  setData(token: string): void
  logout(): void
}

export const UsuarioContext = createContext<UsuarioContextProps>({} as UsuarioContextProps)

export const UsuarioProvider: React.FC = ({ children }) => {
  const [usuario, setUsuario] = useState<Usuario>(() => {
    const token = localStorage.getItem(`@${process.env.REACT_APP_NAME}:token`)

    if (token) {
      const dataUsuario = jwt_decode(token) as Usuario
      dataUsuario.token = token
      return dataUsuario
    }

    return {} as Usuario
  })

  const setData = (token: string) => {
    try {
      const dataUsuario = jwt_decode(token) as Usuario
      dataUsuario.token = token
      setUsuario(dataUsuario)
    } catch (error) {
      setUsuario({} as Usuario)
    }
  }

  const logout = () => {
    console.log('logout')
    localStorage.removeItem(`@${process.env.REACT_APP_NAME}:token`)
    setUsuario({} as Usuario)
  }

  return (
    <UsuarioContext.Provider value={{ data: usuario, setData, logout }} >
      {children}
    </UsuarioContext.Provider>
  )
}
