import React from 'react'
import { Switch } from 'react-router-dom'
import { Pedidos, CadastroCliente, Login, Clientes, Dashboard } from '../pages'
import { CadastroClienteProvider } from '../contexts'

import { Route } from './route'

export const Routes: React.FC = () => (
  <Switch>
    <Route path="/login" component={Login} />
    <CadastroClienteProvider>
      <Route exact path="/" component={Dashboard} isPrivate />
      <Route path="/clientes" component={Clientes} isPrivate />
      <Route path="/pedidos" component={Pedidos} isPrivate />
      <Route path="/cadastro-cliente" component={CadastroCliente} isPrivate />
      <Route path="/edicao-cliente/:id" component={CadastroCliente} isPrivate />
    </CadastroClienteProvider>
  </Switch>
)
