import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;

`
export const Content = styled.div`
  display: block;
  flex: 1;
  margin-left: 70px;
  height: (100vh - 50px);

  > div {
    padding: 15px;
  }

`
