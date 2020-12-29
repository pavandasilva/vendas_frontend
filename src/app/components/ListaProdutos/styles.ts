import styled from 'styled-components'

interface ContainerProps {
  selectedRowTableIndex: number
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  height: auto;

  .ReactTable .rt-tbody .rt-tr-group {
    cursor: pointer;

    &:nth-of-type(${props => props.selectedRowTableIndex + 1}) {
      background-color: ${props => props.theme.colors.primary};
      color: white;
    }
  }

`

export const Header = styled.div`
  margin: 5px 0px 15px;

  & > div:nth-of-type(1){
    width: 500px;
  }
`
