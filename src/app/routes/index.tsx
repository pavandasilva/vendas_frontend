import React from 'react'
import { Switch } from 'react-router-dom'
import { DashBoard, Login, Demo } from '../pages'
import { Route } from './route'

export const Routes: React.FC = () => (
  <Switch>
    <Route path="/demo" component={Demo} isPrivate />
    <Route path="/login" component={Login} />
    <Route exact path="/" component={DashBoard} isPrivate />
  </Switch>
)
