import React from 'react'
import { IconType } from 'react-icons'

import { Container } from './styles'

interface CardProps {
  icon?: IconType
  title: string
  text: string
  mode: 'warning' | 'danger' | 'normal' | 'success' | 'info'
}

export const Card = ({ icon: Icon, title, text, mode }: CardProps) => {
  return (
    <Container mode={mode}>
      { Icon && <Icon />}
      <strong>{title}</strong>
      <p>{text}</p>
    </Container>)
}
