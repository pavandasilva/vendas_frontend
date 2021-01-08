import React from 'react'
import { useTheme } from 'styled-components'
import { Container } from './styles'

interface SpinnerProps {
  color?: string
}

export const Spinner = ({ color }: SpinnerProps) => {
  const { colors } = useTheme()

  return <Container color={color || colors.backgroundLight} />
}
