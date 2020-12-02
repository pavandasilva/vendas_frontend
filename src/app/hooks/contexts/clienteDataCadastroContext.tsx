import React, { createContext, useState, useContext, useCallback } from 'react'
import { Cliente } from '../../../domain/clientes/models/cliente'

const initialCliente: Cliente = {
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

const ClienteDataContext = createContext<[Cliente, React.Dispatch<React.SetStateAction<Cliente>> ]>([] as unknown as [Cliente, React.Dispatch<React.SetStateAction<Cliente>> ])

export const useClienteDataCadastro = (): [Cliente, React.Dispatch<React.SetStateAction<Cliente>> ] => {
  const context = useContext(ClienteDataContext)

  if (!context) {
    throw new Error('useClienteDataCadastro  deve ser utilizado como ClienteDataCadastroProvider')
  }

  return context
}

export const ClienteDataCadastroProvider: React.FC = ({ children }) => {
  const state = useState(initialCliente)

  return (
    <ClienteDataContext.Provider value={state} >
      {children}
    </ClienteDataContext.Provider>
  )
}
