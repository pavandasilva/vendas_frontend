import styled, { css } from 'styled-components'

export const Container = styled.div`
  header {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    height: auto;
    top: 0px;
    left: 15px;
    z-index: 10;
  }
`

export const TabContent = styled.div`
  background-color:  ${props => props.theme.colors.backgroundLight};
  padding: 15px 15px 30px;
  border: solid 1px ${props => props.theme.colors.border};
  margin-top: -1px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
`
interface TabProps {
  selected?: boolean
}

export const Tab = styled.div<TabProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  height: 35px;
  width: 175px;
  padding: 15px;
  border: 1px solid ${props => props.theme.colors.border};
  border-bottom-color: ${props => props.theme.colors.backgroundLight};
  background-color: ${props => props.selected ? props.theme.colors.backgroundLight : props.theme.colors.borderLight};
  color: ${props => props.selected ? props.theme.colors.primaryText : props.theme.colors.secondaryText};
  cursor: pointer;
  margin-left: 4px;
  overflow: hidden;

  &:first-of-type {
    width: 110px;
    margin-left: 0px;
    background-color: ${props => props.selected ? props.theme.colors.backgroundLight : props.theme.colors.secondary};
    color: ${props => props.selected ? props.theme.colors.primaryText : props.theme.colors.backgroundLight}
  }


  &:nth-of-type(8n){
    margin-left: 0px;
  }



  ${props => !props.selected && css`
    &:hover {
      background-color: props.theme.colors.border};
    }
  `}

`

export const Close = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 2px;
  top: 2px;
  height: 18px;
  width: 18px;
  transition: all 0.4s;

  > svg {
    width: 16px;
    height: 16px;
    fill: red !important;
  }

  &:hover {
    background-color: ${props => props.theme.colors.borderLight};
    border-radius: 50%;
  }
`
