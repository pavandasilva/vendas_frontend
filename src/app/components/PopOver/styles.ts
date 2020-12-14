import styled, { css } from 'styled-components'
import { shade } from 'polished'

interface ContainerProps {
  sepLastItem?: boolean
}

export const Container = styled.div<ContainerProps>`
  position: absolute;
  background-color: ${props => props.theme.colors.backgroundLight};
  z-index: 11;
  top: calc(100% + 4px);
  width: 150px;
  right: 0px;
  border-radius: 4px;
  border: solid 1px ${props => props.theme.colors.border};
  padding: 2px;
  box-shadow: 5px 5px 15px 0px rgba(0,0,0,0.36);

  li {
    background-color: ${props => props.theme.colors.backgroundLight};
    padding: 14px;
    font-size: 14px;

    ${props => props.sepLastItem && css`
      &:last-of-type {
        border-top: solid 1px ${props.theme.colors.borderLight}
      } `
    }


    &:hover {
      background-color: ${props => shade(0.04, props.theme.colors.backgroundLight)};
    }
  }
`
