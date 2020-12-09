import React, { ChangeEvent, InputHTMLAttributes } from 'react'
import { Container } from './styles'

interface CheckBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  title: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export const CheckBox = ({ title, ...rest }: CheckBoxProps) => {
  return (
    <Container>
      <input { ...rest } type="checkbox"/>
      <span>
        { title }
      </span>
    </Container>
  )
}
