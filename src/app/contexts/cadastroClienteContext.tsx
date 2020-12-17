import React, { createContext, ReactNode, useCallback, useState } from 'react'
import { Cliente } from '../../domain/clientes/models'

const initialState: Cliente = {
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

export type CurrentTab = 'dados' | 'endereco' | 'contatos'
type Mode = 'edit' | 'create'
export interface CadastroClienteContextProps {
  data: Cliente
  setData: (cliente: Cliente) => void
  dataError: any,
  setDataError: (error: any) => void
  currentTab:CurrentTab
  setCurrentTab: (currentTab: CurrentTab) => void
  dataMode: Mode
  setDataMode: (mode: Mode) => void
  resetData: () => void
}

interface CadastroClienteProviderProps {
  children: ReactNode
}

export const CadastroClienteContext = createContext<CadastroClienteContextProps>({} as CadastroClienteContextProps)

export const CadastroClienteProvider = ({ children }: CadastroClienteProviderProps) => {
  const [cliente, setCliente] = useState<Cliente>(initialState)
  const [error, setError] = useState({})
  const [currentTab, setCurrentTab] = useState<CurrentTab>('dados')
  const [mode, setMode] = useState<Mode>('create')

  const setData = useCallback((cliente: Cliente) => {
    setCliente(cliente)
  }, [])

  const setDataError = useCallback((error: any) => {
    setError(error)
  }, [])

  const setDataMode = useCallback((mode: Mode) => {
    setMode(mode)
  }, [])

  const resetData = useCallback(() => {
    setCliente(initialState)
  }, [])

  return (
    <CadastroClienteContext.Provider value={{
      data: cliente,
      setData,
      dataError: error,
      setDataError,
      currentTab,
      setCurrentTab,
      dataMode: mode,
      setDataMode,
      resetData
    }}>
      { children }
    </CadastroClienteContext.Provider>
  )
}
