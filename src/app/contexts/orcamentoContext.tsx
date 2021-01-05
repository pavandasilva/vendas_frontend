import produce from 'immer'
import React, { createContext, ReactNode, useCallback, useState } from 'react'
import { Cliente, Contato } from '../../domain/clientes/models'
import { ItemOrcamento } from '../../domain/clientes/models/itemOrcamento'
import { Empresa } from '../../domain/empresas/models/empresa'
import { Funcionario } from '../../domain/funcionarios/models/funcionario'

export type ModoPagamentoType = 'carteira' | 'cheque próprio' | 'cheque terceiro' | 'cobrança' | 'dinheiro'

export interface Orcamento {
  itens: ItemOrcamento[]
  subtotal?: number
  total?: number
  st?: number
  icms?: number
  deposito?: Empresa
  contato?: Contato
  funcionario?: Funcionario
  funcionario2?: Funcionario
  condicao: string
  cliente: Cliente
  transportadora: Cliente
  juros: number
  modoPagamento: ModoPagamentoType
  descontos: number
  acrescimos: number
  qtdeItens: number
}

type Orcamentos = {
  [clienteId: number]: Orcamento
}

const initialData: Orcamento = {
  itens: [] as ItemOrcamento[],
  total: 0,
  st: 0,
  icms: 0,
  deposito: {} as Empresa,
  contato: {} as Contato,
  funcionario: {} as Funcionario,
  funcionario2: {} as Funcionario,
  condicao: '',
  cliente: { } as Cliente,
  transportadora: {} as Cliente,
  juros: 0,
  modoPagamento: 'carteira',
  descontos: 0,
  acrescimos: 0,
  qtdeItens: 0,
  subtotal: 0
}

export interface OrcamentoContextProps {
  orcamentos: Orcamentos
  setItensOrcamento: (clienteId: number, itens: ItemOrcamento[]) => void
  startOrcamento: (clienteId: number) => void
  setOrcamento: (clienteId: number, orcamento: Orcamento) => void
}
interface OrcamentoProviderProps {
  children: ReactNode
}

export const OrcamentoContext = createContext<OrcamentoContextProps>({} as OrcamentoContextProps)

export const OrcamentosProvider = ({ children }: OrcamentoProviderProps) => {
  const [orcamentos, setOrcamentos] = useState<Orcamentos>({} as Orcamentos)

  const setItensOrcamento = useCallback((clienteId: number, itens: ItemOrcamento[]) => {
    setOrcamentos(oldState => produce(oldState, draftState => {
      const totalOrcamento = itens.reduce((prevVal, elem) => prevVal + (elem.total || 0), 0)
      const totalST = itens.reduce((prevVal, elem) => prevVal + (elem.stTotal || 0), 0)
      const totalIcms = itens.reduce((prevVal, elem) => prevVal + (elem.icmsItem || 0), 0)
      const acrescimos = itens.reduce((prevVal, elem) => prevVal + (elem.acrescimo || 0), 0)
      const descontos = itens.reduce((prevVal, elem) => prevVal + (elem.desconto || 0), 0)
      const subtotal = itens.reduce((prevVal, elem) => prevVal + ((elem.total || 0) - (elem.stTotal || 0)), 0)
      const qtdeItens = itens.reduce((prevVal, elem) => prevVal + (elem.quantidade || 0), 0)

      draftState[clienteId].total = totalOrcamento
      draftState[clienteId].itens = itens
      draftState[clienteId].st = totalST
      draftState[clienteId].icms = totalIcms
      draftState[clienteId].acrescimos = acrescimos
      draftState[clienteId].descontos = descontos
      draftState[clienteId].subtotal = subtotal
      draftState[clienteId].qtdeItens = qtdeItens
    }))
  }, [])

  const startOrcamento = useCallback((clienteId: number) => {
    setOrcamentos(oldState => ({ ...oldState, [clienteId]: initialData }))
  }, [])

  const setOrcamento = useCallback((clienteId: number, orcamento: Orcamento) => {
    setOrcamentos(oldState => ({ ...oldState, [clienteId]: orcamento }))
  }, [])

  return (
    <OrcamentoContext.Provider value={{
      orcamentos,
      setItensOrcamento,
      startOrcamento,
      setOrcamento
    }}>
      { children }
    </OrcamentoContext.Provider>
  )
}
