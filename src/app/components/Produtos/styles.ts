import styled from 'styled-components'

export const Container = styled.div`

`
export const Header = styled.div`
  display: flex;
  flex-direction: row;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  height: 65px;
  align-items: center;
  padding: 15px 0px;

  > div {
    display: flex;
    flex-direction: row;
    flex: 1;

    & + div {
      width: 200px;
      justify-content: flex-end;
    }
  }
`

interface ContainerProps {
  selectedRowTableIndex: number
}

export const Content = styled.div<ContainerProps>`
  .ReactTable .rt-tbody .rt-tr-group {
    cursor: pointer;

    &:nth-of-type(${props => props.selectedRowTableIndex + 1}) {
      background-color: ${props => props.theme.colors.primary};
      color: white;
    }
  }

`
