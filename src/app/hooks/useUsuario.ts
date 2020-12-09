import { useContext } from 'react'
import { UsuarioContextProps, UsuarioContext } from '../contexts'

export const useUsuario = (): UsuarioContextProps => {
  const context = useContext(UsuarioContext)

  if (!context) {
    throw new Error('useUsuario deve ser usado com UsuarioProvider')
  }

  return context
}
