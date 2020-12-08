import { darken } from 'polished'
import styled from 'styled-components'

export const Container = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colors.background};
  border-bottom-left-radius: 4px;
  border-top-left-radius: 4px;
  transition: all 0.3s;
  border: solid 1px ${props => props.theme.colors.border};
  min-width: 117px;
  height: 36px;
  border-radius: 4px;
  padding: 0px 5px;
  color: ${props => props.theme.colors.primaryText};
  transition: all .4s;

  &:hover {
    background-color: ${props => darken(0.04, props.theme.colors.background)};
  }

  svg {
    margin-right: 5px;
  }
`
