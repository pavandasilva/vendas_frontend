import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 500px;
  width: 100%;

  header {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: flex-start;
    height: 45px;

    > div {
      display: flex;
      width: 300px;

      & + div {
        display: flex;
        flex-direction: column;
        flex: 1;
        width: 100%;
        align-items: flex-end;
      }
    }
  }
`
export const Actions = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;

  & + button + button {
    background-color: red !important;
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
