import styled, { css } from 'styled-components'
import { transparentize } from 'polished'

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
  indexesHasError: string[]

}

export const Content = styled.div<ContentProps>`
  position: relative;
  transition: all 0.4s;

  /* .ReactTable .rt-tbody{
    .rt-tr-group {

      ${props => props.indexesHasError.map(index => {
        const tableIndex = parseInt(index) + 1
        return css`
          &:nth-of-type(${tableIndex}) {
          border: 1px solid ${props.theme.colors.danger};
          box-shadow: 0px 0px 0px 3px ${transparentize(0.9, props.theme.colors.danger)};
        }
        `
      })}
    }
  } */

 /*  ${props => props.error && css`
    .ReactTable {
      border: 1px solid ${props => props.theme.colors.danger};
      position: relative;
    }`
  } */
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
  position: absolute;
  display: box;
  padding: 7px 10px;
  font-size: 10px;
  line-height: 1.5;
  color: ${props => props.theme.colors.backgroundLight};
  background-color: ${props => props.theme.colors.danger};
  border-radius: 4px;
  align-items: center;
  top: 70%;
  left: 2px;
  z-index: 8;

`

export const Error = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction:column;
  width: 100%;
  height: 40px;
`

interface TableCollumn {
  hasError?: boolean
}

export const TableCollumn = styled.div<TableCollumn>`
  display: flex;
  align-items: center;
  border: 1px solid ${props => props.hasError ? props.theme.colors.danger : 'transparent'};
  height: 100%;
  width: 100%;
  box-shadow: 0px 0px 0px 3px ${props => props.hasError ? transparentize(0.9, props.theme.colors.danger) : 'none'};
  position: relative;
`
