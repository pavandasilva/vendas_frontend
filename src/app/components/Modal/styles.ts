import styled from 'styled-components'

export const Container = styled.div`
  top: 0;
  left: 0;
  position: fixed;
  z-index: 900;
  background-color: rgba(0,0,0,.4);
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

interface BoxModalProps {
  mode?: 'fullscreen' | 'normal'
}

export const BoxModal = styled.div<BoxModalProps>`
  border-radius: 4px;
  width: ${props => props.mode === 'fullscreen' ? '98%' : '600px'} ;
  height: ${props => props.mode === 'fullscreen' ? 'calc(100% - 15px)' : 'auto'};
  position: relative;
  background-color: ${props => props.theme.colors.backgroundLight};
  position: relative;
  padding: 0px 30px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  & > div:nth-of-type(3) {
    overflow: hidden;
  }
`

export const Header = styled.div`
  h1 {
    font-size: 18px;
  }

  & > div {
    z-index: 999;
    position: absolute;
    top: 30px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: calc(100% - 60px);
    cursor: pointer;
    border-bottom: 1px solid ${props => props.theme.colors.borderLight};
    padding-bottom: 15px;

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

export const Content = styled.div`
  margin-top: 45px;
  height: calc(100% - 60px);
  width: 100%;
  overflow: auto;
  scroll-behavior: smooth;
  display: flex;
  flex-direction: column;
  border-top: 40px solid transparent;
  border-bottom: 30px solid transparent;
  padding: 0px 7px 0px 0px;


   /* width */
   ::-webkit-scrollbar {
    width: 10px;
  }
  /* Track */
  ::-webkit-scrollbar-track {
    background: ${props => props.theme.colors.backgroundLight};
    border-radius: 4px;
    margin-top: 3px;
    margin-bottom: 50px;
  }
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.borderLight};
    border-radius: 4px;
  }
  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: ${props => props.theme.colors.border};
  }

`
export const ContainerFooter = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-items: flex-start;
  height: 100%;
  padding: 20px 0px 0px;
  display: flex;
  margin-top: 15px;
  border-top: 1px solid ${props => props.theme.colors.borderLight};
  width: 100%;

  > button + button {
    margin-left: 10px;
  }
`
