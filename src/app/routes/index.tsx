import React from 'react'
import { Switch } from 'react-router-dom'
import { Desempenho } from '../pages/Desempenho'
import { DashBoard, Login, Demo, TabsTeste, Atendimentos, MeusDados, CadastroCliente } from '../pages'
import { Route } from './route'

export const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/" component={DashBoard} isPrivate />
    <Route path="/demo" component={Demo} isPrivate />
    <Route path="/login" component={Login} />
    <Route path="/atendimentos" component={Atendimentos} isPrivate />
    <Route path="/desempenho" component={Desempenho} isPrivate />
    <Route path="/tabs" component={TabsTeste} isPrivate />
    <Route path="/meus-dados" component={MeusDados} isPrivate />
    <Route path="/cadastro-cliente" component={CadastroCliente} isPrivate />
  </Switch>
)
