import styled from 'styled-components'

export const Container = styled.div`
  background: rgba(0, 0, 0, 0);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  z-index:999;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.85);

`
export const BoxModal = styled.div`
  border-radius: 4px;
  top: 50%;
  width: 500px;
  height: auto;
  margin: -16px auto 0;
  position: relative;
  transform: translateY(-50%);
  max-height: calc(100% - 96px);
  background-color: rgba(0, 0, 0, 0.07) ;
  background-color: ${props => props.theme.colors.backgroundLight} ;
  position: relative;
  padding-bottom: 70px;

  & > div {
    padding: 0px 15px;
  }
`

export const Header = styled.div`
  padding: 30px 15px;
  display: flex;
  align-items: center;
  height: 80px;
  border-bottom: 1px solid ${props => props.theme.colors.borderLight};
  position: relative;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;

  h1 {
    font-size: 18px;
  }

  & > div {
    position: absolute;
    top: 15px;
    right: 15px;
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    height: 50px;
    width: 50px;
    cursor: pointer;

    & > svg {
      width: 24px;
      height: auto;
      color: ${props => props.theme.colors.secondaryText};
    }


    &:hover {
      svg {
        color: ${props => props.theme.colors.primaryText};
      }
    }
  }
`
export const ContainerFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  bottom: 0px;
  padding: 30px 15px;
  display: flex;
  align-items: center;
  height: 70px;
  border-top: 1px solid ${props => props.theme.colors.borderLight};
  position: absolute;
  width: 100%;

  > button + button {
    margin-left: 10px;
  }
`
