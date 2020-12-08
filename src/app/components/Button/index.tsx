import React, { ButtonHTMLAttributes, ReactNode } from 'react'
import { IconType } from 'react-icons/lib'
import { Container } from './styles'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  startIcon?: IconType;
  children?: ReactNode
}

const Button = ({ startIcon: Icon, children, ...rest }: ButtonProps) => {
  return <Container {...rest}>{Icon && <Icon/>}{children && children}</Container>
}

export default Button
