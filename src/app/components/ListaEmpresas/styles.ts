import styled from 'styled-components'

export const Container = styled.div`

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

interface ContentProps {
  selectedRowTableIndex: number
}

export const Content = styled.div<ContentProps>`
  .ReactTable .rt-tbody .rt-tr-group {
      cursor: pointer;

    &:nth-of-type(${props => props.selectedRowTableIndex + 1}) {
      background-color: ${props => props.theme.colors.primary};
      color: white;

      span {
        color: white;
      }

      svg {
        fill: white;
      }
    }
  }
`
