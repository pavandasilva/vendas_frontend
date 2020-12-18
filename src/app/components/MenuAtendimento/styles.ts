import { darken } from 'polished'
import styled from 'styled-components'

export const Container = styled.div`
  position: float-left;
  display: flex;
  flex-direction: column;
  margin-top: -15px;
  margin-right: -15px;
  width: 90px;
  height: 100%;
  border-bottom-left-radius: 4px;
  background-color: ${props => props.theme.colors.background};
  overflow: hidden;
  padding: 7px 7px 20px;
  background-color: ${props => darken(0.03, props.theme.colors.background)};


  button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 60px;
    width: 100%;
    background-color: transparent;
    border-radius: 6px;
    border-bottom: 1px solid ${props => props.theme.colors.border};

    svg {
      width: 20px;
      height: 20px;
      fill: ${props => props.theme.colors.primaryText}
    }

    & + button {
      margin-top: 10px;
    }

    span {
      font-size: 10px;
      margin-top: 5px;
    }

    transition: all .4s;

    &:hover {
      background-color: ${props => darken(0.08, props.theme.colors.background)};
    }
  };
`
