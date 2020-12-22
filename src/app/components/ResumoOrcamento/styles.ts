import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  border-bottom: solid 1px ${props => props.theme.colors.borderLight};
  padding-bottom: 15px;
`
