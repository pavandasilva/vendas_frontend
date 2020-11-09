import { createGlobalStyle } from 'styled-components'
import 'react-toastify/dist/ReactToastify.css'
import 'react-perfect-scrollbar/dist/css/styles.css'

export default createGlobalStyle`
  @import './bootstrap.scss';

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0
  }

  body {
    background: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.primaryText};
    -webkit-font-smoothing: antialiased
  }
`
