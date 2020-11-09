import React from 'react'
import { ToastContainer } from 'react-toastify'
// import GlobalStyle from './styles/global'
import { Routes } from './routes'
import { Router } from 'react-router-dom'
import { history } from './routes/history'
import { Providers } from './context/providers'

import './styles/style.scss'

const App: React.FC = () => (
  <>
    <Router history={history}>
      <Providers>
        <Routes/>
      </Providers>
    </Router>
    {/* <GlobalStyle /> */}
    <ToastContainer autoClose={5000} />
  </>
)

export default App
