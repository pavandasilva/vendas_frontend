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

    div {
      display: flex;
      width: 300px;
    }
  }
`