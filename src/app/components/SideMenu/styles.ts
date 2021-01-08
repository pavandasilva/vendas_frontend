import styled from 'styled-components'
import { lighten, darken } from 'polished'

interface ContainerProps {
  isVisible?: boolean
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  height: 100vh;
  background-color: ${props => props.theme.colors.primary};
  width: 70px;
  z-index: 40;
  margin-left: ${props => props.isVisible ? '0px' : '-70px'};
  transition: all 300ms;

  img {
    margin-top: 15px;
    width: 45px;
    height: auto;
  }

`
export const Nav = styled.ul`
  list-style: none;
  padding: 0px;
  width: 100%;

  li {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    background-color: white;
    height: 60px;
    background-color: ${props => props.theme.colors.primary};
    cursor: pointer;
    transition: all 0.4s;

    &:hover {
      background: ${props => darken(0.08, props.theme.colors.primary)};
    }

    svg {
      fill: ${props => lighten(0.3, props.theme.colors.primary)};
    }

    span {
      margin-top: 7px;
      color: ${props => lighten(0.3, props.theme.colors.primary)};
      font-size: 10px;
      letter-spacing: 0.075em;
    }

  }
`
