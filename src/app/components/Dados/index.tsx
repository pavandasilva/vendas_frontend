import capitalize from 'capitalize-pt-br'
import React, { ChangeEvent, useCallback, useState } from 'react'
import { Input } from '../'
import { makeTrazerDadosCNPJ } from '../../../domain/clientes/factories/makeTrazerDadosCNPJ'
import { Cliente } from '../../../domain/clientes/models'
import { IEType } from '../../../helpers/getIEMask'
import { removerAcento } from '../../../helpers/removerAcentos'
import { FormRow } from '../../styles/global'
import { CheckBox } from '../CheckBox'
import { RadioButton } from '../RadioButton'
import EstadosMunicipios from '../../assets/jsons/estados_municipios.json'
import { Container, RadioButtons } from './styles'
import { useCadastroCliente } from '../../hooks/useCadastroCliente'

const trazerDadosCNPJ = makeTrazerDadosCNPJ()

export const Dados = () => {
  const {
    data: cliente,
    setData: setCliente,
    dataError: clienteError,
    setDataError: setClienteError,
    dataMode
  } = useCadastroCliente()

  const [controlFormPessoa, setControlFormPessoa] = useState<'pj' | 'pf'>('pj')

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

  const handleInputCNPJ = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e)
    let cidade = ''
    const cnpj = e.currentTarget.value.replace(/[^\w\s]/gi, '').replace(/_/g, '')

    if (cnpj.length === 14) {
      try {
        const response = await trazerDadosCNPJ.execute(
          'bf2cc265e3073aab06df3484f56f603e7c409b55e01cddc0bfde6781624c8494'
          , cnpj
        )

        if (response?.data) {
          const [estado] = EstadosMunicipios.estados.filter(estado => estado.sigla === response.data.uf)

          if (estado) {
            const filtered: string[] = estado.cidades.filter(cidade => {
              return removerAcento(cidade).toLowerCase() === removerAcento(response.data.municipio).toLowerCase()
            })

            if (filtered[0]) {
              cidade = filtered[0]
            }
          }

          const newCliente: Cliente = {
            ...cliente,
            endereco: capitalize(response.data.logradouro),
            uf: response.data.uf,
            cidade,
            bairro: capitalize(response.data.bairro),
            cep: response.data.cep,
            cnpj,
            razao_social: capitalize(response.data.nome),
            nome_fantasia: capitalize(response.data.fantasia),
            email: response.data.email,
            complemento: capitalize(response.data.complemento),
            numero: response.data.numero
          }

          setCliente(newCliente)
        } else {
          const newCliente: Cliente = {
            ...cliente,
            cnpj
          }

          setCliente(newCliente)
        }
      } catch (error) {
        const newCliente: Cliente = {
          ...cliente,
          cnpj
        }

        setCliente(newCliente)
      }
    }
  }, [cliente, handleInputChange, setCliente])

  const handleIsIsentoOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newClienteState: Cliente = {
      ...cliente,
      ie: 'isento'
    }

    setCliente(newClienteState)
  }, [cliente, setCliente])

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
                disabled= {dataMode === 'edit'}
              />
              <RadioButton
                name="pf"
                checked={controlFormPessoa === 'pf'}
                value="pf"
                onChange={() => setControlFormPessoa('pf')}
                title="Pessoa física"
                disabled= {dataMode === 'edit'}
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
                disabled= {dataMode === 'edit'}
              />
              <CheckBox
                name="is_isento"
                checked={cliente?.ie === 'isento'}
                onChange={handleIsIsentoOnChange}
                title="Isento"
                disabled= {dataMode === 'edit'}
              />
              <CheckBox
                name="is_orgao_estadual"
                checked={cliente?.is_orgao_estadual === 's'}
                onChange={handleInputChange}
                title="Órgão estadual"
                disabled= {dataMode === 'edit'}
              />
              <CheckBox
                name="is_revenda"
                checked={cliente?.is_revenda === 's'}
                onChange={handleInputChange}
                title="Revenda"
                disabled= {dataMode === 'edit'}
              />
            </FormRow>
          </div>
        </RadioButtons>
      </section>

      <section>
        <FormRow>
          <Input
            name="cnpj"
            label="CNPJ"
            value={cliente?.cnpj}
            placeholder={controlFormPessoa === 'pf' ? 'CPF' : 'CNPJ'}
            onChange={handleInputCNPJ}
            error={clienteError?.cnpj}
            type={controlFormPessoa === 'pf' ? 'cpf' : 'cnpj'}
            disabled= {dataMode === 'edit'}
          />

          <Input
            disabled = {cliente?.ie === 'isento' || dataMode === 'edit'}
            name="ie"
            label="Inscrição estadual"
            value={cliente?.ie}
            placeholder='Inscrição estadual'
            onChange={handleInputChange}
            error={clienteError?.ie}
            type={cliente?.uf ? `ie-${cliente?.uf}` as IEType : 'text'}
          />

        </FormRow>
        <FormRow>
          <Input
            name="nome_fantasia"
            label="Nome fantasia"
            value={cliente?.nome_fantasia}
            placeholder='Nome fantasia'
            onChange={handleInputChange}
            error={clienteError?.nome_fantasia}
            disabled= {dataMode === 'edit'}
          />

          <Input
            name="razao_social"
            label="Razão social"
            value={cliente?.razao_social}
            placeholder='Razão social'
            onChange={handleInputChange}
            error={clienteError?.razao_social}
            disabled= {dataMode === 'edit'}
          />
        </FormRow>
        <FormRow>
          <Input
            name="email"
            label="E-mail principal"
            value={cliente?.email}
            placeholder='E-mail principal'
            onChange={handleInputChange}
            error={clienteError?.email}
            disabled= {dataMode === 'edit'}
          />
          <Input
            name="email_nfe"
            label="Email Nota Fiscal Eletrônica"
            value={cliente?.email_nfe}
            placeholder='E-mail nota fiscal eletrônica'
            onChange={handleInputChange}
            error={clienteError?.email_nfe}
            disabled= {dataMode === 'edit'}
          />
          <Input
            name="email_nfe2"
            label="Email Nota Fiscal Eletrônica 2"
            value={cliente?.email_nfe2}
            placeholder='E-mail nota fiscal eletrônica'
            onChange={handleInputChange}
            error={clienteError?.email_nfe2}
            disabled= {dataMode === 'edit'}
          />
        </FormRow>
      </section>
    </Container>
  )
}
