import produce from 'immer'
import React, { createContext, ReactNode, useCallback, useState } from 'react'
import { Cliente, Contato } from '../../domain/clientes/models'
import { ItemOrcamento } from '../../domain/pedidos/models/itemOrcamento'
import { Empresa } from '../../domain/empresas/models/empresa'
import { Funcionario } from '../../domain/funcionarios/models/funcionario'
import { Orcamento } from '../../domain/pedidos/models'

export type ModoPagamentoType = 'carteira' | 'cheque próprio' | 'cheque terceiro' | 'cobrança' | 'dinheiro'

interface Atendimento {
  contato: Contato
  funcionario?: Funcionario
  orcamento?: Orcamento
  cliente: Cliente
}

type Atendimentos = {
  [clienteId: number]: Atendimento
}

const dataOrcamentoInitial: Orcamento = {
  itens: [] as ItemOrcamento[],
  total: 0,
  st: 0,
  icms: 0,
  deposito: {} as Empresa,
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

export interface AtendimentoContextProps {
  atendimentos: Atendimentos
  removeAtendimento: (clienteId: number) => void
  setItensOrcamento: (clienteId: number, itens: ItemOrcamento[]) => void
  startAtendimento: (cliente: Cliente, contato: Contato, funcionario: Funcionario) => void
  setAtendimento: (clienteId: number, atendimento: Atendimento) => void
  setOrcamento: (clienteId: number, orcamento: Orcamento) => void
  startOrcamento: (clienteId: number) => void
}
interface AtendimentoProviderProps {
  children: ReactNode
}

export const AtendimentoContext = createContext<AtendimentoContextProps>({} as AtendimentoContextProps)

export const AtendimentosProvider = ({ children }: AtendimentoProviderProps) => {
  const [atendimentos, setAtendimentos] = useState<Atendimentos>({} as Atendimentos)

  const setItensOrcamento = useCallback((clienteId: number, itens: ItemOrcamento[]) => {
    setAtendimentos(oldState => produce(oldState, draftState => {
      const totalPedido = itens.reduce((prevVal, elem) => prevVal + (elem.total || 0), 0)
      const totalST = itens.reduce((prevVal, elem) => prevVal + (elem.stTotal || 0), 0)
      const totalIcms = itens.reduce((prevVal, elem) => prevVal + (elem.icmsItem || 0), 0)
      const acrescimos = itens.reduce((prevVal, elem) => prevVal + (elem.acrescimo || 0), 0)
      const descontos = itens.reduce((prevVal, elem) => prevVal + (elem.desconto || 0), 0)
      const subtotal = itens.reduce((prevVal, elem) => prevVal + ((elem.total || 0) - (elem.stTotal || 0)), 0)
      const qtdeItens = itens.reduce((prevVal, elem) => prevVal + (elem.quantidade || 0), 0)

      const orcamento: Orcamento = {
        ...draftState[clienteId].orcamento,
        itens,
        icms: totalIcms,
        acrescimos,
        descontos,
        subtotal,
        qtdeItens,
        st: totalST,
        total: totalPedido
      }

      draftState[clienteId].orcamento = orcamento
    }))
  }, [])

  const startAtendimento = useCallback((cliente: Cliente, contato: Contato, funcionario: Funcionario) => {
    setAtendimentos(oldState => ({ ...oldState, [cliente.id as number]: { contato, funcionario, cliente } }))
  }, [])

  const removeAtendimento = useCallback((clienteId: number) => {
    setAtendimentos(oldState => {
      let atendimentos = [] as Atendimento []

      Object.keys(oldState).map(key => {
        if (key !== clienteId.toString()) {
          atendimentos.push(oldState[clienteId])
        }
      })
      return atendimentos
    })
  }, [])

  const setOrcamento = useCallback((clienteId: number, orcamento: Orcamento) => {
    setAtendimentos(oldState => produce(oldState, draftState => {
      draftState[clienteId].orcamento = orcamento
    }))
  }, [])

  const startOrcamento = useCallback((clienteId: number) => {
    setAtendimentos(oldState => produce(oldState, draftState => {
      draftState[clienteId].orcamento = {
        ...dataOrcamentoInitial,
        contato: draftState[clienteId].contato,
        funcionario: draftState[clienteId].funcionario
      }
    }))
  }, [])

  const setAtendimento = useCallback((clienteId: number, atendimento: Atendimento) => {
    setAtendimentos(oldState => produce(oldState, draftState => {
      draftState[clienteId] = atendimento
    }))
  }, [])

  return (
    <AtendimentoContext.Provider value={{
      atendimentos,
      removeAtendimento,
      setItensOrcamento,
      startAtendimento,
      setAtendimento,
      startOrcamento,
      setOrcamento
    }}>
      { children }
    </AtendimentoContext.Provider>
  )
}
