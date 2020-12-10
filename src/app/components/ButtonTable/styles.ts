import styled from 'styled-components'
import { shade } from 'polished'

interface ContainerProps {
  typeButton?: 'primary' | 'secondary'
}

export const Container = styled.button<ContainerProps>`
  border: none;
  border-radius: 4px;
  background-color: ${props => props.typeButton === 'primary' ? props.theme.colors.primary : props.theme.colors.danger};
  min-width: 50px;
  padding: 4px 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #FFF;
  transition: all 0.4s;
  font-size: 12px;

  & + button {
    margin-left: 5px;
  }

  svg {
    fill: #FFF;
    margin-right: 7px;
    width: 10px;
    height: 10px;
  }

  &:hover {
    background-color: ${props => props.typeButton === 'primary' ? shade(0.2, props.theme.colors.primary) : shade(0.2, props.theme.colors.danger)};
  }
`
