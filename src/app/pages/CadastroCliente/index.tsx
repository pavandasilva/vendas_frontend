import React, { useCallback } from 'react'
import { FaSave } from 'react-icons/fa'
import { makeCadastrarCliente } from '../../../domain/clientes/factories/makeCadastrarCliente'
import { getTabCadastroClienteToRedirect } from '../../../helpers'
import { Button, Contatos, Dados, Endereco } from '../../components'
import { CadastroContatoProvider, CadastroTelefoneProvider, CurrentTab } from '../../contexts'
import { useCadastroCliente } from '../../hooks'
import { MainLayout } from '../../layouts/MainLayout'

import { Container, Content } from './styles'

const cadastrarCliente = makeCadastrarCliente()

export const CadastroCliente: React.FC = () => {
  const { data: cliente, setDataError: setClienteError, currentTab, setCurrentTab } = useCadastroCliente()

  const handleMenuOnClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    setCurrentTab(e.currentTarget.name as CurrentTab)
  }, [setCurrentTab])

  const handleSalvarOnClick = async () => {
    try {
      await cadastrarCliente.execute({ body: cliente })
    } catch (error) {
      if (error.type === 'validate') {
        setClienteError(error.data)

        const tabToRedirect = getTabCadastroClienteToRedirect(error.data)
        setCurrentTab(tabToRedirect)
      }
    }
  }

  return (
    <CadastroContatoProvider>
      <CadastroTelefoneProvider>
        <MainLayout title="Cadastro de cliente">
          <Container>
            <header>
              <div>
                <Button
                  name="dados"
                  mode="secondary"
                  active={currentTab === 'dados'}
                  onClick={handleMenuOnClick}>Dados</Button>
                <Button
                  name="endereco"
                  mode="secondary"
                  active={currentTab === 'endereco'}
                  onClick={handleMenuOnClick}>Endereço</Button>
                <Button
                  name="contatos"
                  mode="secondary"
                  active={currentTab === 'contatos'}
                  onClick={handleMenuOnClick}>Contatos</Button>
              </div>
              <div>
                <Button mode="primary" startIcon={FaSave} onClick={handleSalvarOnClick}>Salvar</Button>
              </div>
            </header>
            <Content>
              { currentTab === 'dados' && <Dados />}
              { currentTab === 'endereco' && <Endereco />}
              { currentTab === 'contatos' && <Contatos />}
            </Content>
          </Container>
        </MainLayout>
      </CadastroTelefoneProvider>
    </CadastroContatoProvider>

  )
}
