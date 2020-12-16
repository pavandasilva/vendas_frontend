import styled from 'styled-components'

export const Container = styled.div`
  position: relative;
  margin-top: 30px;

  & > section {
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid ${props => props.theme.colors.border};
    padding-bottom: 5px;
    height: 80px;

    &:last-of-type {
      border-bottom: none;
      margin-top: 20px;
      height: auto;
    }
  }

`

export const TipoCliente = styled.div`
  label {
    color: ${props => props.theme.colors.primaryText};
    font-weight: 600;
    text-transform: uppercase;
  }
`

export const Grupo = styled.div`
  display: block;

  label {
    display: inline-block;
    margin-bottom: 15px;
    color: ${props => props.theme.colors.primaryText};
    font-weight: 600;
    text-transform: uppercase;
    width: 100%;
  }
`

export const RadioButtons = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 15px;
  letter-spacing: 0.075em;
  user-select: none;

  & > div  {
    width: 50%;

    strong {
      display: inline-block;
      margin-bottom: 10px;
    }
  }
`
