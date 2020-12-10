import React, { createContext, useState } from 'react'
import { Contato } from '../../domain/clientes/models'

export interface CadastroContatoContextProps {
  data?: Contato
  setData(contato: Contato): void
  resetData() : void
}

const initialState: Contato = {
  comercial: 'n',
  financeiro: 'n',
  fiscal: 'n',
  email: '',
  nome: '',
  status: 'ativo',
  telefones: []
}

export const CadastroContatoContext = createContext<CadastroContatoContextProps>({} as CadastroContatoContextProps)

export const CadastroContatoProvider: React.FC = ({ children }) => {
  const [Contato, setContato] = useState<Contato>(initialState)

  const resetData = () => {
    setContato(initialState)
  }

  return (
    <CadastroContatoContext.Provider value={{ data: Contato, setData: setContato, resetData }} >
      {children}
    </CadastroContatoContext.Provider>
  )
}
