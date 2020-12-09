import React, { ButtonHTMLAttributes, ReactNode } from 'react'
import { IconType } from 'react-icons/lib'
import { Container } from './styles'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  startIcon?: IconType;
  children?: ReactNode;
  mode: 'primary' | 'secondary';
  active?: boolean
}

export const Button = ({ startIcon: Icon, children, mode, active, ...rest }: ButtonProps) => {
  return (<Container {...rest} mode={mode} active={active}>{Icon && <Icon/>}{children && children}</Container>)
}
