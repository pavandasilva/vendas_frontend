import React, { useCallback, useEffect } from 'react'
import Swal from 'sweetalert2'
import { FaSave } from 'react-icons/fa'
import { useLocation } from 'react-router-dom'
import { makeCadastrarCliente } from '../../../domain/clientes/factories/makeCadastrarCliente'
import { Cliente } from '../../../domain/clientes/models'
import { getTabCadastroClienteToRedirect, deleteEmptyPropsFromObject } from '../../../helpers'
import { Button, Contatos, Dados, Endereco } from '../../components'
import { CadastroContatoProvider, CadastroTelefoneProvider, CurrentTab } from '../../contexts'
import { useCadastroCliente, useUsuario } from '../../hooks'
import { MainLayout } from '../../layouts/MainLayout'
import { Container, Content } from './styles'

const cadastrarCliente = makeCadastrarCliente()

export const CadastroCliente = () => {
  const {
    data: cliente,
    setData: setCliente,
    setDataError: setClienteError,
    currentTab,
    setCurrentTab,
    dataMode,
    setDataMode
  } = useCadastroCliente()

  const { data: usuario } = useUsuario()
  const { state, pathname } = useLocation()

  useEffect(() => {
    if (pathname === '/cadastro-cliente') {
      setDataMode('create')
    } else {
      setDataMode('edit')
    }
  }, [cliente, pathname, setCliente, setDataMode])

  useEffect(() => {
    if (dataMode === 'edit') {
      setCliente(state as Cliente)

      console.log(state)
    }
  }, [dataMode, setCliente, state])

  const handleMenuOnClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    setCurrentTab(e.currentTarget.name as CurrentTab)
  }, [setCurrentTab])

  const handleSalvarOnClick = async () => {
    const { isConfirmed } = await Swal.fire({
      title: 'Confirmação!',
      text: 'Salvar os dados do cliente?',
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: 'Salvar',
      cancelButtonText: 'Cancelar',
      icon: 'question'
    })

    if (!isConfirmed) {
      return
    }

    try {
      const response = await cadastrarCliente.execute({
        body: deleteEmptyPropsFromObject(cliente),
        token: usuario?.token
      })

      if (response) {
        Swal.fire(
          'Sucesso!',
          'Os dados do cliente foram salvos',
          'success'
        )
      }
    } catch (error) {
      if (error.type === 'validate') {
        setClienteError(error.data)

        const tabToRedirect = getTabCadastroClienteToRedirect(error.data)
        setCurrentTab(tabToRedirect)
      } else {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: error.message || 'Erro desconhecido',
          showConfirmButton: false,
          timer: 3500,
          timerProgressBar: true
        })
      }
    }
  }

  return (
    <CadastroContatoProvider>
      <CadastroTelefoneProvider>
        <MainLayout title={dataMode === 'create' ? 'Cadastro de cliente' : `Edição Cliente - ${cliente.id}`}>
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
