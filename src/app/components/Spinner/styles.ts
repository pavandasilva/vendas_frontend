import styled, { keyframes } from 'styled-components'
import { FaSpinner } from 'react-icons/fa'

const spinner = keyframes`
  to {transform: rotate(360deg);}
`

export const Container = styled(FaSpinner)`
  animation: ${spinner} 0.6s linear infinite;
  height: 25px;
  width: 25px;
`
