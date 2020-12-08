import React from 'react'
import { Cliente } from '../../../domain/clientes/models'
import { MenuCLiente } from '../MenuCliente'

import { Container, Main } from './styles'

interface AtendimentoProps {
  cliente: Cliente
}

export const Atendimento = ({ cliente }: AtendimentoProps) => {
  return (
    <Container>
      <Main>

      </Main>
      <MenuCLiente />
    </Container>
  )
}
