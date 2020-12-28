import produce from 'immer'
import React, { createContext, ReactNode, useCallback, useState } from 'react'
import { Cliente, Contato } from '../../domain/clientes/models'
import { ItemOrcamento } from '../../domain/clientes/models/itemOrcamento'
import { Empresa } from '../../domain/empresas/models/empresa'
import { Funcionario } from '../../domain/funcionarios/models/funcionario'

export type ModoPagamentoType = 'carteira' | 'cheque próprio' | 'cheque terceiro' | 'cobrança' | 'dinheiro'

interface Orcamento {
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
  juros: number,
  modoPagamento: ModoPagamentoType
}

type Orcamentos = {
  [clienteId: number]: Orcamento
}

const initialData: Orcamento = {
  itens: [] as ItemOrcamento[],
  subtotal: 0,
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
  modoPagamento: 'carteira'
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
      draftState[clienteId].itens = itens
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
