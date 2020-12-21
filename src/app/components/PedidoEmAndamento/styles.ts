import styled from 'styled-components'
import { transparentize } from 'polished'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 50px;
  transition: all .3s ease;
  width: 100%;
  margin-right: 15px;

  header {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    border-bottom: 1px solid ${props => transparentize(0.9, props.theme.colors.primary)};
    height: 65px;
    background: ${props => transparentize(0.95, props.theme.colors.primary)};
    align-items: center;
    padding: 15px;

    > div {
      display: flex;
      flex-direction: row;
      flex: 1;

      & + div {
        width: 200px;
        justify-content: flex-end;
      }
    }
  }
`
export const Content = styled.div`

`
