import { transparentize } from 'polished'
import styled, { css } from 'styled-components'

interface ContainerProps {
  mode: 'warning' | 'danger' | 'normal' | 'success' | 'info'
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  padding: 3px 10px;
  min-width: 110px;
  height: 45px;
  border-radius: 4px;
  margin-top: 15px;
  justify-content: center;

  ${props => {
    let color = ''

    if (props.mode === 'danger') {
      color = props.theme.colors.danger
    } else if (props.mode === 'warning') {
      color = props.theme.colors.warning
    } else if (props.mode === 'normal') {
      color = props.theme.colors.primaryText
    } else if (props.mode === 'success') {
      color = props.theme.colors.sucess
    } else if (props.mode === 'info') {
      color = props.theme.colors.info
    }

    return css`
       background-color: ${transparentize(0.98, color)};
       border: 1px solid ${transparentize(0.87, color)};
    `
  }}

  strong {
    font-size: 12px;
    color: ${props => props.theme.colors.secondaryText};
  }

  p {
    letter-spacing: 0.075em;
    color: ${props => props.theme.colors.primaryText};
    font-size: 12px;
  }
`
