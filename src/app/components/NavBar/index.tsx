import React, { useMemo, useState } from 'react'
import { Avatar } from '../'
import { useUsuario } from '../../hooks'
import { PopOver, ItemPopOver } from '../PopOver'
import { Container, Hamburger, Content } from './styles'

export const NavBar = () => {
  const { logout } = useUsuario()
  const [showPopOver, setShowPopOver] = useState(false)

  const popoverItens = useMemo<ItemPopOver[]>(() => [
    {
      onClick: () => setShowPopOver(false),
      title: 'Perfil'
    },
    {
      onClick: () => {
        setShowPopOver(false)
        logout()
      },
      title: 'Sair'
    }

  ], [logout])

  return (
    <Container>
      <Hamburger>
        <svg viewBox="0 0 100 80">
          <rect width="100" height="15"></rect>
          <rect y="30" width="100" height="15"></rect>
          <rect y="60" width="100" height="15"></rect>
        </svg>
      </Hamburger>
      <aside>
        <ul>
          <li>
            <Content onClick={() => setShowPopOver((oldState) => !oldState)}>
              <Avatar size={30}/>
              <span>Larissa Souza Fermino</span>
            </Content>

            { showPopOver && <PopOver items={popoverItens} sepLastItem onClose={() => setShowPopOver(false)}/> }
          </li>
        </ul>
      </aside>
    </Container>
  )
}
