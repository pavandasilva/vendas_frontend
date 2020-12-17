import React, { useCallback, useEffect } from 'react'
import { FaSave } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import { makeCadastrarCliente } from '../../../domain/clientes/factories/makeCadastrarCliente'
import { Cliente } from '../../../domain/clientes/models'
import { getTabCadastroClienteToRedirect, deleteEmptyPropsFromObject } from '../../../helpers'
import { Button, Contatos, Dados, Endereco } from '../../components'
import { CadastroContatoProvider, CadastroTelefoneProvider, CurrentTab } from '../../contexts'
import { useCadastroCliente } from '../../hooks'
import { MainLayout } from '../../layouts/MainLayout'
import { Container, Content } from './styles'
import useCliente from '../../hooks/useCliente'
import { PostParams } from '../../../domain/_interfaces'
import useUseCaseController from '../../hooks/useUseCaseController'

const cadastrarCliente = makeCadastrarCliente()

export const CadastroCliente = () => {
  const {
    data: cliente,
    setData: setCliente,
    setDataError: setClienteError,
    currentTab,
    setCurrentTab,
    dataMode,
    resetData: resetCliente
  } = useCadastroCliente()

  const { id } = useParams() as Cliente
  const { executeUseCase, error: errorUseCaseController } = useUseCaseController()
  const { dataMode: dataClienteMode } = useCadastroCliente()
  const clienteToEdit = useCliente(id as number)

  useEffect(() => {
    if (errorUseCaseController?.type === 'validate') {
      setClienteError(errorUseCaseController.data)

      const tabToRedirect = getTabCadastroClienteToRedirect(errorUseCaseController.data)
      setCurrentTab(tabToRedirect)
    }
  }, [errorUseCaseController, setClienteError, setCurrentTab])

  useEffect(() => {
    if (clienteToEdit?.data) {
      setCliente(clienteToEdit.data.data)
    }
  }, [clienteToEdit, setCliente])

  const handleMenuOnClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    setCurrentTab(e.currentTarget.name as CurrentTab)
  }, [setCurrentTab])

  const handleSalvarOnClick = useCallback(async () => {
    const sucessMessage = `${dataMode === 'create'
      ? 'Cliente criado com sucesso'
      : `Os dados do cliente - ${cliente.id} foram atualizados`
    }`

    const questionMessage = `${dataMode === 'create'
      ? 'Salvar novo cliente'
      : `Atualizar os dados do cliente - ${cliente.id}`
    }`

    executeUseCase<PostParams>(
      cadastrarCliente,
      {
        body: deleteEmptyPropsFromObject(cliente)
      },
      sucessMessage,
      questionMessage,
      resetCliente
    )
  }, [cliente, dataMode, executeUseCase, resetCliente])

  return (
    <CadastroContatoProvider>
      <CadastroTelefoneProvider>
        <MainLayout title={dataMode === 'create' ? 'Cadastro de cliente' : `Edição Cliente - ${cliente.id}`}>
          <Container>
            <header>
              <div>
                { dataClienteMode === 'create' ? (
                  <>
                    <Button
                      name="dados"
                      mode="secondary"
                      active={currentTab === 'dados'}
                      onClick={handleMenuOnClick}
                    >
                    Dados
                    </Button>
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
                  </>)
                  : (<h2>Contatos</h2>)
                }

              </div>
              <div>
                <Button mode="primary" startIcon={FaSave} onClick={handleSalvarOnClick}>Salvar</Button>
              </div>
            </header>
            <Content>
              { currentTab === 'dados' && dataClienteMode === 'create' && <Dados />}
              { currentTab === 'endereco' && dataClienteMode === 'create' && <Endereco />}
              { currentTab === 'contatos' && <Contatos />}
            </Content>
          </Container>
        </MainLayout>
      </CadastroTelefoneProvider>
    </CadastroContatoProvider>
  )
}
