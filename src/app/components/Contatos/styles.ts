import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  header {
    display: flex !important;
    background-color: white !important;
    border: none !important;
    padding: 0px !important;

    & > div {
      background-color: blue;
      width: 200px !important;
    }

    & > div + div{
        flex: 1 !important;
        background-color: red;
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

  color: ${props => props.theme.colors.sucess}

  & + button + button {
    background-color: red !important;
  }

`

export const Header = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  margin-bottom: 15px;

  & > div {
    width: 300px;
  }

  & > div + div {
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
