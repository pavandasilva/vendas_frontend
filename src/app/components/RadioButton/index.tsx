import React, { ChangeEvent, InputHTMLAttributes } from 'react'

import { Container } from './styles'

interface RadioButtonProps extends InputHTMLAttributes<HTMLInputElement> {
  title: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export const RadioButton = ({ title, ...rest }: RadioButtonProps) => {
  return (
    <Container>
      <input { ...rest } type="radio"/>
      <span>
        { title }
      </span>
    </Container>
  )
}
