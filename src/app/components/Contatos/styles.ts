import styled, { css } from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  header {
    display: flex !important;
    background-color: white !important;
    border: none !important;
    padding: 0px !important;

    & > div {

      width: 200px !important;
    }

    & > div + div{
      flex: 1 !important;

      width: 100% !important;

    }
  }

`

export const Actions = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  align-items: center;

  color: ${props => props.theme.colors.sucess};

  & + button + button {
    background-color: red !important;
  }

`

export const Header = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  margin-bottom: 15px;
  justify-content: flex-end;

  & > div {
    display: flex;
    flex: 1;
    justify-content: flex-end;
  }

`
export const TableCenterContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  svg {
    fill: ${props => props.theme.colors.sucess}
  }
`
export const ListaTelefones = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
  min-height: 70px;
  text-decoration: none;
  list-style: none;
 //  background-color: ${props => props.theme.colors.backgroundLight};
  width: 100%;
  padding: 15px 15px 15px;

  strong {
    margin-right: 15px;
  }

  ul {
    text-decoration: none;
    list-style: none;

    li {
      width:120;
      padding: 0px 5px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      font-weight: 600;

      svg {
        margin-right: 10px;
        width: 18px;
        height: auto;
      }

      & + li {
        margin-top: 7px;
      }
    }
  }
`

interface ContentProps {
  error?: boolean
}

export const Content = styled.div<ContentProps>`
  position: relative;
  transition: all 0.4s;

  ${props => props.error && css`
    .ReactTable {
      border: 1px solid ${props => props.theme.colors.danger};
      position: relative;
    }`
  }
`

interface IconError {
  error?: string
}

export const IconError = styled.div<IconError>`
  display: flex;
  top: 100%;
  left: 15px;
  height: 50px;
  width: 20px;

  > svg {
    fill: ${props => props.theme.colors.danger};
    width: 9px;
    height: auto;
  }
`

export const ToolTip = styled.div`
  display: box;
  max-width: 100%;
  padding: 7px 10px;
  margin-top: 5px;
  font-size: 10px;
  line-height: 1.5;
  color: ${props => props.theme.colors.backgroundLight};
  background-color: ${props => props.theme.colors.danger};
  border-radius: 4px;
  align-items: center;
`

export const Error = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction:column;
  width: 100%;
  height: 40px;
`
