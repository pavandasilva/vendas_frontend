import { darken } from 'polished'
import styled, { css } from 'styled-components'

interface ContainerProps {
  mode: 'primary' | 'secondary'
  active?: boolean
}

export const Container = styled.button<ContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.mode === 'primary' ? props.theme.colors.background : 'transparent'};
  border-bottom-left-radius: 4px;
  border-top-left-radius: 4px;
  transition: all 0.3s;
  border: solid 1px ${props => props.mode === 'primary' ? props.theme.colors.border : 'none'};
  min-width: 117px;
  height: 36px;
  border-radius: 4px;
  padding: 0px 5px;
  color: ${props => props.mode === 'primary' ? props.theme.colors.primaryText : props.theme.colors.primary};
  transition: all .4s;

  &:hover {
    background-color: ${props => props.mode === 'primary' && darken(0.04, props.theme.colors.background)};
    color: ${props => props.mode === 'primary' ? darken(0.04, props.theme.colors.primaryText) : darken(0.1, props.theme.colors.primary)};
  }

  svg {
    margin-right: 5px;
  }

  ${props => props.active && css`
    background-color: ${props.theme.colors.primary};
    color: #FFF !important;
  `}
`
