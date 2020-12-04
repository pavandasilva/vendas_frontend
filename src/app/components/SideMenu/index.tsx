import React from 'react'
import { FaAmbulance, FaHome } from 'react-icons/fa'
import Logo from '../../assets/imgs/logo_brasao.png'
import { Container, Nav } from './styles'

export const SideMenu = () => {
  return (
    <Container>
      <img src={Logo} alt="route66" />
      <Nav>
        <li><FaHome size={28}/></li>
        <li><FaAmbulance size={28}/></li>
        <li><FaAmbulance size={28}/></li>
        <li><FaAmbulance size={28}/></li>
        <li><FaAmbulance size={28}/></li>
        <li><FaAmbulance size={28}/></li>
      </Nav>
    </Container >
  )
}
