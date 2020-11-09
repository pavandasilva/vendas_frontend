import React from 'react'

import { Btn } from './styles'

export const Button: React.FC = ({ children }) => {
  return (
    <>
      <Btn>{children}</Btn>
    </>
  )
}
