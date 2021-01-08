import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;

`

interface Content {
  isVisible?: boolean
}

export const Content = styled.div<Content>`
  display: block;
  flex: 1;
  margin-left: ${props => props.isVisible ? '70px' : '0px'};
  height: (100vh - 50px);
  transition: all 300ms;

  > div {
    padding: 15px;
  }

`
