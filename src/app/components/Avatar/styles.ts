import styled from 'styled-components'

interface AvatarStylesProps {
  size: number
}

export const Container = styled.div<AvatarStylesProps>`
  height: ${props => `${props.size}px`};
  width: ${props => `${props.size}px`};
  background-color: ${props => props.theme.colors.border};
  border-radius: 50%;
  overflow: hidden;

  img {
    height: ${props => `${props.size}px`};
    width: ${props => `${props.size}px`};
  }
`
