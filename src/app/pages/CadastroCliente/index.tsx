import React, { useCallback, useState } from 'react'
import { FaSave } from 'react-icons/fa'
import { Button, Contatos, Dados, Endereco } from '../../components'
import { CadastroContatoProvider } from '../../contexts'
import { MainLayout } from '../../layouts/MainLayout'

import { Container, Content } from './styles'

interface ControllerMenu {
  showDados: boolean
  showEndereco: boolean
  showContatos: boolean
}

export const CadastroCliente: React.FC = () => {
  const [controlllerMenu, setControllerMenu] = useState<ControllerMenu>({
    showDados: true,
    showEndereco: false,
    showContatos: false
  })

  const handleMenuOnClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const buttonName = e.currentTarget.name as keyof ControllerMenu

    setControllerMenu(currState => {
      let newState: ControllerMenu = {
        showContatos: false,
        showEndereco: false,
        showDados: false
      }

      newState[buttonName] = true
      return newState
    })
  }, [])

  return (
    <CadastroContatoProvider>
      <MainLayout title="Cadastro de cliente">
        <Container>
          <header>
            <div>
              <Button name="showDados" mode="secondary" active={controlllerMenu.showDados} onClick={handleMenuOnClick}>Dados</Button>
              <Button name="showEndereco" mode="secondary" active={controlllerMenu.showEndereco} onClick={handleMenuOnClick}>Endereço</Button>
              <Button name="showContatos" mode="secondary" active={controlllerMenu.showContatos} onClick={handleMenuOnClick}>Contatos</Button>
            </div>
            <div>
              <Button mode="primary" startIcon={FaSave}>Salvar</Button>
            </div>
          </header>
          <Content>
            { controlllerMenu?.showDados && <Dados />}
            { controlllerMenu?.showEndereco && <Endereco />}
            { controlllerMenu?.showContatos && <Contatos />}
          </Content>
        </Container>
      </MainLayout>
    </CadastroContatoProvider>

  )
}
