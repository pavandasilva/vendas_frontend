import React, { ComponentType, useContext } from 'react'
import { Route as ReactRoute, Redirect, RouteProps } from 'react-router-dom'
import { UsuarioContext } from '../context'

interface PrivateRouteProps extends RouteProps{
  component: ComponentType,
  isPrivate?: boolean
}

export function Route ({
  component: Component,
  isPrivate = false,
  ...rest
}: PrivateRouteProps) {
  const { usuario } = useContext(UsuarioContext)
  const signed = !!usuario?.token

  return (
    <ReactRoute {...rest}
      render={() => {
        return isPrivate === signed ? (
          <Component/>
        ) : <Redirect to={{ pathname: isPrivate ? '/login' : '/' }}/>
      }}
    />)
}
