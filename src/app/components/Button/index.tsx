import React, { ButtonHTMLAttributes, ReactNode } from 'react'
import { IconType } from 'react-icons/lib'
import { Spinner } from '..'
import { Container } from './styles'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  startIcon?: IconType;
  children?: ReactNode;
  mode: 'primary' | 'secondary' | 'confirm' | 'cancel';
  active?: boolean
  showSpinner?: boolean
}

export const Button = ({ startIcon: Icon, children, mode, active, showSpinner, ...rest }: ButtonProps) => {
  return (
    <Container {...rest} mode={mode} active={active} disabled={showSpinner}>
      {showSpinner ? <Spinner/> : (Icon && <Icon/>)}{!showSpinner && children}
    </Container>)
}
