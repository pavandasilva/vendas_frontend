import produce from 'immer'
import React, { createContext, ReactNode, useCallback, useState } from 'react'
import { Cliente } from '../../domain/clientes/models'
import { ItemOrcamento } from '../../domain/clientes/models/itemOrcamento'

interface Orcamento {
  itens: ItemOrcamento[]
  subtotal?: number
  total?: number
  st?: number
  icms?: number
  deposito?: any
  contato?: any
  funcionario?: any
  funcionario2?: any
  condicao: string
  cliente: Cliente
  transportadora: any
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
  deposito: {},
  contato: {},
  funcionario: {},
  funcionario2: {},
  condicao: '',
  cliente: { } as Cliente,
  transportadora: { }
}

export interface OrcamentoContextProps {
  orcamentos: Orcamentos
  setItensOrcamento: (clienteId: number, itens: ItemOrcamento[]) => void
  startOrcamento: (clienteId: number) => void
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

  return (
    <OrcamentoContext.Provider value={{
      orcamentos,
      setItensOrcamento,
      startOrcamento
    }}>
      { children }
    </OrcamentoContext.Provider>
  )
}
