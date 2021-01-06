import React, { useCallback, useEffect } from 'react'
import { FaHome, FaUserFriends, FaHandshake } from 'react-icons/fa'
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

  const handleClientesOnClick = useCallback(() => {
    push('/clientes')
  }, [push])

  const handlePedidosOnClick = useCallback(() => {
    push('/pedidos')
  }, [push])

  useEffect(() => {
    setActiveTab(-1)
  }, [location, setActiveTab])

  return (
    <Container>
      <img src={Logo} alt="route66" />
      <Nav>
        <li onClick={handleDashBoardOnClick}><FaHome size={27} /><span>DashBoard</span></li>
        <li onClick={handleClientesOnClick}><FaUserFriends size={27}/><span>Clientes</span></li>
        <li onClick={handlePedidosOnClick}><FaHandshake size={27}/><span>Pedidos</span></li>
        {/*  <li><FaAmbulance size={28}/></li>
        <li><FaAmbulance size={28}/></li>
        <li><FaAmbulance size={28}/></li>
        <li><FaAmbulance size={28}/></li> */}
      </Nav>
    </Container >
  )
}
