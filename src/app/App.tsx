import React from 'react'
import { ToastContainer } from 'react-toastify'
import { Routes } from './routes'
import { BrowserRouter } from 'react-router-dom'
import { Providers } from './contexts/provider'
import { ThemeProvider } from 'styled-components'
import { lightTheme } from './styles/themes/lightTheme'
import { GlobalStyle } from './styles/global'

const App: React.FC = () => {
  return (
    <>
      <ThemeProvider theme={lightTheme}>
        <BrowserRouter>
          <Providers>
            <Routes />
          </Providers>
        </BrowserRouter>
        <ToastContainer autoClose={5000} />
        <GlobalStyle />
      </ThemeProvider>
    </>
  )
}

export default App
