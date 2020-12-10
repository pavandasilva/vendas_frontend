import { useContext } from 'react'
import { CadastroContatoContext, CadastroContatoContextProps } from '../contexts/cadastroContatoContext'

export const useCadastroContato = (): CadastroContatoContextProps => {
  const context = useContext(CadastroContatoContext)

  if (!context) {
    throw new Error('useCadastroContato deve ser usado com ContatoProvider')
  }

  return context
}
