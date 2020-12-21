import { darken } from 'polished'
import styled, { css } from 'styled-components'

interface ContainerProps {
  mode: 'primary' | 'secondary' | 'confirm' | 'cancel';
  active?: boolean
}

export const Container = styled.button<ContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom-left-radius: 4px;
  border-top-left-radius: 4px;
  transition: all 0.3s;
  border: solid 1px ${props => props.mode === 'primary' ? props.theme.colors.border : 'none'};
  min-width: 117px;
  height: 36px;
  border-radius: 4px;
  padding: 0px 15px;
  transition: all .3s;
  user-select: none;

  svg {
    margin-right: 5px;
  }

  background-color: ${props => {
    if (props.mode === 'primary') {
      return props.theme.colors.background
    } else if (props.mode === 'confirm') {
      return props.theme.colors.primary
    } else if (props.mode === 'cancel') {
      return props.theme.colors.primaryText
    } else {
      return 'transparent'
    }
  }};

  color: ${props => {
    if (props.mode === 'cancel' || props.mode === 'confirm') {
      return props.theme.colors.backgroundLight
    } else if (props.mode === 'primary') {
      return props.theme.colors.primaryText
    } else {
      return props.theme.colors.primary
    }
  }};

  &:hover {
    background-color: ${props => {
      if (props.mode === 'primary') {
        return darken(0.04, props.theme.colors.background)
      } else if (props.mode === 'confirm') {
        return darken(0.04, props.theme.colors.primary)
      } else if (props.mode === 'cancel') {
        return darken(0.04, props.theme.colors.primaryText)
      } else {
        return darken(0.04, props.theme.colors.primary)
      }
    }};

    ${props => props.mode === 'secondary' && css`
      color: #FFF
    `}
  }

  ${props => props.active && css`
    background-color: ${props.theme.colors.primary};
    color: #FFF !important;
  `}

  &:disabled {
    border: 1px solid ${props => props.theme.colors.background};
    background-color: ${props => props.theme.colors.borderLight};
    color: ${props => props.theme.colors.primaryText};
    cursor: wait;
  }
`
