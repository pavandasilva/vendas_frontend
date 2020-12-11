import React, { ChangeEvent, useCallback } from 'react'
import { FaPhone, FaSlackHash, FaNetworkWired } from 'react-icons/fa'
import { Input, CheckBox } from '..'
import { Telefone } from '../../../domain/clientes/models'
import { useCadastroTelefone } from '../../hooks'
import { FormRow } from '../../styles/global'
import { Container } from './styles'

export const CadastroTelefone = () => {
  const { data: telefone, setData: setTelefone } = useCadastroTelefone()

  const handleInputOnChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value

    if (e.target.type === 'checkbox') {
      value = e.target.checked ? 's' : 'n'
    }

    const key = e.target.name as keyof Telefone

    const newTelefoneState = {
      ...telefone,
      [key]: value
    }

    setTelefone(newTelefoneState as Telefone)
  }, [setTelefone, telefone])

  return (
    <Container>
      <FormRow >
        <Input
          width="1"
          name="ddd"
          title="DDD"
          startIcon={FaSlackHash}
          type="ddd"
          placeholder="DDD"
          value={telefone?.ddd}
          onChange={handleInputOnChange}
        />

        <Input
          width="3"
          name="numero"
          title="Telefone"
          startIcon={FaPhone}
          type="telefone"
          placeholder="Telefone"
          value={telefone?.numero}
          onChange={handleInputOnChange}
        />
      </FormRow>

      <FormRow width={'35%'}>
        <Input
          startIcon={FaNetworkWired}
          name="ramal"
          title="Ramal"
          type="text"
          placeholder="Ramal"
          value={telefone?.ramal}
          onChange={handleInputOnChange}
        />
      </FormRow>

      <FormRow width={'50%'}>
        <CheckBox
          name="whatsapp"
          title="WhatsApp"
          checked={telefone?.whatsapp === 's'}
          onChange={handleInputOnChange}
        />
      </FormRow>
    </Container>
  )
}
