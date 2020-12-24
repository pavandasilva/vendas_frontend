import capitalize from 'capitalize-pt-br'
import React, { useCallback } from 'react'
import { Input, Select } from '..'
import { Cliente, Contato } from '../../../domain/clientes/models'
import { Empresa } from '../../../domain/empresas/models/empresa'
import { ModoPagamentoType } from '../../contexts'
import { useOrcamentos } from '../../hooks/useOrcamentos'
import { FormRow } from '../../styles/global'
import { ListaContatos } from '../ListaContatos'
import { ListaEmpresas } from '../ListaEmpresas'
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
  const { orcamentos, setOrcamento } = useOrcamentos()

  const handleContatoF2CallBack = useCallback((value: any) => {
    const contato = value as Contato
    const orcamento = { ...orcamentos[cliente.id as number], contato }
    setOrcamento(cliente.id as number, orcamento)
  }, [cliente.id, orcamentos, setOrcamento])

  const handleDepositosF2Callback = useCallback((value: any) => {
    const empresa = value as Empresa
    const orcamento = { ...orcamentos[cliente.id as number], deposito: empresa }
    setOrcamento(cliente.id as number, orcamento)
  }, [cliente.id, orcamentos, setOrcamento])

  return (
    <Container>
      <FormRow>
        <Input
          width='1'
          name="contato.id"
          title="Código contato"
          value={orcamentos[cliente.id as number]?.contato?.id}
          placeholder='Cod. contato'

          /* onChange={handleCepInputChange}
          error={clienteError?.cep} */
          type="text"
          /*     disabled= { dataMode === 'edit'} */
          f2Title="Lista de contatos"
          f2Content={
            <ListaContatos cliente={cliente}/>
          }

          f2CallBack={handleContatoF2CallBack}
        />

        <Input
          width='5'
          name="contato.nome"
          title="Contato"
          value={orcamentos[cliente.id as number]?.contato?.nome}
          placeholder='Nome do Contato'
          disabled
        />
      </FormRow>

      <FormRow>
        <Input
          width='1'
          name="empresa.id"
          title="Código depósito"
          placeholder='Cod. depósito'
          value={orcamentos[cliente.id as number]?.deposito?.id}

          /* onChange={handleCepInputChange}
          error={clienteError?.cep} */
          type="text"
          /*     disabled= { dataMode === 'edit'} */
          f2Title="Lista de depósitos"
          f2Content={
            <ListaEmpresas/>
          }

          f2CallBack={handleDepositosF2Callback}
        />

        <Input
          width='5'
          name="empresa.nome"
          title="Depósito"
          value={orcamentos[cliente.id as number]?.deposito?.nome}
          placeholder='Depósito'
          disabled
        />
      </FormRow>

      <FormRow>
        <Input
          width='1'
          name="cliente.id"
          title="Código transportadora"
          placeholder='Cod. transportadora'
          value={orcamentos[cliente.id as number]?.transportadora?.id}

          /* onChange={handleCepInputChange}
          error={clienteError?.cep} */
          type="text"
          /*     disabled= { dataMode === 'edit'} */
          f2Content={
            <div>ola</div>
          }
        />

        <Input
          width='5'
          name="cliente.nome"
          title="Transportadora"
          value={orcamentos[cliente.id as number]?.transportadora?.nome_fantasia}
          placeholder='Transportadora'
          disabled
        />
      </FormRow>
      <FormRow>
        <Input
          width='1'
          name="funcionario.id"
          title="Código funcionário"
          placeholder='Cod. funcionário'
          value={orcamentos[cliente.id as number]?.funcionario?.id}

          /* onChange={handleCepInputChange}
          error={clienteError?.cep} */
          type="text"
          /*     disabled= { dataMode === 'edit'} */
          f2Content={
            <div>ola</div>
          }
        />

        <Input
          width='5'
          name="funcionario.nome"
          title="Funcionário"
          value={orcamentos[cliente.id as number]?.funcionario?.nome}
          placeholder='Funcionário'
          disabled
        />
      </FormRow>

      <FormRow>
        <Input
          width='1'
          name="funcionario2.id"
          title="Código funcionário 2"
          placeholder='Cod. funcionario 2'
          value={orcamentos[cliente.id as number]?.funcionario2?.id}

          /* onChange={handleCepInputChange}
          error={clienteError?.cep} */
          type="text"
          /*     disabled= { dataMode === 'edit'} */
          f2Title="Funcionários"
          f2Content={
            <div> ola </div>
          }
        />

        <Input
          width='5'
          name="funcionario2.nome"
          title="Funcionário 2"
          value={orcamentos[cliente.id as number]?.funcionario2?.nome}
          placeholder='Funcionário 2'
          disabled
        />
      </FormRow>
      <FormRow>
        <Input
          width='3'
          name="condicao"
          title="Condição de pagamento"
          placeholder='Condição de pagamento(ex: 0,30,60,90)'
          value={orcamentos[cliente.id as number]?.condicao}

          /* onChange={handleCepInputChange}
          error={clienteError?.cep} */
          type="text"
          /*     disabled= { dataMode === 'edit'} */
        />

        <Input
          width='2'
          name="juros"
          title="Juros"
          value={`${orcamentos[cliente.id as number]?.juros}%`}
          placeholder='Juros'
          disabled
        />

        <Select
          width='5'
          name="uf"
          /*   onChange={handleSelectChange} */
          value={orcamentos[cliente.id as number]?.modoPagamento}
          title="Modo de pagamento"
          /*    disabled= { dataMode === 'edit'} */
          defaultValue=""
        >

          { modosPagamento.map(modoPagamento =>
            <option key={modoPagamento} value={modoPagamento}>{capitalize(modoPagamento)}</option>
          )}
        </Select>
      </FormRow>
    </Container>
  )
}
