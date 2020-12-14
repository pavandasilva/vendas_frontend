import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 397px;
  padding: 21px 21px 28px;
  background: ${props => props.theme.colors.backgroundLight};
  border-radius: 4px;
  border: 1px solid ${props => props.theme.colors.borderLight};

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;

    & > div {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 100%;

      &:first-of-type {
        align-items: center;
        strong {
          position: absolute;
          top: 20px;
          color: ${props => props.theme.colors.danger};
        }
      }
      span {
        font-weight: 300;
        font-size: 14px;
        line-height: 16px;
        letter-spacing: 0.1em;
        color: ${props => props.theme.colors.primaryText};
      }

      img {
        width: 70px;
        height: auto;
      }
    }

    button {
      display: inline-block;
      margin-top:25px;
    }
  }
`

export const Inputs = styled.div`
  display: flex;
  flex-direction: column;
`

export const RememberMe = styled.section`
  margin-top: 30px;
  display: flex;
  align-items: center;
  flex: 1;
  & > div {
    display: flex;
    align-items: center;
    flex: 1;
  }
  input {
    cursor: pointer;
  }
  span {
    margin-left: 15px;
  }
  a {
    display: flex;
    flex: 1;
    justify-content: flex-end;
    text-decoration: none;
    width: 127px;
    height: 16px;
    letter-spacing: 0.075em;
    font-size: 14px;
    color: ${props => props.theme.colors.primaryText};
    &:hover {
      color: ${props => props.theme.colors.primaryText};
    }
  }
`
