import React, { ComponentType } from 'react'
import { Route as ReactRoute, Redirect, RouteProps } from 'react-router-dom'
import { useUsuario } from '../hooks'
/* import { useUsuario } from '../contexts' */

interface PrivateRouteProps extends RouteProps{
  component: ComponentType,
  isPrivate?: boolean
}

export function Route ({
  component: Component,
  isPrivate = false,
  ...rest
}: PrivateRouteProps) {
  const { data: dataUsuario } = useUsuario()
  const signed = !!dataUsuario?.id

  return (
    <ReactRoute {...rest}
      render={() => {
        if (isPrivate && !signed) {
          return <Redirect to={{ pathname: '/login' }}/>
        } else if (isPrivate && signed) {
          return <Component/>
        } else {
          return <Component/>
        }
      }}
    />)
}
