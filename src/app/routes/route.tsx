import React, { ComponentType } from 'react'
import { Route as ReactRoute, Redirect, RouteProps } from 'react-router-dom'

interface PrivateRouteProps extends RouteProps{
  component: ComponentType,
  isPrivate?: boolean
}

export function Route ({
  component: Component,
  isPrivate = false,
  ...rest
}: PrivateRouteProps) {
  // const { usuario } = useContext(UsuarioContext)
  // const signed = !!usuario?.token
  const signed = true

  return (
    <ReactRoute {...rest}
      render={() => {
        return isPrivate === signed ? (
          <Component/>
        ) : <Redirect to={{ pathname: isPrivate ? '/login' : '/' }}/>
      }}
    />)
}
