import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useTheme } from 'styled-components'
import Swal from 'sweetalert2'
import { Avatar } from '..'
import { useSideBar } from '../../contexts'
import { useUsuario } from '../../hooks/useUsuario'
import { PopOver, ItemPopOver } from '../PopOver'
import { Container, Hamburger, Content } from './styles'

export const Header = () => {
  const elemUlRef = useRef<HTMLUListElement>(null)
  const { logout } = useUsuario()
  const [showPopOver, setShowPopOver] = useState(false)
  const { colors } = useTheme()
  const { toogle } = useSideBar()

  const popoverItens = useMemo<ItemPopOver[]>(() => [
    {
      onClick: () => setShowPopOver(false),
      title: 'Perfil'
    },
    {
      onClick: async () => {
        setShowPopOver(false)

        const { isConfirmed } = await Swal.fire({
          text: 'Desconectar da aplicação?',
          icon: 'warning',
          focusCancel: true,
          showCancelButton: true,
          showCloseButton: true,
          cancelButtonText: 'Cancelar',
          confirmButtonText: 'Desconectar',
          confirmButtonColor: colors.danger
        })

        if (isConfirmed) {
          logout()
        }
      },
      title: 'Sair'
    }

  ], [colors.danger, logout])

  const handleAvatarOnClick = useCallback(() => {
    setShowPopOver(oldState => !oldState)
  }, [])

  const handleHamburgerOnClick = useCallback(() => {
    toogle()
  }, [toogle])

  const handleAllOnClick = useCallback(() => {
    setShowPopOver(false)
  }, [])

  useEffect(() => {
    document.addEventListener('mousedown', handleAllOnClick, false)
    return () => document.removeEventListener('mousedown', handleAllOnClick, false)
  }, [handleAllOnClick])

  return (
    <Container>
      <Hamburger onClick={handleHamburgerOnClick}>
        <svg viewBox="0 0 100 80">
          <rect width="100" height="15"></rect>
          <rect y="30" width="100" height="15"></rect>
          <rect y="60" width="100" height="15"></rect>
        </svg>
      </Hamburger>
      <aside>
        <ul ref={elemUlRef}>
          <li>
            <Content onClick={handleAvatarOnClick}>
              <Avatar size={30}/>
              <span>Larissa Souza Fermino</span>
            </Content>

            { showPopOver && <PopOver
              coordsPopover={{
                x: 40,
                y: 0
              }}
              items={popoverItens} sepLastItem onClose={() => setShowPopOver(false)}/> }
          </li>
        </ul>
      </aside>
    </Container>
  )
}
