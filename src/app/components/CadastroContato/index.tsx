import React, { ChangeEvent, useCallback } from 'react'
import { FaEnvelope, FaMarker } from 'react-icons/fa'
import { Input, CheckBox } from '..'
import { Contato } from '../../../domain/clientes/models'
import { useCadastroContato } from '../../hooks/useCadastroContato'
import { FormRow } from '../../styles/global'
import { Container } from './styles'

export const CadastroContato = () => {
  const { data: contato, setData: setContato } = useCadastroContato()
  const handleInputOnChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value

    if (e.target.type === 'checkbox') {
      value = e.target.checked ? 's' : 'n'
    }

    const key = e.target.name as keyof Contato

    const newContatoState = {
      ...contato,
      [key]: value
    }

    setContato(newContatoState as Contato)
  }, [contato, setContato])

  return (
    <>
      <Container>
        <FormRow>
          <Input
            name="nome"
            label="Nome"
            startIcon={FaMarker}
            type="text"
            placeholder="Nome do contato"
            value={contato?.nome}
            onChange={handleInputOnChange}
          />
        </FormRow>
        <FormRow>
          <Input
            name="email"
            startIcon={FaEnvelope}
            label="E-mail"
            type="email"
            placeholder="E-mail do contato"
            value={contato?.email}
            onChange={handleInputOnChange}
          />
        </FormRow>

        <strong>
        Setor
        </strong>
        <FormRow>
          <CheckBox
            name="fiscal"
            checked={contato?.fiscal === 's'}
            onChange={handleInputOnChange}
            title="Fiscal"
          />
          <CheckBox
            name="comercial"
            checked={contato?.comercial === 's'}
            onChange={handleInputOnChange}
            title="Comercial"
          />
          <CheckBox
            name="financeiro"
            checked={contato?.financeiro === 's'}
            onChange={handleInputOnChange}
            title="Financeiro"
          />
        </FormRow>
      </Container>
    </>
  )
}
