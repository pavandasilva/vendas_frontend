import React from 'react'
import { Avatar } from '../'
import { Container, Hamburger } from './styles'

export const NavBar = () => {
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
            <Avatar size={30}/>
            <span>Larissa Souza Fermino</span>
          </li>
        </ul>
      </aside>
    </Container>
  )
}
