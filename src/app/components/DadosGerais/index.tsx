import capitalize from 'capitalize-pt-br'
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { Input, Select } from '..'
import { Cliente, Contato } from '../../../domain/clientes/models'
import { Empresa } from '../../../domain/empresas/models/empresa'
import { Funcionario } from '../../../domain/funcionarios/models/funcionario'
import { Orcamento } from '../../../domain/pedidos/models/orcamento'
import { ModoPagamentoType } from '../../contexts'
import { useAtendimentos, useEmpresa, useCliente } from '../../hooks'
import { FormRow } from '../../styles/global'
import { ListaContatos } from '../ListaContatos'
import { ListaEmpresas } from '../ListaEmpresas'
import { ListaFuncionarios } from '../ListaFuncionarios'
import { ListaTransportadoras } from '../ListaTransportadoras'
import { Container } from './styles'

interface DadosGeraisProps {
  cliente: Cliente
}

const modosPagamento: ModoPagamentoType[] = [
  'carteira',
  'cheque próprio',
  'cheque terceiro',
  'cobrança',
  'dinheiro'
]

export const DadosGerais = ({ cliente }: DadosGeraisProps) => {
  const [empresaId, setEmpresaId] = useState(0)
  const [transportadoraId, setTransportadoraId] = useState(0)
  const { atendimentos, setOrcamento } = useAtendimentos()
  const { data: empresaData } = useEmpresa(empresaId)
  const { data: transportadoraData } = useCliente(transportadoraId)

  console.log(atendimentos[cliente?.id as number])

  useEffect(() => {
    const orcamento = { ...atendimentos[cliente?.id as number].orcamento, deposito: empresaData?.data }
    setOrcamento(cliente?.id as number, orcamento)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [empresaData?.data, cliente?.id])

  useEffect(() => {
    let transportadora: Cliente = {
      nome_fantasia: ''
    }

    if (transportadoraData?.data) {
      transportadora = transportadoraData.data
    }

    const orcamento = { ...atendimentos[cliente?.id as number]?.orcamento, transportadora }
    setOrcamento(cliente?.id as number, orcamento)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transportadoraData, cliente])

  const handleContatoF2CallBack = useCallback((value: any) => {
    const contato = value as Contato
    const orcamento = { ...atendimentos[cliente?.id as number]?.orcamento, contato }
    setOrcamento(cliente?.id as number, orcamento)
  }, [cliente, atendimentos, setOrcamento])

  const handleDepositosF2Callback = useCallback((value: any) => {
    const empresa = value as Empresa
    const orcamento = { ...atendimentos[cliente?.id as number]?.orcamento, deposito: empresa }
    setOrcamento(cliente?.id as number, orcamento)
  }, [cliente, atendimentos, setOrcamento])

  const handleTransportadorasF2Callback = useCallback((value: any) => {
    const transportadora = value as Cliente
    const orcamento = { ...atendimentos[cliente?.id as number]?.orcamento, transportadora }
    setOrcamento(cliente?.id as number, orcamento)
  }, [cliente, atendimentos, setOrcamento])

  const handleContatoIdOnChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    let [contato] = cliente?.contatos?.filter(cont => cont.id === parseInt(e.target.value)) as Contato[]

    if (!contato?.id) {
      contato = {
        nome: ''
      } as Contato
    }

    const orcamento = { ...atendimentos[cliente.id as number]?.orcamento, contato }
    setOrcamento(cliente?.id as number, orcamento)
  }, [cliente, atendimentos, setOrcamento])

  const handleEmpresaIdOnChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    let id = 0

    if (!!e.target.value && e.target.value as unknown as number > 0) {
      id = e.target.value as unknown as number
    }

    if (!e.target.value) {
      const empresa = {
        id: '',
        nome: ''
      } as unknown as Empresa
      const orcamento = { ...atendimentos[cliente?.id as number]?.orcamento, deposito: empresa }
      setOrcamento(cliente?.id as number, orcamento)
    }

    setEmpresaId(id)
  }, [cliente, atendimentos, setOrcamento])

  const handleTransportadoraIdOnChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    let id = 0

    if (!!e.target.value && e.target.value as unknown as number > 0) {
      id = e.target.value as unknown as number
    }

    if (!e.target.value) {
      const transportadora = {
        id: '',
        nome_fantasia: ''
      } as Cliente

      const orcamento = { ...atendimentos[cliente?.id as number]?.orcamento, transportadora }
      setOrcamento(cliente?.id as number, orcamento)
    }

    setTransportadoraId(id)
  }, [cliente, atendimentos, setOrcamento])

  const handleFuncionariosF2CallBack = useCallback((value: any) => {
    const funcionario = value as Funcionario
    const orcamento = { ...atendimentos[cliente?.id as number]?.orcamento, funcionario }
    setOrcamento(cliente?.id as number, orcamento)
  }, [cliente, atendimentos, setOrcamento])

  const handleFuncionarios2F2CallBack = useCallback((value: any) => {
    const funcionario = value as Funcionario
    const orcamento = { ...atendimentos[cliente?.id as number]?.orcamento, funcionario2: funcionario }
    setOrcamento(cliente?.id as number, orcamento)
  }, [cliente, atendimentos, setOrcamento])

  const handleFuncionarioIdOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    let id = 0

    if (!!e.target.value && e.target.value as unknown as number > 0) {
      id = e.target.value as unknown as number
    }

    if (!e.target.value) {
      const funcionario = {
        id: '',
        nome: ''
      } as Funcionario

      const orcamento = { ...atendimentos[cliente?.id as number]?.orcamento, funcionario }
      setOrcamento(cliente as number, orcamento)
    }

    /*  setFuncionarioId(id) */
  }

  const handleCondicaoPagamentoOnChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const condicaoPagamento = e.currentTarget.value.replace(/[^0-9,]/g, '')
    const orcamento = { ...atendimentos[cliente?.id as number]?.orcamento, condicao: condicaoPagamento }

    setOrcamento(cliente?.id as number, orcamento)
  }, [cliente, atendimentos, setOrcamento])

  const handleModoPagamentoOnChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    const orcamento: Orcamento = {
      ...atendimentos[cliente?.id as number]?.orcamento,
      modoPagamento: e.target.value as ModoPagamentoType
    }

    setOrcamento(cliente?.id as number, orcamento)
  }, [cliente, atendimentos, setOrcamento])

  return (
    <Container>
      <FormRow>
        <Input
          width='1'
          name="contato.id"
          title="Digite o código do contato ou F2 para buscar"
          label="Código contato"
          value={atendimentos[cliente?.id as number]?.orcamento?.contato?.id}
          placeholder='Cod. contato'
          type="text"
          f2Title="Lista de contatos"
          f2Content={
            <ListaContatos cliente={cliente}/>
          }

          f2CallBack={handleContatoF2CallBack}
          onChange={handleContatoIdOnChange}
          disabled
        />

        <Input
          width='5'
          name="contato.nome"
          label="Contato"
          title="Contato"
          value={capitalize(atendimentos[cliente?.id as number]?.orcamento?.contato?.nome as string)}
          placeholder='Nome do Contato'
          disabled
        />
      </FormRow>

      <FormRow>
        <Input
          width='1'
          name="empresa.id"
          title={!atendimentos[cliente?.id as number].contato?.nome ? 'Primeiro selecione um contato' : 'Código depósito ou F2 para buscar'}
          label='Código depósito'
          placeholder='Cod. depósito'
          value={empresaId || atendimentos[cliente?.id as number]?.orcamento?.deposito?.id}
          type="text"
          f2Title="Lista de depósitos"
          f2Content={
            <ListaEmpresas/>
          }
          f2CallBack={handleDepositosF2Callback}
          onChange={handleEmpresaIdOnChange}
          disabled={!atendimentos[cliente?.id as number]?.orcamento?.contato?.nome}

        />

        <Input
          width='5'
          name="empresa.nome"
          label="Depósito"
          value={capitalize(atendimentos[cliente?.id as number]?.orcamento?.deposito?.nome as string)}
          placeholder='Depósito'
          disabled
        />
      </FormRow>

      <FormRow>
        <Input
          width='1'
          name="transportadora.id"
          title={!atendimentos[cliente?.id as number].orcamento?.transportadora?.nome_fantasia ? 'Primeiro selecione um contato' : 'Código transportadora ou F2 para buscar'}
          label="Código transportadora"
          placeholder='Cod. transportadora'
          value={transportadoraId || atendimentos[cliente?.id as number]?.orcamento?.transportadora?.id}
          onChange={handleTransportadoraIdOnChange}
          type="text"
          /*     disabled= { dataMode === 'edit'} */
          f2Title="Lista de transportadoras"
          f2ModalMode="fullscreen"
          f2Content={
            <ListaTransportadoras/>
          }
          f2CallBack={handleTransportadorasF2Callback}
          disabled={!atendimentos[cliente?.id as number].orcamento?.contato?.nome}
        />

        <Input
          width='5'
          name="cliente.nome"
          label="Transportadora"
          value={capitalize(atendimentos[cliente?.id as number]?.orcamento?.transportadora?.nome_fantasia as string)}
          placeholder='Transportadora'
          disabled
        />
      </FormRow>
      <FormRow>
        <Input
          width='1'
          name="funcionario.id"
          title={!atendimentos[cliente?.id as number].contato?.nome ? 'Primeiro selecione um contato' : 'Código funcionário ou F2 para buscar'}
          label="Código funcionário"
          placeholder='Cod. funcionário'
          value={atendimentos[cliente?.id as number]?.orcamento?.funcionario?.id}

          onChange={handleFuncionarioIdOnChange}
          type="text"
          f2Title="Lista de funcionários"
          f2Content={
            <ListaFuncionarios/>
          }
          f2ModalMode="normal"
          f2CallBack={handleFuncionariosF2CallBack}
          disabled={!atendimentos[cliente?.id as number].orcamento?.contato?.nome}
        />

        <Input
          width='5'
          name="funcionario.nome"
          label="Funcionário"
          value={capitalize(atendimentos[cliente?.id as number]?.orcamento?.funcionario?.nome as string)}
          placeholder='Funcionário'
          disabled
        />
      </FormRow>

      <FormRow>
        <Input
          width='1'
          name="funcionario2.id"
          label="Código Funcionário 2"
          title={!atendimentos[cliente?.id as number].contato?.nome ? 'Primeiro selecione um contato' : 'Código funcionário ou F2 para buscar'}
          placeholder='Cod. funcionario 2'
          value={atendimentos[cliente?.id as number]?.orcamento?.funcionario2?.id}
          type="text"
          f2Title="Lista de funcionários"
          f2Content={
            <ListaFuncionarios/>
          }
          f2ModalMode="normal"
          f2CallBack={handleFuncionarios2F2CallBack}
          disabled={!atendimentos[cliente?.id as number]?.orcamento?.contato?.nome}
        />

        <Input
          width='5'
          name="funcionario2.nome"
          label="Funcionário 2"
          value={capitalize(atendimentos[cliente?.id as number]?.orcamento?.funcionario2?.nome as string)}
          placeholder='Funcionário 2'
          disabled
        />
      </FormRow>
      <FormRow>
        <Input
          width='3'
          name="condicao"
          label="Condição de pagamento"
          title={!atendimentos[cliente?.id as number].contato?.nome ? 'Primeiro selecione um contato' : 'Condição de pagamento'}
          placeholder='Condição de pagamento(ex: 0,30,60,90)'
          value={atendimentos[cliente?.id as number]?.orcamento?.condicao}
          onChange={handleCondicaoPagamentoOnChange}
          type="text"
          disabled={!atendimentos[cliente?.id as number].contato?.nome}
        />

        <Input
          width='2'
          name="juros"
          label="Juros"
          value={`${atendimentos[cliente?.id as number]?.orcamento?.juros}%`}
          placeholder='Juros'
          disabled
        />

        <Select
          width='5'
          name="modo_pagamento"
          onChange={handleModoPagamentoOnChange}
          value={atendimentos[cliente?.id as number]?.orcamento?.modoPagamento}
          title="Modo de pagamento"
          /*    disabled= { dataMode === 'edit'} */
          defaultValue=""
          disabled={!atendimentos[cliente?.id as number].orcamento?.contato?.nome}
        >

          { modosPagamento.map(modoPagamento =>
            <option key={modoPagamento} value={modoPagamento}>{capitalize(modoPagamento)}</option>
          )}

        </Select>
      </FormRow>
    </Container>
  )
}
