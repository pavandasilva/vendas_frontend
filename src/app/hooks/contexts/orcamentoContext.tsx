import React, { createContext, useState } from 'react'
import { Cliente } from '../../../domain/clientes/models/cliente'

export interface ItemOrcamento {
  produtoId: number
  nome: string
  quantidade: number
  faltaLiberar: number
  preco: number
  acrescimo: number
  desconto: number,
  total: number
}

export interface OrcamentoData {
  funcionario?: {
    id: number
    nome: string
  },
  funcionario2?: {
    id: number
    nome: string
  },
  cliente?: Cliente,
  contato?: {
    id: number
    nome: string
  },
  revenda?: {
    id: number
    nome: string
  },
  deposito?: {
    id: number
    nome: string
  },
  condicaoPagamento?: string[],
  metodoPagamento?: 'cobranca' | '',
  transportadora?: {
    id: number
    nome: string
  },
  frete?: number,
  itens?: ItemOrcamento[],
  dataHora?: string
}

export interface OrcamentoContextState {
  data: OrcamentoData
  setData(data: OrcamentoData): void
}

export const OrcamentoContext = createContext<OrcamentoContextState>({} as OrcamentoContextState)

export const OrcamentoProvider: React.FC = ({ children }) => {
  const [vendaData, setOrcamentoData] = useState({} as OrcamentoData)

  const setData = (data: OrcamentoData) => {
    setOrcamentoData(data)
  }

  return (
    <OrcamentoContext.Provider value={{ data: vendaData, setData }} >
      {children}
    </OrcamentoContext.Provider>
  )
}
