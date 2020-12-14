import React from 'react'
import { IconType } from 'react-icons'

import { Container } from './styles'

export type ItemPopOver = {
  icon?: IconType
  title: string
  onClick: () => void
}

interface PopOverProps {
  items: ItemPopOver[]
  sepLastItem?: boolean
}

export const PopOver = ({ items, sepLastItem }: PopOverProps) => {
  return (
    <Container sepLastItem={sepLastItem}>
      <ul>
        { items?.map(({ icon, title, onClick }) => <li key={title} onClick={onClick}>{title}</li>)}
      </ul>
    </Container>)
}
