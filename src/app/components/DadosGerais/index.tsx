import React from 'react'
import { Input, Select } from '..'
import { FormRow } from '../../styles/global'
import { Container } from './styles'

export const DadosGerais = () => {
  return (
    <Container>
      {/* <FormRow>
        <Input
          width='1'
          name="cep"
          title="CEP"
          value={cliente?.cep}
          placeholder='CEP'
          onChange={handleCepInputChange}
          error={clienteError?.cep}
          type="cep"
          disabled= { dataMode === 'edit'}
        />

        <Input
          width='4'
          name="endereco"
          title="Endereço"
          value={cliente?.endereco}
          placeholder='Endereço'
          onChange={handleInputChange}
          error={clienteError?.endereco}
          disabled= { dataMode === 'edit'}
        />
        <Input
          width='1'
          name="numero"
          title="Número"
          value={cliente?.numero}
          placeholder='Número'
          onChange={handleInputChange}
          error={clienteError?.numero}
          disabled= { dataMode === 'edit'}
        />

      </FormRow>
      <FormRow>
        <Select
          width='2'
          name="uf"
          onChange={handleSelectChange}
          value={cliente?.uf?.toUpperCase()}
          title="Estado"
          disabled= { dataMode === 'edit'}
          defaultValue=""
        >
          <option value="" disabled selected>Estado</option>
          { EstadosMunicipios?.estados?.map(estado => <option key={estado.sigla} value={estado.sigla}>{estado.nome}</option>)}
        </Select>

        <Select
          name="cidade"
          width='4'
          onChange={handleSelectChange}
          value={dataMode === 'edit' ? '' : cliente?.cidade}
          title="Cidade"
          disabled= { dataMode === 'edit'}
        >
          <option value="" disabled selected>{ dataMode === 'edit' ? cliente?.cidade : 'Cidade'} </option>
          { dataMode === 'create' && controlCidades?.map(cidade => <option key={cidade} value={cidade}>{cidade}</option>)}
        </Select>
        <Input
          width='7'
          name="bairro"
          title="Bairro"
          value={cliente?.bairro}
          placeholder='Bairro'
          onChange={handleInputChange}
          error={clienteError?.bairro}
          disabled= { dataMode === 'edit'}
        />
      </FormRow>
      <FormRow>
        <Input
          width='4'
          name="complemento"
          title="Complemento"
          value={cliente?.complemento}
          placeholder='Complemento do endereço'
          onChange={handleInputChange}
          error={clienteError?.complemento}
          disabled= { dataMode === 'edit'}
        />
        <Input
          width='3'
          name="regiao"
          title="Região"
          value={cliente?.regiao}
          placeholder='Região'
          onChange={handleInputChange}
          error={clienteError?.regiao}
          disabled= { dataMode === 'edit'}
        />
      </FormRow> */}
    </Container>
  )
}
