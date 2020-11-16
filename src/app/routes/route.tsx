import React, { ComponentType } from 'react'
import { Route as ReactRoute, Redirect, RouteProps } from 'react-router-dom'
import { useUsuario } from '../hooks'

interface PrivateRouteProps extends RouteProps{
  component: ComponentType,
  isPrivate?: boolean
}

export function Route ({
  component: Component,
  isPrivate = false,
  ...rest
}: PrivateRouteProps) {
  const { data } = useUsuario()
  const signed = !!data?.id

  return (
    <ReactRoute {...rest}
      render={() => {
        return isPrivate === signed ? (
          <Component/>
        ) : <Redirect to={{ pathname: isPrivate ? '/login' : '/' }}/>
      }}
    />)
}
