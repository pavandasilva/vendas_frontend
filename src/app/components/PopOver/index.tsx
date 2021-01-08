import React, { useEffect, useRef } from 'react'
import { IconType } from 'react-icons'
import { FiX } from 'react-icons/fi'

import { Container } from './styles'

export type CoordsPopover = {
  x: number
  y: number
}

export type ItemPopOver = {
  icon?: IconType
  title: string
  onClick: () => void
}

interface PopOverProps {
  items: ItemPopOver[]
  coordsPopover: CoordsPopover
  sepLastItem?: boolean
  onClose: () => void
}

export const PopOver = ({ items, coordsPopover, sepLastItem, onClose }: PopOverProps) => {
  console.log('coordsPopover', coordsPopover)

  return (
    <Container sepLastItem={sepLastItem} coords={coordsPopover}>
      <div onClick={onClose}><FiX/></div>
      <ul>
        { items?.map(({ icon, title, onClick }) => <li key={title} onClick={onClick}>{title}</li>)}
      </ul>
    </Container>)
}
