import styled from 'styled-components'

interface InputContainerProps {
  isActive: boolean;
  error?: string;
  hasStartIcon?: boolean;
}

interface WrapperProps {
  width?: string;
}

export const Wrapper = styled.div<WrapperProps>`
  display: flex;
  flex: ${props => props.width ? props.width : 1};
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  margin: 0px;
`

interface LabelProps {
  isChanged?: boolean
}

export const Label = styled.span<LabelProps>`
  display: flex;
  align-self: flex-start;
  color: ${props => props.theme.colors.primaryText} !important;
  margin: 5px 0px;
  opacity: ${props => (props.isChanged ? '1' : 0)};
  transition: all 0.3s;
`

export const Container = styled.div<InputContainerProps>`
  display: flex;
  position: relative;
  align-items: center;
  width: 100%;
  height: 36px;
  background: ${props => props.theme.colors.backgroundLight};
  border-radius: 4px;
  transition: all 0.3s;
  border: 1px solid ${props => props.isActive ? props.theme.colors.info : props.theme.colors.border};

  div:first-of-type {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 38px;
    height: 100%;
    background-color: ${props => props.theme.colors.background};
    border-bottom-left-radius: 4px;
    border-top-left-radius: 4px;
    transition: all 0.3s;
    border: 1px solid ${props => props.isActive ? props.theme.colors.info : props.theme.colors.border};

  }

  svg:first-of-type {
    fill: ${props => props.theme.colors.primaryText};
    width: 14px;
    height: 14px;
    transition: fill 0.4s;
  }

  select {
    display: flex;
    flex: 1;
    height: 100%;
    border: none;
    background: transparent;
    transition: all 0.4s;
    border-bottom-right-radius: 4px;
    border-top-right-radius: 4px;
    padding: 0px 26px 0px 20px;
    z-index: 5;
    width: 100%;
    border-left: ${props => props.hasStartIcon && 'none'} ;

    color: ${props => props.theme.colors.secondary}

  }
`
