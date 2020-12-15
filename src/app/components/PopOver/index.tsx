import React from 'react'
import { IconType } from 'react-icons'
import { FiX } from 'react-icons/fi'

import { Container } from './styles'

export type ItemPopOver = {
  icon?: IconType
  title: string
  onClick: () => void
}

interface PopOverProps {
  items: ItemPopOver[]
  sepLastItem?: boolean
  onClose: () => void
}

export const PopOver = ({ items, sepLastItem, onClose }: PopOverProps) => {
  return (
    <Container sepLastItem={sepLastItem}>
      <div onClick={onClose}><FiX/></div>
      <ul>
        { items?.map(({ icon, title, onClick }) => <li key={title} onClick={onClick}>{title}</li>)}
      </ul>
    </Container>)
}
