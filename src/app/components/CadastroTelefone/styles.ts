import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  & > div:last-of-type {
    margin-top: 25px;
  }
`
