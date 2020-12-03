import React, { createContext, useState, useContext } from 'react'
import { Cliente } from '../../../domain/clientes/models/cliente'

interface ClienteDataCadastroState{
  data: Cliente
  error?: any
}

const initialState: ClienteDataCadastroState = {
  error: undefined,
  data: {
    razao_social: '',
    nome_fantasia: '',
    email: '',
    email_nfe: '',
    email_nfe2: '',
    cnpj: '',
    ie: '',
    cep: '',
    endereco: '',
    numero: '',
    bairro: '',
    cidade: '',
    complemento: '',
    regiao: '',
    uf: '',
    is_cliente_final: 'n',
    is_orgao_estadual: 'n',
    is_revenda: 'n',
    contatos: []
  }

}

const ClienteDataContext = createContext<[
  ClienteDataCadastroState, React.Dispatch<React.SetStateAction<ClienteDataCadastroState>> ]>([] as unknown as [ClienteDataCadastroState, React.Dispatch<React.SetStateAction<ClienteDataCadastroState>> ])

export const useClienteDataCadastro = (): [ClienteDataCadastroState, React.Dispatch<React.SetStateAction<ClienteDataCadastroState>> ] => {
  const context = useContext(ClienteDataContext)

  if (!context) {
    throw new Error('useClienteDataCadastro  deve ser utilizado como ClienteDataCadastroProvider')
  }

  return context
}

export const ClienteDataCadastroProvider: React.FC = ({ children }) => {
  const state = useState(initialState)

  return (
    <ClienteDataContext.Provider value={state} >
      {children}
    </ClienteDataContext.Provider>
  )
}
