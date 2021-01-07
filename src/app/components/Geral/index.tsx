import capitalize from 'capitalize-pt-br'
import React, { ChangeEvent, useCallback } from 'react'
import { HeaderAtendimento, Input, ListaContatos } from '..'
import { Cliente, Contato } from '../../../domain/clientes/models'
import { useAtendimentos, useCliente } from '../../hooks'
import { FormRow } from '../../styles/global'
import { Container } from './styles'

interface GeralProps {
  cliente: Cliente
}

export const Geral = ({ cliente }: GeralProps) => {
  const { atendimentos, setAtendimento } = useAtendimentos()
  const { data: clienteData } = useCliente(cliente?.id as number)

  const handleContatoF2CallBack = useCallback((value: any) => {
    const contato = value as Contato
    const atendimentoCliente = atendimentos[cliente?.id as number]
    setAtendimento(cliente?.id as number, { ...atendimentoCliente, contato })
  }, [atendimentos, cliente.id, setAtendimento])

  const handleContatoIdOnChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    let [contato] = clienteData?.data?.contatos?.filter(cont => cont.id === parseInt(e.target.value)) as Contato[]

    if (!contato?.id) {
      contato = {
        nome: ''
      } as Contato
    }

    const atendimentoCliente = atendimentos[cliente?.id as number]
    setAtendimento(cliente?.id as number, { ...atendimentoCliente, contato })
  }, [clienteData, atendimentos, cliente.id, setAtendimento])

  return (
    <>
      <HeaderAtendimento>
        <FormRow>
          <Input
            width='1'
            name="contato.id"
            title="Digite o código do contato ou F2 para buscar"
            label="Código contato"
            value={atendimentos[cliente?.id as number]?.contato?.id}
            placeholder='Cod. contato'
            type="text"
            f2Title="Lista de contatos"
            f2Content={
              <ListaContatos cliente={clienteData?.data as Cliente}/>
            }

            f2CallBack={handleContatoF2CallBack}
            onChange={handleContatoIdOnChange}
          />
          <Input
            width='5'
            name="contato.nome"
            label="Contato"
            title="Contato"
            value={capitalize(atendimentos[cliente?.id as number]?.contato?.nome as string)}
            placeholder='Nome do Contato'
            disabled
          />
        </FormRow>

      </HeaderAtendimento>
      <Container></Container>
    </>
  )
}

/*
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
 */
