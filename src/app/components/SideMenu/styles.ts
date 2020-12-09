import styled from 'styled-components'
import { lighten, darken } from 'polished'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  height: 100vh;
  background-color: ${props => props.theme.colors.primary};
  width: 70px;
  z-index: 40;

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
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    background-color: white;
    height: 50px;
    background-color: ${props => props.theme.colors.primary};
    cursor: pointer;
    transition: all 0.4s;

    &:hover {
      background: ${props => darken(0.08, props.theme.colors.primary)};
    }

    svg {
      fill: ${props => lighten(0.3, props.theme.colors.primary)};
    }

  }
`
