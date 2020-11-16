import React from 'react'
import { Switch } from 'react-router-dom'
import { Desempenho } from '../pages/Desempenho'
import { DashBoard, Login, Demo, TabsTeste, Atendimentos } from '../pages'

import { Route } from './route'
import { AutoSuggestExample } from '../components/AutoSuggest'

export const Routes: React.FC = () => (
  <Switch>
    <Route path="/demo" component={Demo} isPrivate />
    <Route path="/login" component={Login} />
    <Route exact path="/" component={DashBoard} isPrivate />

    <Route exact path="/atendimentos" component={Atendimentos} isPrivate />
    <Route exact path="/desempenho" component={Desempenho} isPrivate />

    <Route exact path="/tabs" component={TabsTeste} isPrivate />
    <Route exact path="/suggest" component={AutoSuggestExample} isPrivate />
  </Switch>
)
