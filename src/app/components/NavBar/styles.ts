import styled from 'styled-components'

export const Container = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 15px;
  flex: 1;
  width: calc(100% -10px);
  height: 50px;
  background: ${props => props.theme.colors.backgroundLight};
  border-bottom: 1px solid ${props => props.theme.colors.borderLight};
  z-index: 2;
  cursor: pointer;

  aside {
    display: flex;
    flex: 1;
    align-items: center;
    width: 100%;
    height: 100%;
    justify-content: flex-end;
    background-color: transparent;
    position: relative;

    ul {
      list-style-type: none;
      margin: 0;
      padding: 0;
      overflow: hidden;

      li {
        display: flex;
        align-items: center;
        opacity: 1;
        transition: all 0.4s;

        span {
          margin-left: 10px;
          color: ${props => props.theme.colors.primaryText};
        }
      }
    }
  }
`

export const Hamburger = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;

  &:hover {
    background-color: ${props => props.theme.colors.borderLight};
  }

  svg {
    width: 20px;
    height: 20px;
    fill: ${props => props.theme.colors.secondaryText}
  }

  transition: all 0.4s;
`
export const Content = styled.div`
  display: flex;
  align-items: center;
`
