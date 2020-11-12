import React from 'react'
import { Switch } from 'react-router-dom'
import { Atendimentos, DashBoard, Login, Demo } from '../pages'
import { Desempenho } from '../pages/Desempenho'
import { DashBoard, Login, Demo } from '../pages'
import { TabsTeste } from '../pages/TabsTeste'
import { Route } from './route'

export const Routes: React.FC = () => (
  <Switch>
    <Route path="/demo" component={Demo} isPrivate />
    <Route path="/login" component={Login} />
    <Route exact path="/" component={DashBoard} isPrivate />

    <Route exact path="/atendimentos" component={Atendimentos} isPrivate />
    <Route exact path="/desempenho" component={Desempenho} isPrivate />

    <Route exact path="/tabs" component={TabsTeste} isPrivate />
  </Switch>
)
