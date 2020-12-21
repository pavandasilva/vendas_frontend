import React from 'react'
import { Switch } from 'react-router-dom'
import { CadastroClienteProvider } from '../contexts'
import { DashBoard, CadastroCliente, Login } from '../pages'
import { Route } from './route'

export const Routes: React.FC = () => (
  <Switch>
    <Route path="/login" component={Login} />
    <CadastroClienteProvider>
      <Route exact path="/" component={DashBoard} isPrivate />
      <Route path="/cadastro-cliente" component={CadastroCliente} isPrivate />
      <Route path="/edicao-cliente/:id" component={CadastroCliente} isPrivate />
    </CadastroClienteProvider>
  </Switch>
)
