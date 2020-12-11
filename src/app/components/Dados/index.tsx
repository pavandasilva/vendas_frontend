import React, { ChangeEvent, useCallback, useState } from 'react'
import { Input } from '../'
import { IEType } from '../../../helpers/getIEMask'
import { useCadastroCliente } from '../../hooks'
import { FormRow } from '../../styles/global'
import { CheckBox } from '../CheckBox'
import { RadioButton } from '../RadioButton'
import { Container, RadioButtons } from './styles'

export const Dados = () => {
  const {
    data: cliente,
    setData: setCliente,
    dataError: clienteError,
    setDataError: setClienteError
  } = useCadastroCliente()

  const [controlFormPessoa, setControlFormPessoa] = useState<'pj' | 'pf'>('pj')
  const [controlFormIsIsento, setControlFormIsIsento] = useState(false)

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value

    if (e.target.type === 'checkbox') {
      value = e.target.checked ? 's' : 'n'
    }

    const newCliente = {
      ...cliente,
      [e.target.name]: value
    }

    // remove o erro do campo que está sendo editado
    const newError = {
      ...clienteError,
      [e.target.name]: ''
    }

    setCliente(newCliente)
    setClienteError(newError)
  }, [cliente, clienteError, setCliente, setClienteError])

  return (
    <Container>
      <section>
        <RadioButtons>
          <div>
            <strong>
              Tipo
            </strong>
            <FormRow>
              <RadioButton
                name="pj"
                checked={controlFormPessoa === 'pj'}
                value="pj"
                onChange={() => setControlFormPessoa('pj')}
                title="Pessoa jurídica"
              />
              <RadioButton
                name="pf"
                checked={controlFormPessoa === 'pf'}
                value="pf"
                onChange={() => setControlFormPessoa('pf')}
                title="Pessoa física"
              />
            </FormRow>
          </div>
          <div>
            <strong>
              Grupo
            </strong>
            <FormRow >
              <CheckBox
                name="is_cliente_final"
                onChange={handleInputChange}
                checked={cliente?.is_cliente_final === 's'}
                title="Cliente final"
              />
              <CheckBox
                name="is_isento"
                checked={controlFormIsIsento}
                onChange={() => setControlFormIsIsento(v => !v)}
                title="Isento"
              />
              <CheckBox
                name="is_orgao_estadual"
                checked={cliente?.is_orgao_estadual === 's'}
                onChange={handleInputChange}
                title="Órgão estadual"
              />
              <CheckBox
                name="is_revenda"
                checked={cliente?.is_revenda === 's'}
                onChange={handleInputChange}
                title="Revenda"
              />
            </FormRow>
          </div>
        </RadioButtons>
      </section>

      <section>
        <FormRow>
          <Input
            name="cnpj"
            title="CNPJ"
            value={cliente?.cnpj}
            placeholder={controlFormPessoa === 'pf' ? 'CPF' : 'CNPJ'}
            onChange={handleInputChange}
            error={clienteError?.cnpj}
            type={controlFormPessoa === 'pf' ? 'cpf' : 'cnpj'}
          />

          <Input
            name="ie"
            title="Inscrição estadual"
            value={cliente?.ie}
            placeholder='Inscrição estadual'
            onChange={handleInputChange}
            error={clienteError?.ie}
            type={`ie-${cliente.uf}` as IEType}
          />

        </FormRow>
        <FormRow>
          <Input
            name="nome_fantasia"
            title="Nome fantasia"
            value={cliente?.nome_fantasia}
            placeholder='Nome fantasia'
            onChange={handleInputChange}
            error={clienteError?.nome_fantasia}
          />

          <Input
            name="razao_social"
            title="Razão social"
            value={cliente?.razao_social}
            placeholder='Razão social'
            onChange={handleInputChange}
            error={clienteError?.razao_social}
          />
        </FormRow>
        <FormRow>
          <Input
            name="email"
            title="E-mail principal"
            value={cliente?.nome_fantasia}
            placeholder='E-mail principal'
            onChange={handleInputChange}
            error={clienteError?.nome_fantasia}
          />
          <Input
            name="email_nfe"
            title="Email Nota Fiscal Eletrônica"
            value={cliente?.email_nfe}
            placeholder='E-mail nota fiscal eletrônica'
            onChange={handleInputChange}
            error={clienteError?.email_nfe}
          />
          <Input
            name="email_nfe2"
            title="Email Nota Fiscal Eletrônica 2"
            value={cliente?.email_nfe2}
            placeholder='E-mail nota fiscal eletrônica'
            onChange={handleInputChange}
            error={clienteError?.email_nfe2}
          />
        </FormRow>
      </section>
    </Container>
  )
}
