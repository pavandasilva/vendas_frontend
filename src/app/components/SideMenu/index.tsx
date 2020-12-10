import React, { useCallback, useEffect } from 'react'
import { FaAmbulance, FaHome } from 'react-icons/fa'
import { useHistory } from 'react-router-dom'
import Logo from '../../assets/imgs/logo_brasao.png'
import { useTabs } from '../../hooks'
import { Container, Nav } from './styles'

export const SideMenu = () => {
  const { push, location } = useHistory()
  const { setActiveTab } = useTabs()

  const handleDashBoardOnClick = useCallback(() => {
    push('/')
  }, [push])

  useEffect(() => {
    setActiveTab(-1)
  }, [location, setActiveTab])

  return (
    <Container>
      <img src={Logo} alt="route66" />
      <Nav>
        <li onClick={handleDashBoardOnClick}><FaHome size={28} /></li>
        <li><FaAmbulance size={28}/></li>
        <li><FaAmbulance size={28}/></li>
        <li><FaAmbulance size={28}/></li>
        <li><FaAmbulance size={28}/></li>
        <li><FaAmbulance size={28}/></li>
      </Nav>
    </Container >
  )
}
