import React, { ReactNode, SelectHTMLAttributes, useEffect, useRef, useState } from 'react'

import { Wrapper, Container, Label } from './styles'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement>{
  children?: ReactNode
  width?: string
  title?: string
}

export const Select = ({ children, width, title, ...rest }: SelectProps) => {
  const [isActive] = useState(false)
  const [isChanged, setIsChanged] = useState(false)
  const selectRef = useRef<HTMLSelectElement>({} as HTMLSelectElement)

  useEffect(() => {
    if (selectRef?.current?.value?.length > 0) {
      setIsChanged(true)
    }
  }, [selectRef.current.value])

  return (
    <Wrapper width={width}>
      {!!title && <Label isChanged={isChanged}>{title}</Label> }
      <Container isActive={isActive}>
        <select ref={selectRef} {...rest}>
          { children }
        </select>
      </Container>
    </Wrapper>
  )
}
