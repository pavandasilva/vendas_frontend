import React, { ReactNode } from 'react'

import { Container } from './styles'

interface HeaderAtendimentoProps {
  children?: ReactNode
}

export const HeaderAtendimento = ({ children }: HeaderAtendimentoProps) => {
  return <Container>{children}</Container>
}
