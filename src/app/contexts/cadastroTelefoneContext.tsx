import React, { createContext, useState } from 'react'
import { Telefone } from '../../domain/clientes/models'

export interface CadastroTelefoneContextProps {
  data?: Telefone
  setData(telefone: Telefone): void
  resetData() : void
}

const initialValues: Telefone = {
  ddd: '',
  numero: '',
  ramal: '',
  whatsapp: 'n'
}

export const CadastroTelefoneContext = createContext<CadastroTelefoneContextProps>({} as CadastroTelefoneContextProps)

export const CadastroTelefoneProvider: React.FC = ({ children }) => {
  const [telefone, setTelefone] = useState<Telefone>(initialValues)

  const resetData = () => {
    setTelefone(initialValues)
  }

  return (
    <CadastroTelefoneContext.Provider value={{ data: telefone, setData: setTelefone, resetData }} >
      {children}
    </CadastroTelefoneContext.Provider>
  )
}
