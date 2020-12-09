import React, { ChangeEvent, useCallback, useState } from 'react'
import { FaEnvelope, FaMarker } from 'react-icons/fa'
import { Input, CheckBox } from '..'
import { Contato } from '../../../domain/clientes/models'
import { FormRow } from '../../styles/global'
import { Container } from './styles'

const initialState: Contato = {
  nome: '',
  email: '',
  comercial: 'n',
  fiscal: 'n',
  financeiro: 'n',
  status: 'ativo'
}

export const CadastroContato = () => {
  /* const [, setCliente] = useCadastroCliente() */
  const [contato, setContato] = useState(initialState)

  const resetForm = useCallback(() => {
    setContato(initialState)
  }, [])

  const handleInputOnChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value

    setContato(contato => {
      if (e.target.type === 'checkbox') {
        value = e.target.checked ? 's' : 'n'
      }

      const newContato = {
        ...contato,
        [e.target.name]: value
      }

      return newContato
    })
  }, [])

  return (
    <Container>
      <FormRow>
        <Input
          name="nome"
          title="Nome"
          startIcon={FaMarker}
          type="text"
          placeholder="Nome do contato"
          value={contato.nome}
          onChange={handleInputOnChange}
        />
      </FormRow>
      <FormRow>
        <Input
          name="email"
          startIcon={FaEnvelope}
          title="E-mail"
          type="email"
          placeholder="E-mail do contato"
          value={contato.email}
          onChange={handleInputOnChange}
        />
      </FormRow>

      <strong>
        Setor
      </strong>
      <FormRow>
        <CheckBox
          name="fiscal"
          checked={contato.fiscal === 's'}
          onChange={handleInputOnChange}
          title="Fiscal"
        />
        <CheckBox
          name="comercial"
          checked={contato.comercial === 's'}
          onChange={handleInputOnChange}
          title="Comercial"
        />
        <CheckBox
          name="financeiro"
          checked={contato.financeiro === 's'}
          onChange={handleInputOnChange}
          title="Financeiro"
        />
      </FormRow>

    </Container>)
}
